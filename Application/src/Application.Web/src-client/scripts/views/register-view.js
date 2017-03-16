import React from 'react';
import Backbone from 'backbone';
import {STORE} from '../store.js';
import {ACTIONS} from '../actions.js'
import {LoginForm} from '../components/login-form-component.js';

export const LoginFormView = React.createClass({
  render: function(){
    return <LoginForm/>
  }
})
