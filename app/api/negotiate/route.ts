import { activeSessions, products } from '../../../lib/db';
import { scoreAndSelectOffer } from '../../../lib/optimizer/scorer';
import { generateCandidates } from '../../../lib/ai/negotiator';
import { merchantPolicies } from '../../../lib/policy/rules';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { sessionId, userMessage, currentRound, mainProductId } = await req.json();

    if (!activeSessions.has(sessionId)) {
      activeSessions.set(sessionId, {
        session_id: sessionId,
        status: "ACTIVE",
        history: [],
        revenueSaved: 0,
        marginProtected: 0
      });
    }

    const session = activeSessions.get(sessionId)!;
    
    if (currentRound > merchantPolicies.global.allowed_rounds) {
      return NextResponse.json({
        agentMessage: "I'm sorry, but we have reached the maximum number of negotiation rounds. This is my final and best offer.",
        offer: session.selectedOffer ? {
          mainProductId: session.selectedOffer.mainProductId,
          includedAddons: session.selectedOffer.evaluation.includedAddons,
          finalPrice: session.selectedOffer.evaluation.finalPrice,
          margin: session.selectedOffer.evaluation.margin,
          customerValue: session.selectedOffer.evaluation.customerValue
        } : null,
        round: currentRound,
        audit_trail: { intent: "MAX_ROUNDS_REACHED", evaluations: [] }
      });
    }
    
    // 1. Intelligence (LLM generates candidates and intent)
    const aiResponse = await generateCandidates(userMessage, mainProductId);
    const { intent, candidates, direct_reply } = aiResponse;

    if (intent === 'GREETING' || intent === 'QUESTION' || !candidates || candidates.length === 0) {
        session.history.push({
          round: currentRound,
          customer_request: userMessage,
          intent_detected: intent,
          candidates_evaluated: [],
          selected_offer: null,
          reason: "Conversational response"
        });

        return NextResponse.json({
          agentMessage: direct_reply || "Hello! I'm your Nuvora assistant. How can I help you today?",
          offer: null,
          round: currentRound,
          audit_trail: { intent, evaluations: [] }
        });
    }

    // SECURITY LAYER: Never trust the LLM's product ID. Enforce the customer's actual product selection.
    const enforcedCandidates = candidates.map((c: any) => ({
      ...c,
      mainProductId: mainProductId
    }));

    // 2. Safety & Optimization (Policy Engine & Scorer)
    const { selected, allEvaluations } = scoreAndSelectOffer(enforcedCandidates, intent);

    // 3. Record Audit Trail
    session.history.push({
      round: currentRound,
      customer_request: userMessage,
      intent_detected: intent,
      candidates_evaluated: allEvaluations,
      selected_offer: selected || null,
      reason: selected ? "Highest expected profit that passed policy constraints" : "No candidates passed policy constraints."
    });

    if (selected) {
        session.revenueSaved = selected.evaluation.finalPrice;
        session.marginProtected = selected.evaluation.margin;
        session.customerMessage = userMessage;
        session.selectedOffer = selected;
    }

    // 4. Formulate response to customer
    let agentMessage = "";
    let offerDetails = null;
    
    if (selected) {
      offerDetails = {
        mainProductId: selected.mainProductId,
        includedAddons: selected.evaluation.includedAddons,
        finalPrice: selected.evaluation.finalPrice,
        margin: selected.evaluation.margin,
        customerValue: selected.evaluation.customerValue
      };
      
      const productName = products.get(selected.mainProductId)?.name || "product";
      agentMessage = selected.agent_message || `I can offer you the ${productName} for ₹${offerDetails.finalPrice}.`;
    } else {
      const productName = products.get(mainProductId)?.name || "product";
      agentMessage = `I'm sorry, I can't offer any discounts or bundles that meet your request right now. The ${productName} is already at its best price.`;
    }

    return NextResponse.json({
      agentMessage,
      offer: offerDetails,
      round: currentRound,
      audit_trail: {
        intent,
        evaluations: allEvaluations
      }
    });

  } catch (error: any) {
    console.error("Negotiation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
