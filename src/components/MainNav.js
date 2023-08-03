import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAtom } from 'jotai'; // Absolutely stupid that importing useAtom here would cause server errors unless I import it in the _app.js
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
    // Set up router to redirect to /artwork page
    const router = useRouter();
    // Set up a state to close the hamburger menu after submitting search
    const [isExpanded, setExpand] = useState(false);
    // Get a reference from searchHistory
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    // Prevent hydration, trivial stuff to implement
    const [isClient, setIsClient] = useState(false);

    // Read a token
    let token = readToken();

    // For the hydration problem
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Extract the search value and navigate to the target page
    async function handleSearch(e) {
        e.preventDefault();
        let searchField = e.target.search.value;
        router.push(`/artwork?title=true&q=${searchField}`);

        setExpand(false);
        // add the queryString to the atom
        setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
        //setSearchHistory(current => [...current, `title=true&q=${searchField}`])
    }

    // Following the requirements with wrapping the <Link> tags causing React to keep 
    // complaining about the <a><a></a></a> wrapping, took me hours to debug and only able
    // to resolve by using a callback function to get away from the warnings.
    const navigateToLink = (link) => {
        setExpand(false);
        router.push(link);
    };

    function logout() {
        setExpand(false);
        removeToken();
        router.push('/login');
    }
    
    return (
        <>
            { isClient && (
                <>
                <Navbar className='fixed-top' expanded={isExpanded} bg="dark" variant="dark" expand="md">
                <Container>
                    <Navbar.Brand>Wai Hing William Tse</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpand(!isExpanded)} />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="me-auto">
                            <Nav.Link href="/" onClick={() => setExpand(false)} active={router.pathname === "/"}>Home</Nav.Link>
                            {token && <Nav.Link href="/search" onClick={() => setExpand(false)} active={router.pathname === "/search"}>Advanced Search</Nav.Link>}
                        </Nav>

                        { !token && (
                            <Nav>
                                <Nav.Link href="/register" onClick={() => setExpand(false)} active={router.pathname === "/register"}>Register</Nav.Link>
                                <Nav.Link href="/login" onClick={() => setExpand(false)} active={router.pathname === "/login"}>Login</Nav.Link>
                            </Nav>
                        )}
                        

                        &nbsp;{token && <Form className="d-flex" onSubmit={handleSearch}>
                            <Form.Control
                                type="search"
                                name="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button type='submit' variant="success">Search</Button>
                        </Form>}&nbsp;
                        
                        <Nav>
                            {token && <NavDropdown title={token.userName} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => navigateToLink('/favourites')}>Favourites</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigateToLink('/history')}>Search History</NavDropdown.Item>
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                            </NavDropdown>}
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
            </>
            )}
            
        </>
    );
}

/* 
<Nav>
    <NavDropdown title="User Name" id="basic-nav-dropdown">
        <Link href="/favourites">
            <NavDropdown.Item href="/favourites" onClick={() => setExpand(false)}>Favourites</NavDropdown.Item>
        </Link>

        <Link href="/history">
            <NavDropdown.Item href="/history" onClick={() => setExpand(false)}>Search History</NavDropdown.Item>
        </Link>
    </NavDropdown>
</Nav>

*/