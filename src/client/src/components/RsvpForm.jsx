import { useState } from "react";
import { Form, Button, Container } from 'react-bootstrap';

const RSVPForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'yes',
    meal: 'chicken',
    dietary: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit to database
    console.log('Form data submitted:', formData);
  };

  return (
    <>
      <h2 className="text-center">Wedding RSVP</h2>
      <body>
      <div className="bg-image">
      <Form className="rsvp-form" onSubmit={handleSubmit}>
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
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Form.Control>
        </Form.Group>

        {formData.attendance === 'yes' && (
        <>
        <Form.Group controlId="meal">
          <Form.Label>Meal Preference</Form.Label>
          <Form.Control
            as="select"
            name="meal"
            value={formData.meal}
            onChange={handleChange}
          >
            <option value="chicken">Chicken</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="fish">Fish</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="dietary">
          <Form.Label>Dietary Restrictions / Allergies</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Please specify any dietary restrictions..."
            name="dietary"
            value={formData.dietary}
            onChange={handleChange}
          />
        </Form.Group>

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

        <Button variant="primary" type="submit">
          Submit RSVP
        </Button>
        </Container>
      </Form>
      </div>
      </body>
    </>
  );
};


export default RSVPForm;