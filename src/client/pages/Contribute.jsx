import { useState } from "react";
import { Button, Form, InputGroup, FormControl, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

import Alert from "../components/Alert.jsx";
import startCheckout from "../helpers/startCheckout";
import sendMessage from "../helpers/sendMessage";

const Contribute = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertContent, setAlertContent] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        amount: 0,
        customAmount: '',
        message: ''
    });

    const handleCloseAlert = () => setShowAlert(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAmountSelect = (amount) => {
        setFormData(prevState => ({ ...prevState, amount, customAmount: '' }));
    };

    const handleCustomAmount = (e) => {
        const value = e.target.value;
        setFormData(prevState => ({ ...prevState, customAmount: value, amount: value }));
    };

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        if (formData.message) {
            const res = await sendMessage(formData);
            setAlertContent({
                title: res.success ? "Success!" : "Error",
                message: res.message
            });
            if (res.success) {
                setFormData(prevState => ({
                    ...prevState,
                    message: ''
                }))
            }
            setShowAlert(true);
        }
    };

    const handleCheckout = async () => {
        const finalAmount = formData.customAmount ? formData.customAmount : formData.amount;

        if (formData.message) {
            const res = await sendMessage(formData);
            if (!res.success) return;
        }

        startCheckout({ ...formData, amount: finalAmount, customAmount: undefined });
    };

    const getButtonText = () => {
        const amount = formData.customAmount || formData.amount;
        if (amount > 0) {
            if (formData.message) {
                return `Send Message and Contribute $${amount}`;
            } else {
                return `Contribute $${amount}`;
            }
        } else {
            if (formData.message) {
                return "Send Message";
            } else {
                return "Contribute $0";
            }
        }
    };

    return (
        <motion.div 
            className="contribute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {showAlert && <Alert content={alertContent} onClose={handleCloseAlert} />}
            <h1 className="my-4">Contribute to Our Honeymoon Fund</h1>
            <p>In lieu of traditional gifts, contributions to our honeymoon fund are warmly welcomed. Please fill out the form below so we can properly thank you!</p>
            <Row className="contribute-row">
                <Col xs={12} md={6} className="mb-4">
                    <Form onSubmit={handleMessageSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Your Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formMessage">
                            <Form.Label>Message for the Couple (Optional)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your message here"
                            />
                        </Form.Group>
                    </Form>
                </Col>

                <Col xs={12} md={6}>
                    <div className="mb-4">
                        <h4>Select Your Contribution</h4>
                        <div className="d-flex flex-column mt-4">
                            {["25", "50", "100", "250", "500"].map((amt) => (
                                <div
                                    key={amt}
                                    onClick={() => handleAmountSelect(amt)}
                                    className={`donation-option p-3 mb-2 rounded border cursor-pointer ${amt === formData.amount ? "active" : ""}`}
                                >
                                    <h6>${amt}</h6>
                                </div>
                            ))}
                            <div
                                onClick={() => setFormData(prevState => ({ ...prevState, amount: formData.customAmount }))}
                                className={`donation-option p-3 mb-2 rounded border cursor-pointer ${formData.customAmount === formData.amount ? "active" : ""}`}
                            >
                                <h6>Custom Amount</h6>
                                <InputGroup>
                                    <FormControl
                                        placeholder="Enter custom amount"
                                        aria-label="Custom donation"
                                        type="number"
                                        name="customAmount"
                                        value={formData.customAmount}
                                        onChange={handleCustomAmount}
                                    />
                                </InputGroup>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

            <div className="d-flex justify-content-center mt-4">
                <Button
                    variant="primary"
                    size="lg"
                    onClick={formData.amount > 0 || formData.customAmount ? handleCheckout : handleMessageSubmit}
                    disabled={!formData.email || (formData.amount > 0 && !formData.amount)}
                >
                    {getButtonText()}
                </Button>
            </div>
        </motion.div>
    );
};

export default Contribute;
