const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const createRazorpayOrder = async (amount: number) => {
  const response = await fetch(`${API_URL}/payment/create-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create order');
  }

  return response.json();
};

export const verifyRazorpayPayment = async (paymentData: any) => {
  const response = await fetch(`${API_URL}/payment/verify-payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to verify payment');
  }

  return response.json();
};
