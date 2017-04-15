import React from 'react'
import {ACTIONS} from '../actions.js'

export const SingleRoute = React.createClass({

  _handleNavClick: function(){
    ACTIONS.routeTo(this.props.hashRoute)
  },

  render: function(){
    let singleClassName = "tab inner " + this.props.appRoute
      return (
      <a target="" onClick={this._handleNavClick}>
          <div className={singleClassName}>
              <span>{this.props.displayText}</span>
          </div>
        </a>
      )
    },

})



// old:
// <div className={navOptionClassName} onClick={this._handleNavClick}>
//         {this.props.displayText}
//       </div>
