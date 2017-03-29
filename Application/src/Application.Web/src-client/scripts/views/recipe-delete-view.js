import React from 'react';
import {ACTIONS} from '../actions.js'


export const ByeByeView = React.createClass({

  componentDidMount: function(){
    setTimeout(function(){
      ACTIONS.routeTo('cookbook')
    }, 3500)
  },

  render : function(){
    return(
    <div className="recipe-delete-page">
        <h1>Bye Bye...</h1>
        <h3>Recipe Deleted</h3>
        <img src="https://pencils.com/wp-content/uploads/2014/10/Fotolia_40377656_Subscription_Monthly_M.jpg"/>
        <p>page will return to cookbook automatically</p>
    </div>
    )
  }
})
