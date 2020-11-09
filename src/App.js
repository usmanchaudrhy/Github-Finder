import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar.js';
import SingleUser from './components/users/SingleUser';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/Abbout';
import axios from 'axios';


class App extends React.Component {
  
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: [],
  }

  async componentDidMount(){
    this.setState({
      loading: true,
    });
    const res = await axios.get(`https://api.github.com/users?
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({
      users: res.data,
      loading: false,
    })
  }

  searchUsers = async text => {
    this.setState({
      loading: true,
    })
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({
      users: res.data.items,
      loading: false
    });
  }

  /**
   * Get a Single User from Github
   */
  getUser = async (username) => {
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}?
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({
      user: res.data,
      loading: false,
    })
  }

  /**
   * Get USer Repos
   */
  getUserRepos = async (username) => {
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({
      repos: res.data,
      loading: false,
    })
  }

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({
      alert: { msg: msg, type: type }
    });
    setTimeout(() => this.setState({ alert: null }), 3000);
  }

  render(){ 
    return(
      <Router>
        <div className="App">
          <Navbar icon='fab fa-github' title='Github Finder'/>
          <div className="container">
             <Alert alert={this.state.alert}/>
             <Switch>
             <Route exact path="/" render={(props) => (
                <Fragment>
                  <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={this.state.users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <User loading={this.state.loading} users={this.state.users} />
                </Fragment>
              )} />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" render={(props) => (
                <SingleUser {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} user={this.state.user} loading={this.state.loading} repos={this.state.repos}/>
              )}
              />
             </Switch>
          </div>
        </div>
      </Router>
    )}
}

export default App;
