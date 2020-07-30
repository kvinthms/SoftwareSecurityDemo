import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardGroup'

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
        }
    }

    render(){
        return (
            <div style={{minHeight: 750}}>
                <br/>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">
                            <CardDeck>
                                <Card>
                                    <Card.Img variant="top" src="/images/listicon.png" />
                                    <Card.Body>
                                        <Card.Title>List Flowers</Card.Title>
                                        <Button variant="primary" onClick={e=>window.location = "/listflowers"}>List Flowers</Button>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Img variant="top" src="/images/plusicon.png" />
                                    <Card.Body>
                                        <Card.Title>Add Sighting</Card.Title>
                                        <Button variant="primary" onClick={e=>window.location = "/newsighting"}>Add Sighting</Button>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Img variant="top" src="/images/searchicon.png" />
                                    <Card.Body>
                                        <Card.Title>Search Flowers</Card.Title>
                                        <Button variant="primary" onClick={e=>window.location = "/search"}>Search Flowers</Button>
                                    </Card.Body>
                                </Card>
                            </CardDeck>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
    
}

export default Dashboard;
