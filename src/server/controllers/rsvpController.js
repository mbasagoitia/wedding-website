import submitRsvp from "../helpers/submitRsvp.js";
import { sendAdminRsvpEmail, sendGuestRsvpEmail } from "../helpers/sendEmails.js";

const submitRsvpForm = async (req, res) => {
    const { attendance } = req.body;

    try {

        const rsvpResult = await submitRsvp(req, res);
        
        if (rsvpResult.success) {
            await sendAdminRsvpEmail(req.body);

            if (attendance) {
                await sendGuestRsvpEmail(req.body);
            }

            res.status(200).send('RSVP and guest details submitted successfully');
        } else {
            res.status(500).json({ error: "Failed to submit RSVP to the database" });
        }
      
    } catch (error) {
        console.error('Error during RSVP submission:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default submitRsvpForm;
