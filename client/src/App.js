import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from "./views/Login/Login"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Signout from "./components/signout"
import Home from "./views/Home/Home"
import Dashboard from "./views/Dashboard/Dashboard"
import Register from "./views/Register/Register"
import ViewFlowers from "./components/ViewFlowers"
import signout from "./components/signout"
import NewSighting from "./components/NewSighting"
import TestPerformance from "./components/TestPerformance"
import Search from "./components/Search"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Admin from "./views/Admin/Admin"

import PrivateRoute from './PrivateRoute'

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/signout" component={Signout} />
        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
        
        <PrivateRoute exact path="/listflowers" component={ViewFlowers} />
        <Route exact path="/signout" component={signout} />
        <PrivateRoute exact path="/newsighting" component={NewSighting}/>
        <PrivateRoute exact path="/performance" component={TestPerformance}/>
        <PrivateRoute exact path="/search/" component={Search}/>
        <PrivateRoute exact path="/admin/" component={Admin}/>

        <Route component={NotFound}/>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
