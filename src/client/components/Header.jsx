import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const Header = () => {
    return (
        <div className="site-header">
            <h1 className="site-title my-0"><a href="/">Alex & Taryn</a></h1>
            <Navbar className="d-inline" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav d-flex">
                        <Nav className="d-flex justify-content-center">
                            <Nav.Link key={"1"} href={`http://localhost:3000/photos`}>Photos</Nav.Link>
                            <Nav.Link key={"2"} href={`http://localhost:3000/timeline-of-events`}>Timeline of Events</Nav.Link>
                            <Nav.Link key={"3"} href={`http://localhost:3000/travel`}>Travel</Nav.Link>
                            <Nav.Link key={"4"} href={`http://localhost:3000/things-to-do`}>Things to Do</Nav.Link>
                            <Nav.Link key={"5"} href={"http://localhost:3000/rsvp"}>RSVP</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header