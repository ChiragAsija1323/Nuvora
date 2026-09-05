import { activeSessions } from '../../../../lib/db';
import { NextResponse } from 'next/server';

export async function POST() {
  activeSessions.clear();
  return NextResponse.json({ success: true });
}
