export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

interface RazorpayOptions {
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
}

export const initializeRazorpayPayment = async (options: RazorpayOptions) => {
  const res = await (window as any).Razorpay;
  if (!res) {
    console.error('Razorpay SDK failed to load');
    return;
  }

  const rzp = new (window as any).Razorpay({
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    ...options,
  });

  rzp.open();
};
