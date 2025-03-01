import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeCheckout = async (amount, email) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: "required",
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Wedding Gift Contribution',
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://wedding.basagoitia.net/success?session_id={CHECKOUT_SESSION_ID}', 
    cancel_url: 'https://wedding.basagoitia.net/cancel',
    customer_email: email,
    payment_intent_data: {
      on_behalf_of: process.env.STRIPE_ACCOUNT_ID,
      transfer_data: {
        destination: process.env.STRIPE_ACCOUNT_ID,
      },
      statement_descriptor: 'Alex and Taryn'
    },
  });

  return session;
};

export default stripeCheckout;
