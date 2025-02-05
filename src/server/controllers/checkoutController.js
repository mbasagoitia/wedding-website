import stripeCheckout from "../helpers/stripeCheckout.js";

const checkout = async (req, res) => {
  const { amount, email } = req.body;

  try {
    const session = await stripeCheckout(amount, email);

      res.status(200).json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

export default checkout;