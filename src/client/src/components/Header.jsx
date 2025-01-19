import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const Header = () => {
    return (
        <div className="site-header">
            <div>
                <h1 className="site-title my-0">Alex & Taryn</h1>
            </div>
            <Navbar expand="md">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav d-flex">
                        <Nav className="m-auto w-80 d-flex justify-content-center">
                            <Nav.Link key={"#"} href={`#`}>Photos</Nav.Link>
                            <Nav.Link key={"#"} href={`timeline-of-events`}>Timeline of Events</Nav.Link>
                            <Nav.Link key={"#"} href={`travel`}>Travel</Nav.Link>
                            <Nav.Link key={"#"} href={`things-to-do`}>Things to Do</Nav.Link>
                            <Nav.Link key={"#"} href={"rsvp"}>RSVP</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header