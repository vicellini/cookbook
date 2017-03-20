import React from 'react';
import {ACTIONS} from '../actions.js';

export const UserButton = React.createClass({

  _handleLogOutRoute: function(){
    ACTIONS.logOutUser()
  },

  render: function(){
    return (
      <div className="account-button">
        <button onClick={this._handleLogOutRoute}>Log Out</button>
      </div>
    )
  }

})
