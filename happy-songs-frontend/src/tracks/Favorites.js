import React, { Component } from 'react';
import TrackBlock from './TrackBlock';
import {inject, observer} from 'mobx-react';

var Favorites = observer(class Favorites extends Component{
  render(){ 
    return(
      <div>
        <h1>Favoritos</h1>
        <p>{this.props.UserStore.getUser().firstName}</p>
        <TrackBlock musicData={this.props.musicData} playCount={this.props.playCount} />
      </div>
    );
  };
})

export default inject('UserStore', 'TrackStore')(Favorites);
