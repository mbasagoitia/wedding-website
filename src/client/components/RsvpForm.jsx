import { useState } from "react";
import { Form, Button, Container } from 'react-bootstrap';
import submitFormData from "../helpers/submitFormData";

const RSVPForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    attendance: true,
    guests: 0,
    guestNames: [],
    email: '',
    phone: '',
    comments: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleGuestNameChange = (index, e) => {
    const updatedGuestNames = [...formData.guestNames];
    updatedGuestNames[index] = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      guestNames: updatedGuestNames
    }));
  };

  const handleGuestNum = (e) => {
    if (e.target.value <= 10) {
      handleChange(e);
    } else {
      alert("Guest limit of 10");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFormData(formData);
    console.log('Form data submitted:', formData);
  };

  return (
    <>
      <Form className="rsvp-form" onSubmit={handleSubmit}>
        <h2 className="text-center">RSVP</h2>
        <Container className="my-5">
          <Form.Group controlId="name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="attendance">
            <Form.Label>Will you be attending?</Form.Label>
            <Form.Control
              as="select"
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              required
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Form.Control>
          </Form.Group>

          {formData.attendance && (
            <>
              <Form.Group controlId="guests">
                <Form.Label>How many guests will you be bringing?</Form.Label>
                <Form.Control
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleGuestNum}
                  min="0"
                  max="10"
                  placeholder="Enter the number of guests"
                />
              </Form.Group>

              {formData.guests > 0 && (
                <div className="text-center mt-4">
                  <p><em>We are thrilled to celebrate this special day surrounded by so many of our favorite young people! However, we kindly request that only ladies and gentlemen aged twelve and older join us for our thirty-minute wedding ceremony.<br></br><br></br>For those who feel comfortable, on-site childcare will be available in the reception area, within view of the ceremony. Alternatively, parents are welcome to wait in the reception area with their children during the ceremony.<br></br><br></br>We appreciate your understanding and can't wait to celebrate with you.</em></p>
              </div>
              )}

              {[...Array(Number(formData.guests))].map((_, index) => (
                <Form.Group controlId={`guest-name-${index + 1}`} key={index}>
                  <Form.Label>Guest #{index + 1} Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter guest's full name"
                    name={`guestName${index + 1}`}
                    value={formData.guestNames[index] || ''}
                    onChange={(e) => handleGuestNameChange(index, e)}
                    required
                  />
                </Form.Group>
              ))}

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="comments">
                <Form.Label>Special Requests or Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment or request..."
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}

          {formData.attendance === 'no' && (
            <Form.Group controlId="message">
              <Form.Label>Message for the Couple</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Leave a message for the couple (Optional)"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          <div className="text-center mt-4">
            <p><em>In lieu of gifts, contributions to our honeymoon fund are warmly welcomed. Please click here if you would like to contribute.</em></p>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <Button variant="primary" type="submit">
              Submit RSVP
            </Button>
          </div>
        </Container>
      </Form>
    </>
  );
};

export default RSVPForm;
