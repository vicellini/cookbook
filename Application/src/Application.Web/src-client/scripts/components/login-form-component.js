import React from 'react';
import Backbone from 'backbone';
import {ACTIONS} from '../actions.js';
import {UserModel} from '../models/model-user.js';

export const LoginForm  = React.createClass({
  getInitialState:function(){
    return {signup:false,login:true}
  },

  _switchTab: function(tab){
    var signup,login;
    if(tab == "signup"){signup = true;login = false;}
    else{login = true; signup = false;}
    return this.setState({login:login,signup:signup})

  },
  render:function(){

        var self = this;
        return (
              <div>

                  <div id="buttons">
                      <p id="signupButton" onClick={self.switch.bind(null,"signup")} className={self.state.signup ? "yellow":"blue"}>Sign In</p>
                      <p id="loginButton" onClick={self.switch.bind(null,"login")} className={self.state.login ? "yellow":"blue"}> Login</p>
                  </div>

                   {self.state.signup?<Signup/> : null}
                   {self.state.login? <Login /> : null}

              </div>

        )


  }
})


var Signup = React.createClass({

      render:function(){

            return (
            <div>
              <form id="signup">
                    <input type="text" id="username" name="usernameField"/>
                    <input type="email" id="email" name="emailField"/>
                    <input type="password" id="password" name="passwordField"/>
                    <input type="password" id="confirm" name="confirmField"/>
                    <button id="btn-signup">Sign Up</button>
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

var Login = React.createClass({
      render:function(){

            return (
              <div>
                 <form id="login">
                    <input type="email" id="email" emailField="Email"/>
                    <input type="password" id="password" passwordField="Password"/>
                    <button id="btn-login">Login</button>
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
