import React, { Component } from 'react';
import './App.css';
import TrackBlock from './tracks/TrackBlock.js';
import Feature from './features/Feature';
import Menu from './menu/Menu';
import Footer from './features/Footer';
import { Provider } from "mobx-react";
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Login from './user/Login';
import SignUp from './user/SignUp';
import About from './features/About';
import Favorites from './tracks/Favorites';
import UserStore from "./stores/userStores";
import TrackStore from "./stores/trackStore";

class App extends Component {
  constructor() {
    super();
    this.state = {
      initialized: false,
      musicData: '',
      playCount: [],
      success: null
    }
  }

  fetchPlayCount() {
    var url = '/tracks/';
    fetch(url).then(function (response) {
      return response.json();
    }).then((trackObj) => {
      if (trackObj !== undefined) {
        console.log(trackObj);
        this.setState({
          playCount: trackObj
        });
      } else {
        console.log('defined');
      }
    });
  }

  componentDidMount() {
    fetch('/spotify').then((webObj) => {
      return webObj.json(); // auth token
    }).then((data) => {
      this.setState({
        initialized: true,
        musicData: data
      });
    });
    this.fetchPlayCount();
  }

  render() {
    if (this.state.initialized) {
      return (
        <div className="App">
          <Provider UserStore={new UserStore()} TrackStore={new TrackStore()}>
            <Router>
              <div>
                <header><Menu getUser={this.getUser} /></header>
                <Feature />
                <div className="container">
                  <Route exact path='/' render={() => <TrackBlock musicData={this.state.musicData} playCount={this.state.playCount} />} />
                  <Route path='/login' render={() => <Login history={this.props.history} success={this.state.success} />} />
                  <Route path='/signup' render={() => <SignUp />} />
                  <Route path='/about' render={() => <About />} />
                  <Route path='/favorites' render={() => <Favorites musicData={this.state.musicData} playCount={this.state.playCount} />} />
                </div>
                <Footer />
              </div>
            </Router>
          </Provider>
        </div>
      );
    } else {
      return (
        <div className="loading"><img alt="Loading..." src="./music.gif" /></div>
      )
    }
  }
}

export default App;