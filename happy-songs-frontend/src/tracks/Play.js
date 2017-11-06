import React, { Component } from 'react';
import Popularity from "./Popularity";
import {inject, observer} from 'mobx-react';
var FontAwesome = require('react-fontawesome');

var Play = observer(class Play extends Component{
  constructor(){
    super();
    this.recordPlay = this.recordPlay.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      playCount: 0
    }
  } 
  recordPlay(){
    var win = window.open(this.props.link, '_blank'); // if we don't want the window open
    
    // do a fetch to a route, maybe pass in the track id to the route
    // find current count in db and up one
    var url = '/tracks/' + this.props.trackid;
    fetch(url, {
        method: "PUT",
        headers:{"Content-Type":"application/json"}, 
        body: JSON.stringify(
          this.props.UserStore.getUser()
        )
      }).then(function (response) {
        //debugger;
      return response.json();
    }).then((trackObj) => {
      if (trackObj !== undefined) { 
        this.setState({
          playCount: trackObj.playCount
        });
      }  else {
      }
    });
    return false;
  }
  componentDidMount() {
    this.setState ({
      playCount: this.props.playCount
    })
  }
  handleClick() { 
    this.recordPlay();
  }
  render(){
    return( 
      <div>
        <p><a onClick={this.handleClick}><FontAwesome name='play-circle' /></a></p>
        <Popularity pop={this.state.playCount}/>
      </div>
    );
  };
})

export default inject('UserStore', 'TrackStore')(Play);