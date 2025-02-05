import { useState } from "react";
import { Button, Form, InputGroup, FormControl, Row, Col } from "react-bootstrap";
import startCheckout from "../helpers/startCheckout";

const Contribute = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState("");
    const [customAmount, setCustomAmount] = useState("");

    const handleAmountSelect = (amount) => {
        setAmount(amount);
        setCustomAmount("");
    };

    const handleCustomAmount = (e) => {
        setCustomAmount(e.target.value);
        setAmount(e.target.value);
    };

    const handleMessageSubmit = () => {
        if (message) {
            // Send email
            // Show thank you message
        }

    }

    return (
        <div className="contribute">
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Your Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formMessage">
                            <Form.Label>Message for the Couple (Optional)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Your message here"
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-center mt-4">
                            <Button
                                variant="primary"
                                size="lg"  
                            >
                                Send Message
                            </Button>
                        </div>
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
                                    className={`donation-option p-3 mb-2 rounded border cursor-pointer ${amt == amount ? "active" : ""}`}
                                >
                                    <h6>${amt}</h6>
                                </div>
                            ))}
                            <div
                                onClick={() => setAmount(customAmount)}
                                className={`donation-option p-3 mb-2 rounded border cursor-pointer ${customAmount == amount ? "active" : ""}`}
                            >
                                <h6>Custom Amount</h6>
                                <InputGroup>
                                    <FormControl
                                        placeholder="Enter custom amount"
                                        aria-label="Custom donation"
                                        type="number"
                                        value={customAmount}
                                        onChange={handleCustomAmount}
                                    />
                                </InputGroup>
                            </div>
                        </div>
                    </div>
                    {amount > 0 && (
                    <div className="d-flex justify-content-center">
                        <Button
                        variant="primary"
                        size="lg"
                        onClick={() => startCheckout(email, amount)}
                            disabled={!email || !amount}
                        >
                            Contribute ${amount}
                        </Button>
                    </div>
                    )} 
                </Col>
            </Row>
        </div>
    );
};

export default Contribute;

