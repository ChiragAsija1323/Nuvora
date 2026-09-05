import { activeSessions, products } from '../../../../lib/db';
import { merchantPolicies } from '../../../../lib/policy/rules';
import { NextResponse } from 'next/server';

export async function GET() {
  const sessions = Array.from(activeSessions.values());
  return NextResponse.json({
    sessions,
    catalog: Array.from(products.values()),
    policies: merchantPolicies
  });
}
