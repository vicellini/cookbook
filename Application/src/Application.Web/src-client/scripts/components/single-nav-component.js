import React from 'react'
import {ACTIONS} from '../actions.js'

export const SingleRoute = React.createClass({
  _handleNavClick: function(){
    ACTIONS.navChange(this.props.appRoute, this.props.hashRoute)
  },

  render: function(){

    let navOptionClassName = 'nav-button'
      if(this.props.appRoute === this.props._currentRoute){
         navOptionClassName = 'nav-button nav-button-selected'
      }
      return <div className={navOptionClassName} onClick={this._handleNavClick}>
              {this.props.displayText}
            </div>
    },

})
