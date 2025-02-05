const sendMessage = async (formData) => {
    try {
        const response = await fetch('/api/send-message/new', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(formData),
        });

        let data;
        try {
            data = await response.json();
        } catch {
            data = {};
        }

        if (response.ok) {
            return { success: true, message: data.message || "Your message has been received!" };
        } else {
            console.error("Message submission failed");
            return { success: false, message: data.error || "Submission failed. Please try again." };
        }
    } catch (error) {
        console.error("Error submitting message", error);
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
};

export default sendMessage;