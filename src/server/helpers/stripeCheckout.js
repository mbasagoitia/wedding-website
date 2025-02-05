import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const stripeCheckout = async (amount, email) => {

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Wedding Gift Contribution', 
                    },
                    unit_amount: amount * 100, // Convert to cents
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        // Change this
        success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}', 
        cancel_url: 'http://localhost:3000/cancel',
        customer_email: email,
        payment_intent_data: {
            transfer_data: {
                destination: process.env.STRIPE_ACCOUNT_ID
            },
        },
    });

    return session;
}

export default stripeCheckout;
