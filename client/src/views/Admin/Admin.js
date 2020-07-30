import React, { Component } from 'react';
import './Home.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Route, Redirect } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'



class Admin extends Component {
    constructor(){
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            result: [],
        }
    }

    handleSubmit = () => {
        axios.post('/api/getusers')
        .then((res, err) => {

        	var tempusers = [];
        	for (var j = 0; j < res.data.length; j++){
            	tempusers.push(res.data[j]);
			}
			this.setState({
                result: tempusers,
            })
			
        })
        .catch((err) => {
        	console.log(err);
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(name, value);
	}
	


	componentDidMount() { window.addEventListener('load', this.handleSubmit)}

    componentWillUnmount() { window.removeEventListener('load', this.handleInputChange)}

    render(){

        const showResults = this.state.result.map((element, index) => {
            return(
                <Container>
                    <br/>
                        <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card.Title>{element.USERNAME}</Card.Title>
                                </Col>
                            </Row>
                        </Card.Body>
                        </Card> 
                    <br/>
                </Container>
             );
        }) 

        var token = localStorage.getItem('Token');
        var decoded = jwt_decode(token);
        var username = decoded.username;

		if(username == 'admin') {
			return (
				<div style={{minHeight: 725}}>
				<Card>
				<MDBContainer>

		REGISTERED USERS:
					<MDBRow>
						<MDBCol md="6">
							<row>
                                 {showResults}
							</row>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
				</Card>

				</div>
			);			
		}
		else {
			return(
				<Redirect to={{
                    pathname: '/dashboard',
                  }} />
			)
		}

    }
    
}

export default Admin;
