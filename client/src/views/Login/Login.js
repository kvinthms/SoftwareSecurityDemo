import React, { Component } from 'react';
import './Home.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import axios from 'axios';

class Login extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            username: '',
            password: '',
        }
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

    handleSubmit(e){
        axios.post('/auth/login', { 
            "username" : this.state.username,
            "password" : this.state.password,
        })
        .then((result) => {
            localStorage.setItem('Token', result.data.token);
            window.location = "/dashboard"
        })
        .catch((error) => {
          if(error.response.status === 400) {
            alert("Login Failure");
          }
          
        });
        e.preventDefault();
    }

    render(){
        return (
            <div style={{minHeight: 725}}>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">
                        <form autoComplete="off">
                            <br/>
                            <p className="h4 text-center mb-4">Sign in</p>
                                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                    Username
                                </label>
                            <input
                                type="text"
                                name="username"
                                id="standard-required"
                                className="form-control"
                                onChange={this.handleInputChange}
                                value={this.state.username}
                            />
                            <br />
                            <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                            Password
                            </label>
                            <input
                                label="Password"
                                type="password"
                                id="standard-required"
                                name="password"
                                className="form-control"
                                onChange={this.handleInputChange}
                                value={this.state.password}
                            />
                            <div className="text-center mt-4">
                                <button color="indigo" type="submit" onClick={this.handleSubmit}>Login</button>
                            </div>
                        </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
    
}

export default Login;
