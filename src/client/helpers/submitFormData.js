const submitFormData = async (formData) => {
    try {
        const response = await fetch('/api/rsvp/submit-new', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        let data;
        try {
            data = await response.json();
        } catch {
            data = {};
        }

        if (response.ok) {
            return { success: true, message: data.message || "RSVP submitted successfully!" };
        } else {
            console.error("RSVP submission failed");
            return { success: false, message: data.error || "Submission failed. Please try again." };
        }
    } catch (error) {
        console.error("Error submitting RSVP", error);
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
};

export default submitFormData;
