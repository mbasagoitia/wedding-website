import express from "express";
import dotenv from "dotenv";
import Stripe from 'stripe';
import { sendGuestContributionEmail, sendAdminContributionEmail } from "../helpers/sendEmails.js";
import submitContribution from "../helpers/submitContribution.js";

dotenv.config();

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe('sk_test_51QjMMWKPzIRnXhtuRFLH7kraRbKLR4Ras69tSufcXAccjNY0p8Ary8GCLolAU9TUQ9EVw8zPgorYuPe2oNRprgdJ00uNhYZc9y');


dotenv.config();

const router = express.Router();

router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    console.log("triggered test endpoint");
    event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_c021dab8bb2ad0d9101ce0809db0ed31c68198bd94bde37a6011876a9907f052');
  } catch (err) {
    console.error(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const requestBody = {
        amount: session.amount_total / 100, // Convert to dollars
        email: session.customer_email,
      };

      await sendGuestContributionEmail(requestBody);
      await sendAdminContributionEmail(requestBody);
      await submitContribution(requestBody);
      
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
});

export default router;
