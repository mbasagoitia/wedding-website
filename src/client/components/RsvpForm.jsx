import { useState } from "react";
import { Form, Button, Container } from 'react-bootstrap';
import Alert from "./Alert";
import submitFormData from "../helpers/submitFormData";

const RSVPForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    attendance: true,
    guests: 0,
    guestNames: [{}],
    email: '',
    phone: '',
    comments: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "attendance" ? value === "true" : value
    }));
  };

  const handleGuestNameChange = (index, e) => {
    setFormData((prevState) => {
      const updatedGuestNames = [...prevState.guestNames];
      
      if (!updatedGuestNames[index]) {
        updatedGuestNames[index] = { name: '', isChild: false };
      }
  
      updatedGuestNames[index].name = e.target.value;
  
      return {
        ...prevState,
        guestNames: updatedGuestNames,
      };
    });
  };
  

  const handleGuestIsChildChange = (index, e) => {
    const updatedGuestNames = [...formData.guestNames];
    updatedGuestNames[index].isChild = e.target.checked;
    setFormData((prevState) => ({
      ...prevState,
      guestNames: updatedGuestNames
    }));

    if (e.target.checked) {
      setAlertContent({
        title: "Thank You!",
        message: "We are thrilled to celebrate this special day surrounded by so many of our favorite young people! However, we kindly request that only ladies and gentlemen aged twelve and older join us for our thirty-minute wedding ceremony. For those who feel comfortable, on-site childcare will be available in the reception area, within view of the ceremony. Alternatively, parents are welcome to wait in the reception area with their children during the ceremony. We appreciate your understanding and can't wait to celebrate with you."
      });
      setShowAlert(true);
    }
  };
  const handleGuestNum = (e) => {
    const value = e.target.value;
  
    if (value === "") {
      setFormData((prevState) => ({
        ...prevState,
        guests: value,
      }));
      return;
    }
  
    const guestCount = Number(value);
  
    if (guestCount <= 10) {
      setFormData((prevState) => ({
        ...prevState,
        guests: guestCount,
        guestNames: Array.from({ length: guestCount }, (_, index) => prevState.guestNames[index] || { name: '', isChild: false }),
      }));
    } else {
      setAlertContent({
        title: "Error",
        message: "Guest limit of 10",
      });
      setShowAlert(true);
    }
  };
  

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await submitFormData(formData);
    if (res.success) {
      setAlertContent({
        title: "Success!",
        message: res.message
      });
    } else {
      setAlertContent({
        title: "Error",
        message: res.message
      });
    }
  setFormData(prevState => ({
    ...prevState,
    
    name: '',
    attendance: true,
    guests: 0,
    guestNames: [{}],
    email: '',
    phone: '',
    comments: '',
    message: ''
  }));
    setShowAlert(true);
  };

  return (
    <>
      {showAlert && <Alert content={alertContent} onClose={handleCloseAlert} />}
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
              <option value="true">Yes</option>
              <option value="false">No</option>
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

              {[...Array(Number(formData.guests))].map((_, index) => (
                <div key={index}>
                  <Form.Group controlId={`guest-name-${index + 1}`}>
                    <Form.Label>Guest #{index + 1} Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter guest's full name"
                      name={`guestName${index + 1}`}
                      value={formData.guestNames[index]?.name || ''}
                      onChange={(e) => handleGuestNameChange(index, e)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId={`guest-is-child-${index + 1}`}>
                    <Form.Check
                      className="my-4"
                      type="checkbox"
                      label="This guest is under 12"
                      checked={formData.guestNames[index]?.isChild || false}
                      onChange={(e) => handleGuestIsChildChange(index, e)}
                    />
                  </Form.Group>
                </div>
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

          {formData.attendance === false && (
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
            <p><em>In lieu of traditional gifts, please consider contributing to our honeymoon fund to help us create lasting memories! Please <a href="/contribute" target="_blank" rel="noreferrer">click here</a> if you would like to contribute.</em></p>
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
