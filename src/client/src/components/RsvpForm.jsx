import { useState } from "react";
import { Form, Button, Container } from 'react-bootstrap';

const RSVPForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'yes',
    guests: 0,
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
      <Form className="rsvp-form mt-4" onSubmit={handleSubmit}>
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
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Form.Control>
        </Form.Group>

        {formData.attendance === 'yes' && (
        <>
          <Form.Group controlId="guests">
            <Form.Label>How many guests will you be bringing?</Form.Label>
            <Form.Control
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              min="0"
              max="10"
              placeholder="Enter the number of guests"
            />
          </Form.Group>

          {[...Array(Number(formData.guests))].map((_, index) => (
            <Form.Group controlId={`guest-name-${index + 1}`} key={index}>
              <Form.Label>Guest #{index + 1} Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter guest's full name"
                name={`guestName${index + 1}`}
                value={formData[`guestName${index + 1}`] || ''}
                onChange={handleChange}
                required
              />
            </Form.Group>
          ))}

        <Form.Group controlId="meal">
          <Form.Label>Your Meal Preference</Form.Label>
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

        {/* There is an issue with representing x number of guests in the state and form submit */}
        {/* Also, limit number of guests to 10 */}

        {[...Array(Number(formData.guests))].map((_, index) => (
            <Form.Group controlId={`guest-meal-${index + 1}`} key={index}>
              <Form.Label>Guest #{index + 1} Meal Preference</Form.Label>
              <Form.Control
            as="select"
            name="meal"
            value={formData.guestMeal}
            onChange={handleChange}
          >
            <option value="chicken">Chicken</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="fish">Fish</option>
          </Form.Control>
            </Form.Group>
          ))}

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