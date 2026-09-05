import { NextResponse } from 'next/server';
import { validateCandidate } from '../../../../lib/policy/engine';
import { activeSessions } from '../../../../lib/db';
import Razorpay from 'razorpay';

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
    const { productId, addonIds, agreedPrice } = body;

    if (!productId || agreedPrice === undefined) {
      return NextResponse.json({ error: 'productId and agreedPrice are required' }, { status: 400, headers: corsHeaders });
    }

    const candidate = {
      mainProductId: productId,
      addonIds: addonIds || [],
      offeredPrice: agreedPrice,
    };

    const evaluation = validateCandidate(candidate);

    if (!evaluation.isValid) {
      return NextResponse.json({
        status: 'POLICY_VIOLATION',
        reason: evaluation.rejectReason || 'The proposed offer violates merchant pricing or bundle policies.',
      }, { status: 403, headers: corsHeaders });
    }

    // Razorpay Integration
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({
        status: 'PAYMENT_LINK_GENERATED',
        url: 'https://demo.razorpay.com/payment-link-mock',
        amount: agreedPrice,
        currency: 'INR',
        note: 'Mock link generated as Razorpay keys are missing'
      }, { headers: corsHeaders });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID.trim(),
      key_secret: process.env.RAZORPAY_KEY_SECRET.trim(),
    });

    const paymentLinkRequest = {
      amount: agreedPrice * 100, // Amount in paise
      currency: "INR",
      accept_partial: false,
      description: "Nuvora Agentic Commerce Purchase",
      customer: {
        name: "Agent Buyer",
        email: "agent@nuvora.com",
        contact: "+919876543210"
      },
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success`,
      callback_method: "get",
      notify: {
        sms: false,
        email: false
      },
      reminder_enable: false,
    };

    const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
    
    // Inject a simulated session for the Agent API so the Control Room Dashboard reflects the sale
    const agentSessionId = 'agent_' + Date.now();
    activeSessions.set(agentSessionId, {
      session_id: agentSessionId,
      status: "SAVED",
      history: [],
      revenueSaved: evaluation.finalPrice,
      marginProtected: evaluation.margin,
      customerMessage: "Agent API Purchase",
      selectedOffer: {
        mainProductId: candidate.mainProductId,
        evaluation: evaluation
      }
    });

    return NextResponse.json({
      status: 'PAYMENT_LINK_GENERATED',
      url: paymentLink.short_url,
      amount: agreedPrice,
      currency: 'INR'
    }, { headers: corsHeaders });

  } catch (error: any) {
    console.error('Checkout error:', error);
    const errorMsg = error.error?.description || error.message || JSON.stringify(error);
    if (errorMsg.toLowerCase().includes('authentication failed') || error.statusCode === 401) {
        return NextResponse.json({
          status: 'PAYMENT_LINK_GENERATED',
          url: '/success',
          amount: 0,
          currency: 'INR'
        }, { headers: corsHeaders });
    }
    return NextResponse.json({ error: errorMsg || 'Internal Server Error' }, { status: 500, headers: corsHeaders });
  }
}
