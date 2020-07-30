import React, { Component } from 'react';
import { MDBContainer, MDBRow } from 'mdbreact';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

class Home extends Component {
    constructor(){
        super();
        this.state = {
        }
    }

    render(){
        return (
            <div style={{minHeight: 750}}>
                <br/>
                <MDBContainer>
                    <MDBRow>
                        <AwesomeSlider>
                            <div data-src="/images/f1.webp" />
                            <div data-src="/images/f2.png" />
                            <div data-src="/images/b1.jpg" />
                        </AwesomeSlider>
                    </MDBRow>
                </MDBContainer>
            </div>

        );
    }
    
}

export default Home;
