import { NextResponse } from 'next/server';
import { verifyPaystackTransaction } from '@/lib/paystack';
import { mockDB } from '@/lib/mock-db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get('reference');
  const orderId = searchParams.get('orderId');

  if (!reference) {
    return NextResponse.json({ status: false, message: 'Reference missing' }, { status: 400 });
  }

  const result = await verifyPaystackTransaction(reference);

  if (result.status && result.data?.status === 'success') {
    if (orderId) {
      mockDB.updateOrderStatus(orderId, 'PAID');
    }
    return NextResponse.json({ status: true, message: 'Payment verified successfully', data: result.data });
  } else {
    return NextResponse.json({ status: false, message: result.message || 'Payment verification failed' }, { status: 400 });
  }
}
