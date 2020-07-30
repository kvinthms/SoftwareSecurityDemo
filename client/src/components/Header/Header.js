import React from 'react';
import './Header.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const Header = () => {
    try {
        var username = localStorage.getItem('Token');
        var token = username
    } catch (error) {}

    var websiteName = "Southern Sierra Wildflower Club"

    if(token){
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">{websiteName}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="https://minip1-272004.appspot.com/Home">Secure Site</Nav.Link>
                    <Nav.Link href="/signout">Sign Out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="/signout">{username}</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        );
    }
    else{
        return (
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">{websiteName}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="https://minip1-272004.appspot.com/Home">Secure Site</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <a href="/register">Register</a> | <a href="/login">Login</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
        );
    }

}

export default Header;
