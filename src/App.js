import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar.js';
import SingleUser from './components/users/SingleUser';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/Abbout';
import axios from 'axios';

import GithubState from './components/context/github/GithubState';

const App = () => {


  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    setAlert(msg, type);
    setTimeout(() => setAlert(null), 3000);
  }

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar icon='fab fa-github' title='Github Finder' />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route exact path="/" render={(props) => (
                <Fragment>
                  <Search
                    setAlert={showAlert}
                  />
                  <User />
                </Fragment>
              )} />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" component={SingleUser} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  )
}

export default App;
