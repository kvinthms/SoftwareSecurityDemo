import React from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    var token = localStorage.getItem('Token');

    axios.post('/auth/auth', { 
        "token" : localStorage.getItem('Token'),
    })
    .then((result) => {
    })
    .catch((error) => {
        console.log('fail');
        localStorage.removeItem('Token');
        window.location = "/login"
    });
    if(token){
        return (
            <Route {...rest} render={(props) => (
                <Component {...props} />
            )} />
          )
    }
    else{
        return (
            <Route {...rest} render={(props) => (
                    <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                  }} />
            )} />
          )
    }
    

}

  export default PrivateRoute;