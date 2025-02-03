import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_live_51QjMMWKPzIRnXhtuKbmIxsvkdl9nwRH3jGZRtRlZyNbX2GYMOqg943OATXJVZ0huBSAwBvWx9wS3zfANB8Ckeuoz00lfLuULFk');

const startCheckout = async (email, amount) => {
    
    try {
        const response = await fetch('http://localhost:5000/checkout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                amount: amount
            }),
        });

        const { id } = await response.json();

        const stripe = await stripePromise;
        
        const { error } = await stripe.redirectToCheckout({ sessionId: id });

        if (error) {
            console.error('Stripe Checkout error:', error.message);
        }
    } catch (error) {
        console.error('Error starting checkout:', error);
    }
};

export default startCheckout;

