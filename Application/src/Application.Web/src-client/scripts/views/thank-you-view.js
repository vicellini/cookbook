import React from 'react';
import {ACTIONS} from '../actions.js'


export const SuccessView = React.createClass({

  componentDidMount: function(){
    setTimeout(function(){
      ACTIONS.routeTo('cookbook')
    }, 3500)
  },

  render : function(){
    console.log("i'm here")
    return(
    <div className="thank-you-page">
        <h1>Thank You!</h1>
        <h3>Recipe Submitted</h3>
        <img src="https://uncomelyandbroken.files.wordpress.com/2015/02/4474884936_0dea8212d2.jpg"/>
        <p>page will return to cookbook automatically</p>
    </div>
    )
  }
})
