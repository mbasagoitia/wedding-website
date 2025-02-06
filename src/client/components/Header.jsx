import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Header = () => {
    return (
        <div className="site-header">
            <h1 className="site-title my-0"><a href="/">Alex & Taryn</a></h1>
            <Navbar className="d-inline" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav d-flex">
                    <Nav className="d-flex justify-content-center">
                        <NavDropdown title="Photos" id="upload-dropdown" className="dropdown-hover">
                            <NavDropdown.Item href={`/photos`}>View Photos</NavDropdown.Item>
                            <NavDropdown.Item href="/photos/upload">Upload Photos</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href={`/timeline-of-events`}>Timeline of Events</Nav.Link>
                        <Nav.Link href={`/travel`}>Travel</Nav.Link>
                        <Nav.Link href={`/things-to-do`}>Things to Do</Nav.Link>
                        <Nav.Link href={"/rsvp"}>RSVP</Nav.Link>
                        <Nav.Link href={"/contribute"}>Help Us Celebrate</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default Header;
