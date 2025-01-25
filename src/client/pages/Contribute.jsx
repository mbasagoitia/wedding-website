import { useState } from "react";
import { Button, Form, InputGroup, FormControl, Container, Row, Col } from "react-bootstrap";
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

    return (
        <Container className="mt-5">
            <h1>Contribute to Our Honeymoon Fund</h1>
            <p>In lieu of gifts, we warmly welcome contributions to our honeymoon fund.</p>

            <Row className="mb-5">
                <Col xs={12} md={6}>
                    <Form>
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
                            <Form.Label>Optional Message for the Couple</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            size="lg"
                            // onClick={() => sendMessage()}    
                        >
                            Send Message
                        </Button>
                    </Form>
                </Col>

                <Col xs={12} md={6}>
                    <div className="mb-4">
                        <h5>Select Your Contribution</h5>
                        <div className="d-flex flex-column">
                            {["25", "50", "100", "250", "500"].map((amt) => (
                                <div
                                    key={amt}
                                    onClick={() => handleAmountSelect(amt)}
                                    className={`donation-option ${
                                        amount === Number(amt) ? "active" : ""
                                    } p-3 mb-2 rounded border cursor-pointer`}
                                >
                                    <h6>${amt}</h6>
                                </div>
                            ))}
                            <div
                                onClick={() => setAmount(customAmount)}
                                className={`donation-option ${
                                    !["25", "50", "100", "250", "500"].includes(String(amount)) ? "active" : ""
                                } p-3 mb-2 rounded border cursor-pointer`}
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
                </Col>
            </Row>
            {amount > 0 && (
                <Button
                variant="primary"
                size="lg"
                onClick={() => startCheckout(email, amount)}
                disabled={!email || !amount}
            >
                Contribute ${amount}
            </Button>
            )} 
        </Container>
    );
};

export default Contribute;

