import React from 'react';
import {SingleRecipeComponent} from "../components/single-recipe-component.js"
import {ACTIONS} from '../actions.js';



export const SingleRecipeView = React.createClass({

  componentDidMount: function(){
    ACTIONS.fetchSingleRecipe(this.props.recipeIdInRoute)
  },

  render: function(){
    console.log(this.props.singleRecipe)
      return <SingleRecipeComponent {...this.props}/>
  }
})
