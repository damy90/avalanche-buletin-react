import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import Home from './components/home/Home';
//import './styles/site.css'
import Navigation from './components/common/Navigation';
import SubmitTest from './components/tests/SubmitTest';
import authentication from './infrastructure/authentication';
import LoginForm from './components/user/LoginForm';
import Logout from './components/user/Logout';
import RegisterForm from './components/user/RegisterForm';

class App extends Component {
  componentWillMount = () =>{
    // To view public info from kinvey you need to be logged in as anonymous
    if(!authentication.isLoggedIn()){
      // Log into public account
      authentication.logIn.send({})
        .then(authentication.logIn.success)
        .catch(authentication.logIn.fail);
    }
  }
//className="hidden"
  render() {
    return (
      <div>
        <Navigation/>
        <div className="App">
          {/* <Header username={this.username}/> */}
          <Route path='/' exact component={Home} />
          <Route path="/submit-report" exact component={SubmitTest}/>
          <Route path="/log-in" exact component={LoginForm}/>
          <Route path='/logout' component={Logout} />
          <Route path='/register' component={RegisterForm} />
          {/* <Route path='/logout' component={Logout} /> */}
        </div>
      </div>
      
    );
  }
}

export default App;
