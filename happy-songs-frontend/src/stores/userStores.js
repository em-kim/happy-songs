import {extendObservable} from "mobx";
var axios = require('axios');

export default class UserStore {
  constructor(){
    extendObservable(this, {
      user: {
        firstName: null
      },
      get retrieveUser() {
        return this.user
      }
    });
    axios.post('/getUser').then((data) =>{
      this.user = data.data
      console.log(this.user);
    });
  }

  setUser(user) {
    this.user = user
  }

  getUser() {
    //return null;
    return this.user;
  }

  submitSignup(signupObj) {
    var url = '/signup';
   
    fetch(url, {
        method: "POST",
        headers:{"Content-Type":"application/json"}, 
        body: JSON.stringify(
          {
            firstName: signupObj.firstName,
            lastName: signupObj.lastName,
            email: signupObj.email,
            password: signupObj.password
          }
        )
      }).then((response)=> { 
        return response.json();
      }).then((userObj) => { // USE ARROW NOTATION TO KEEP THIS
        //console.log("userObj"+userObj); // echos in app server terminal
        // the thing returned is the thing in the res.json of the app.js save
        if (userObj !== undefined) { 
          // this.setState({
          //   firstName: userObj.firstName,
          //   message: userObj.message,
          //   lastName: userObj.lastName,
          //   user: {
          //     name: userObj.firstName,
          //     lastName: userObj.lastName,
          //     email: userObj.email
          //   }
          // }); 
          this.user = {
              firstName: userObj.userReturned.firstName,
              message: userObj.message,
              firstName: userObj.firstName,
              lastName: userObj.lastName,
              // user: {
              //   name: userObj.firstName,
              //   lastName: userObj.lastName,
              //   email: userObj.email
              // }
            }
            console.log(userObj);
        
        }  else {
          console.log('user add failed');
        }
    }); 
  }

  submitLogin(loginObj) {
    var url = '/login'; 
    fetch(url, {                      
        method: "POST",
        headers:{"Content-Type":"application/json"}, 
        body: JSON.stringify(
          {
            email: loginObj.email,
            password: loginObj.password
          }
        )
      }).then(function (response) {
        return response.json();
    }).then((userObj) => {
      this.user = userObj
      console.log("HI AND STUFF");
      console.log(userObj);
      if (userObj.success) { 
        // this.setState({
        //   message: userObj.message,
        //   email: userObj.email,
        //   success: userObj.success
        // })
        // we returned a user
        // this.history.push("/");
        //<Router history={history} />
        this.setUser({firstName: userObj.user.firstName,lastName: userObj.user.lastName, email: userObj.user.email});
        //return (userObj);
      }else{
        console.log(userObj.message);
        // this.setState({
        //   message: userObj.message,
        //   email: userObj.email,
        //   success: userObj.success
        // });
      }
    }); 
  }
}