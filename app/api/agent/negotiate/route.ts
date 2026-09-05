import { NextResponse } from 'next/server';
import { generateCandidates } from '../../../../lib/ai/negotiator';
import { scoreAndSelectOffer } from '../../../../lib/optimizer/scorer';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, buyerIntent, maxBudget } = body;

    if (!productId || !buyerIntent) {
      return NextResponse.json({ error: 'productId and buyerIntent are required' }, { status: 400, headers: corsHeaders });
    }

    // 1. LLM generates candidates (same as human flow)
    const aiResponse = await generateCandidates(buyerIntent, productId);
    const { intent, candidates } = aiResponse;

    // 2. Security: Enforce product ID on all candidates
    const enforcedCandidates = candidates.map((c: any) => ({
      ...c,
      mainProductId: productId
    }));

    // 3. Policy Engine + Optimizer
    const { selected, allEvaluations } = scoreAndSelectOffer(enforcedCandidates, intent);

    if (!selected) {
      return NextResponse.json({
        status: 'NO_OFFER',
        intent_detected: intent,
        reason: 'All candidates rejected by policy engine. No valid offer available.',
        policy_trace: {
          candidates_evaluated: allEvaluations.length,
          evaluations: allEvaluations.map((e: any) => ({
            offeredPrice: e.evaluation.finalPrice,
            margin: e.evaluation.margin,
            isValid: e.evaluation.isValid,
            rejectReason: e.evaluation.rejectReason
          }))
        }
      }, { headers: corsHeaders });
    }

    return NextResponse.json({
      status: 'OFFER_GENERATED',
      intent_detected: intent,
      offer: {
        productId: selected.mainProductId,
        addons: selected.evaluation.includedAddons.map((a: any) => a.id),
        addonDetails: selected.evaluation.includedAddons,
        finalPrice: selected.evaluation.finalPrice,
        customerValue: selected.evaluation.customerValue,
        margin: selected.evaluation.margin,
        agent_message: selected.agent_message
      },
      policy_trace: {
        candidates_evaluated: allEvaluations.length,
        margin_check: 'PASSED',
        selection_reason: 'Highest expected profit that passed policy constraints',
        expected_profit: Math.round(selected.expectedProfit)
      }
    }, { headers: corsHeaders });
  } catch (error: any) {
    console.error('Agent negotiate error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500, headers: corsHeaders });
  }
}
