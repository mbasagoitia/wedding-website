import { redirect } from "react-router";

const submitFormData = async (formData) => {
    try {
        const response = await fetch('http://localhost:5000/api/rsvp/submit-new', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                attendance: formData.attendance,
                guests: formData.guests,
                guestNames: formData.guestNames,
                email: formData.email,
                phone: formData.phone,
                comments: formData.comments,
                message: formData.message
            }),
        });

        if (response.ok) {
            alert("RSVP submitted successfully");
            redirect("/");
            
        } else {
            console.error("RSVP submission failed");
        }
    } catch (error) {
        console.error("Error submitting RSVP", error);
    }
};


export default submitFormData;