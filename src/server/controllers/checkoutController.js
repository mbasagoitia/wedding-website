import stripeCheckout from "../helpers/stripeCheckout.js";
// import sendEmail from "../helpers/sendEmail.js";
import contributionHtmlContent from "../helpers/stripeEmail.js";

// This creates a checkout session, need to separate logic for handling success then sending email
const checkout = async (req, res) => {
  const { amount, email } = req.body;

  try {
    const session = await stripeCheckout(amount, email);
    const mailOptions = {
      from: '"Alex and Taryn" <your-email@gmail.com>',
      to: email,
      subject: 'Thank You for Your Contribution!',
      html: contributionHtmlContent
    };

      // sendEmail(mailOptions);
      res.status(200).json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

export default checkout;