import React, { Component } from 'react';

export default class Footer extends Component{
  constructor(){
    super();
  }
  render(){ 
    return(
      <footer>
        <p class="float-right"><a href="#">Back to top</a></p>
        <p>© 2017 Company, Inc. · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
      </footer>
    );
  };
}