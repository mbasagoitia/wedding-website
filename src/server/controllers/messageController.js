import { sendAdminMessageEmail } from "../helpers/sendEmails";

const submitMessage = async (req, res) => {
    try {
        await sendAdminMessageEmail(req.body);
        res.status(200).send('Message sent successfully'); 
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

export default submitMessage;
