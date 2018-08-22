import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import Home from './components/home/Home';
//import './styles/site.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Header username={this.username}/> */}
        <Route path='/' exact component={Home} />
        {/* <Route path='/logout' component={Logout} /> */}
      </div>
    );
  }
}

export default App;
