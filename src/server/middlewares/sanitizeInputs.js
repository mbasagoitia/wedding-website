import validator from 'validator';

const sanitizeInputs = (req, res, next) => {
    try {
        let { name, attendance, guests, guestNames, email, phone, comments, message } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: "Name and email are required fields." });
        }

        req.body.name = validator.escape(name);
        req.body.email = validator.normalizeEmail(email);
        req.body.phone = phone ? validator.escape(phone) : "";
        req.body.comments = comments ? validator.escape(comments) : "";
        req.body.message = message ? validator.escape(message) : "";

        if (!validator.isEmail(req.body.email)) {
            return res.status(400).json({ error: "Invalid email address." });
        }

        if (Array.isArray(guestNames)) {
            req.body.guestNames = guestNames.map(guest => validator.escape(guest));
        } else {
            req.body.guestNames = [];
        }

        next();
    } catch (error) {
        console.error("Error sanitizing inputs:", error);
        res.status(500).json({ error: "Internal server error during input sanitization." });
    }
};

export default sanitizeInputs;
