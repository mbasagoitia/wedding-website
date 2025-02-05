import stripeCheckout from "../helpers/stripeCheckout.js";
import { sendGuestContributionEmail, sendAdminContributionEmail } from "../helpers/sendEmails.js";
import submitContribution from "../helpers/submitContribution.js";
import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const checkout = async (req, res) => {
  const { amount, email } = req.body;

  try {
    const session = await stripeCheckout(amount, email);

    const checkoutSession = await stripe.checkout.sessions.retrieve(session.id);
    console.log(checkoutSession.payment_status);

    if (checkoutSession.payment_status === 'paid') {
      await sendGuestContributionEmail(req.body);
      await sendAdminContributionEmail(req.body);
      await submitContribution(req, res);

      res.status(200).json({ id: session.id });
    } else {
      res.status(400).json({ error: 'Payment failed or incomplete.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export default checkout;
