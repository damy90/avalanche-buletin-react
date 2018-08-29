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
import TestDetails from './components/tests/TestDetails';
import Account from './components/user/Account';
import Users from './components/admin/Users';
import Tests from './components/tests/TestsManagement';
import withAuthorization from './hocs/withAuthorization';
import ChangePasswordForm from './components/user/ChangePasswordForm';

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
          <Route path="/report/:id/edit" exact component={SubmitTest}/>
          <Route path="/report/:id" exact component={TestDetails}/>
          <Route path="/log-in" exact component={LoginForm}/>
          <Route path='/logout' component={Logout} />
          <Route path='/register' component={RegisterForm} />
          <Route path='/user/:id' component={Account} />
          <Route path='/change-password' component={withAuthorization(ChangePasswordForm, 'Registered')} />
          <Route path='/admin/users' component={Users} />
          <Route path='/admin/tests' component={withAuthorization(Tests, 'Admin')} />
        </div>
      </div>
      
    );
  }
}

export default App;
