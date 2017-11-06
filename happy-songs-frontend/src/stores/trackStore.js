import {extendObservable} from "mobx";
var axios = require('axios');

export default class TrackStore {
  constructor(){
    extendObservable(this, {
      track: null,
      get retrieveTrack() {
        return this.track
      }
    });
    axios.post('/getTrack').then((data) =>{
      this.track = data.data
      console.log(this.track);
    });
  }
}