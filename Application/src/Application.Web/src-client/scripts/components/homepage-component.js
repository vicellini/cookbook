import React from 'react'
import {ACTIONS} from '../actions.js'

export const homePage = React.createClass({
  _handleHomeClick: function(){
    ACTIONS.navChange(this.props.appRoute, this.props.hashroute)
  },

  render: function(){
    let 
  },

})
