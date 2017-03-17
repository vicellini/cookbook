import React from 'react';
import Backbone from 'backbone';
import {ACTIONS} from '../actions.js';
import {UserModel} from '../models/model-user.js';


export const LoginForm  = React.createClass({
  getInitialState:function(){
    return {signup:false,login:true}
  },

  switchTab: function(tab){
    var signup,login;
    if(tab == "signup"){signup = true;login = false;}
    else{login = true; signup = false;}
    return this.setState({login:login,signup:signup})

  },

  render:function(){
        var self = this;
        return (
              <div className="signupTab-component">
                  <div className="tabs">
                      <p id="signupButton" onClick={self.switchTab.bind(null,"signup")} className={self.state.signup ? "yellow":"blue"}>Register</p>
                      <p id="loginButton" onClick={self.switchTab.bind(null,"login")} className={self.state.login ? "yellow":"blue"}>Login</p>
                  </div>
                   {self.state.signup?<Signup/> : null}
                   {self.state.login? <Login/> : null}
              </div>
        )
  }
})


let Signup = React.createClass({

      render:function(){

            return (
            <div className="signup_input">
              <form className="signup" onSubmit={this._handleSignup}>
                    <input type="text" className="form-control" name="usernameField" placeholder="Username"/>
                    <input type="email" className="form-control" name="emailField" placeholder="Email"/>
                    <input type="password" className="form-control" name="passwordField" placeholder="Password"/>
                    <input type="password" className="form-control" name="confirmField" placeholder="Confirm Password"/>
                    <button className="btn btn-signup" type="submit">Sign Up</button>
              </form>
            </div>

            )
      },

      _handleSignup: function(evt){
        evt.preventDefault();
        let formEl = evt.target
        let objToSave = {
          username: formEl.usernameField.value ,
          email: formEl.emailField.value ,
          password: formEl.passwordField.value ,
          confirmPassword: formEl.confirmField.value
        }
        ACTIONS.registerNewUser(objToSave)
      }
})

let Login = React.createClass({
      render:function(){

            return (
              <div className="login_input">
                 <form className="login" onSubmit={this._handleSubmit}>
                    <input type="text" className="form-control" name="emailField" placeholder="Email"/>
                    <input type="password" className="form-control" name="passwordField" placeholder="Password"/>
                    <button className="btn btn-login" type="submit">Login</button>
                 </form>
              </div>
            )
      },

      _handleSubmit: function(evt){
        evt.preventDefault()
        let formEl = evt.target
        let userVal = formEl.emailField.value
        let passwordVal = formEl.passwordField.value
        ACTIONS.logInUser(userVal, passwordVal)
      },
})
