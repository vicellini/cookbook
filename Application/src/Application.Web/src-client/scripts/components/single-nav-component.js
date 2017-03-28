import React from 'react'
import {ACTIONS} from '../actions.js'

export const SingleRoute = React.createClass({
  _handleNavClick: function(){
    ACTIONS.routeTo(this.props.hashRoute)
  },

  render: function(){
      return (
        <a target="_blank" onClick={this._handleNavClick}>
          <div className="tab inner">
              <img src={this.props.img}/>
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
