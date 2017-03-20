import React from 'react'
import {ACTIONS} from '../actions.js'

export const logoutButton = React.createClass({
  _handleLogout: function(){
    ACTIONS.navChange('ACCOUNT', '')
  },

  render: function(){
    return (
      <div className="home-button">
        <button onClick={this._handleLogout}>Logout</button>
      </div>
    )
  },

})
