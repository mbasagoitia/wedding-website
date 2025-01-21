import dotenv from 'dotenv';

dotenv.config();

const checkout = async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'apple_pay', 'google_pay'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Wedding Gift Contribution',
              },
              unit_amount: req.body.amount * 100, // converts cents to dollars
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        payment_intent_data: {
          application_fee_amount: 0,
          transfer_data: {
            destination: process.env.STRIPE_ACCOUNT_ID,
          },
        },
        // change this eventually
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
      });
      
      // Send confirmation email
  
      res.status(200).json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

export default checkout;