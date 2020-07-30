import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class signout extends Component {

    render(){
        localStorage.removeItem('Token');

        window.location = "/Home"
        return(
            <main>
                <Redirect to={{
                    pathname: '/Home'
                }}
                />
            </main>
        );
    }
}

export default signout;
