const startPayment = async (amount, accountId) => {
    const response = await fetch('http://localhost:4242/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, accountId }),
    });
    const { id } = await response.json();
  
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: id });
  };
  