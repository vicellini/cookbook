import React from 'react';
import {ACTIONS} from '../actions.js';

export const UserButton = React.createClass({

  _handleLoginRoute: function(){
    ACTIONS.navChange('ACCOUNT', '')
  },

  render: function(){
    return (
      <div className="account-button">
        <button onClick={this._handleLoginRoute}>Sign In</button>
      </div>
    )
  }

})
