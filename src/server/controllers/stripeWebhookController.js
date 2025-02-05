import Stripe from 'stripe';
import dotenv from 'dotenv';
import { sendGuestContributionEmail, sendAdminContributionEmail } from "../helpers/sendEmails.js";
import submitContribution from "../helpers/submitContribution.js";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      console.log("Payment successful for session:", session.id);

      const requestBody = {
        amount: session.amount_total / 100, // Convert to dollars
        email: session.customer_email,
      };

      await sendGuestContributionEmail(requestBody);
      await sendAdminContributionEmail(requestBody);
      await submitContribution(requestBody);

      res.status(200).send('Webhook received successfully.');
    } else {
      res.status(400).send('Event type not handled.');
    }
  } catch (err) {
    console.error('Webhook Error:', err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

export default stripeWebhook;
