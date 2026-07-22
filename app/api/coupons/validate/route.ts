import { NextResponse } from 'next/server';
import { mockDB } from '@/lib/mock-db';

export async function POST(req: Request) {
  try {
    const { code, subtotal } = await req.json();

    if (!code) {
      return NextResponse.json({ valid: false, message: 'Code is required' }, { status: 400 });
    }

    const result = mockDB.validateCoupon(code, Number(subtotal || 0));
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ valid: false, message: 'Server error validating code' }, { status: 500 });
  }
}
