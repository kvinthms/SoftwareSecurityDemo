import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { MDBInput } from "mdbreact";

class NewSighting extends Component {
    constructor(){
        super();
        this.state = {
            flowers: [],
            flowername: '',
            location: '',
            dateofsighting: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
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

    handleSubmit = (e) => {
        var regex = /^[12][09][0-9][0-9]-[01][0-9]-[0-3][0-9]$/
        if (!(regex.test(this.state.dateofsighting))){
            alert("Date Format incorrect");
            e.preventDefault()
        }
        else{
            axios.post('/api/sightingsInsert', {
                name: this.state.flowername,
                location: this.state.location,
                date: this.state.dateofsighting,
                username: localStorage.getItem('Token'),
            })
                .then((res, err) => {
                    if (!err) {
                        console.log(res);
                        window.location.reload(false);
                    }
                })
                .catch((err) => {
                    alert("Post Fail")
                    console.log(err);
                });
        }
        
    }
    

    handleLoad = () => {
        axios.post('/api/getflowers')
        .then((res, err) => {
            var tempflowers = [];

            for (var i = 0; i < res.data.length; i++) {
                tempflowers.push({"GENUS": res.data[i]['GENUS'], "SPECIES": res.data[i]['SPECIES'], "COMNAME": res.data[i]['COMNAME']});
            }
            this.setState({
                flowers: tempflowers,
                loaded: true,
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    componentDidMount() { window.addEventListener('load', this.handleLoad)}

    componentWillUnmount() { window.removeEventListener('load', this.handleLoad)}

    render(){

        if(true){
            return(
                <div style={{minHeight: 585}}>
                    <Container>
                        <br/>
                            <Card>
                                <Card.Body>
                                    <div class="d-flex justify-content-center">
                                        <Card.Title>New Sighting Form</Card.Title>
                                    </div>
                                    <Card.Body>
                                        <Row>
                                                <p>Flower Name: <MDBInput label="Flower Name" value={this.state.flowername} name="flowername" onChange={this.handleInputChange}/></p>
                                                <p>Location: <MDBInput label="Location" value={this.state.location} name="location" onChange={this.handleInputChange}/></p>
                                                <p>Date of Sighting (YYYY-MM-DD): <MDBInput label="Date of Sighting" value={this.state.dateofsighting} name="dateofsighting" onChange={this.handleInputChange}/></p>                                           
                                        </Row>
                                        <div class="d-flex justify-content-center">
                                            <Button variant="primary" onClick={this.handleSubmit}>Finish</Button>
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
}

export default NewSighting;
