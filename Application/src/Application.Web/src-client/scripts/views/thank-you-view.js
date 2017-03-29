import React from 'react';
import {ACTIONS} from '../actions.js'


export const SuccessView = React.createClass({

  componentDidMount: function(){
    setTimeout(function(){
      ACTIONS.routeTo('cookbook')
    }, 2750)
  },

  render : function(){
    console.log("i'm here")
    return(
    <div className="thank-you-page">
        <h1>Thank You!</h1>
        <h3>Recipe Submitted</h3>
        <p>page will return to cookbook automatically</p>
    </div>
    )
  }
})
