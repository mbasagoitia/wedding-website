import submitRsvp from "../helpers/submitRsvp.js";
import { sendAdminEmail, sendGuestEmail } from "../helpers/sendEmails.js";

const submitRsvpForm = async (req, res) => {

    const { attendance } = req.body;

    try {
        submitRsvp(req);
        sendAdminEmail(req.body);

        // Only send confirmation email confirmation if they are attending
        if (attendance) {
            sendGuestEmail(req.body);
        }
        res.status(200).send('RSVP and guest details submitted successfully');
      
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default submitRsvpForm;