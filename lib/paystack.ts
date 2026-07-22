const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || 'sk_test_xxx';
const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_xxx';

export async function initializePaystackTransaction(params: {
  email: string;
  amount: number; // in primary currency unit (Naira/USD)
  reference: string;
  callback_url: string;
  metadata?: Record<string, any>;
}) {
  // Paystack expects amount in Kobo/Cents (amount * 100)
  const amountInSmallestUnit = Math.round(params.amount * 100);

  try {
    const res = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY || PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: params.email,
        amount: amountInSmallestUnit,
        reference: params.reference,
        callback_url: params.callback_url,
        metadata: params.metadata,
      }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Paystack transaction initialization error:', error);
    return { status: false, message: 'Payment gateway connection error' };
  }
}

export async function verifyPaystackTransaction(reference: string) {
  try {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY || PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Paystack transaction verification error:', error);
    return { status: false, message: 'Verification API error' };
  }
}

export function getPaystackPublicKey(): string {
  return process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || PAYSTACK_PUBLIC_KEY;
}
