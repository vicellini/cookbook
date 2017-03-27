import React from 'react';
import {ACTIONS} from '../actions.js';

export const UserButton = React.createClass({

  _handleLogOutRoute: function(){
    ACTIONS.logOutUser()
  },

  render: function(){
    let classList
    if(this.props.loggedIn === true){
      classList = "account-button"
    }else{
      classList = "account-button"
    }
    return (
      <div className={classList}>
        <span onClick={this._handleLogOutRoute}>
          Sign Out <i className="fa fa-sign-out" aria-hidden="true"></i>
        </span>
      </div>
    )
  }

})
