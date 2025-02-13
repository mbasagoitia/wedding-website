import express from "express";
import dotenv from "dotenv";
import Stripe from 'stripe';
import { sendGuestContributionEmail, sendAdminContributionEmail } from "../helpers/sendEmails.js";
import submitContribution from "../helpers/submitContribution.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
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
        name: session.customer_details.name
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

// router.post('/', express.raw({ type: 'application/json' }), (req, res) => {
//     console.log("Received webhook event");
  
//     const sig = req.headers['stripe-signature'];
//     console.log("Stripe Signature:", sig);
  
//     if (!sig) {
//       console.error("No stripe-signature header provided.");
//       return res.status(400).send("Webhook Error: No stripe-signature header.");
//     }
  
//     let event;
//     try {
//       event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
//       console.log("Event Constructed:", JSON.stringify(event, null, 2));
//     } catch (err) {
//       console.error(`Webhook signature verification failed:`, err.message);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }
  
//     console.log(`Webhook event received: ${event.type}`);
  
//     res.status(200).json({ received: true });
//   });
  

export default router;
