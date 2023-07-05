import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';


export default function MainNav() {
    // Set up router to redirect to /artwork page
    const router = useRouter();

    // Extract the search value and navigate to the target page
    const handleSearch = (e) => {
        e.preventDefault();        
        let searchField = e.target.search.value;
        router.push(`/artwork?title=true&q=${searchField}`);        
    }

    // Trigger handleSearch when form is submitted
    return (
        <>
            <Navbar className='fixed-top' bg="dark" variant="dark" expand="md">
                <Container>
                    <Navbar.Brand>Wai Hing William Tse</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" passHref legacyBehavior>Home</Nav.Link>
                            <Nav.Link href="/search" passHref legacyBehavior>Advanced Search</Nav.Link>
                        </Nav>
                        <Form className="d-flex" onSubmit = {handleSearch}>
                            <Form.Control
                                type="search"
                                name="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button type='submit' variant="success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}