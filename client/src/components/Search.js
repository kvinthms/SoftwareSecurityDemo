import React, { Component } from 'react';
import { MDBInput } from 'mdbreact';
import 'react-awesome-slider/dist/styles.css';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

class Search extends Component {
    constructor(){
        super();
        this.state = {
            search: '',
            result: [],
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(name, value);
    }

    handleSubmit = () => {
        if(this.state.search !== ''){
            axios.post('/api/search', {
                search: this.state.search,
            })
                .then((res, err) => {
                    this.setState({
                        result: res.data,
                    })
                })
                .catch((err) => {
                    console.log(err);
                });
        }  
    }

    render(){
        const showResults = this.state.result.map((element, index) => {
            return(
                <Container>
                    <br/>
                        <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card.Title>{element.COMNAME}</Card.Title>
                                </Col>
                            </Row>
                        </Card.Body>
                        </Card> 
                    <br/>
                </Container>
             );
        }) 
        
        return (
            <div style={{minHeight: 750}}>
                <Container>
                    <br/>
                        <Card>
                            <Card.Body>
                                <div className="d-flex justify-content-center">
                                    <Card.Title>Search Flowers</Card.Title>
                                </div>
                                <Card.Body>
                                    <Row>
                                        <p><MDBInput label="Search" value={this.state.search} name="search" onChange={this.handleInputChange}/></p>
                                        <Button variant="primary" onClick={this.handleSubmit}>Search</Button>
                                    </Row>
                                    <div className="d-flex justify-content-center">
                                        {showResults}
                                    </div>
                                </Card.Body>
                            </Card.Body>
                        </Card> 
                    <br/>
                </Container>
            </div>

        );
    }
    
}

export default Search;
