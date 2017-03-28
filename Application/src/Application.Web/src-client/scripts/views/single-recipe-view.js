import React from 'react';
import {SingleRecipeComponent} from "../components/single-recipe-component.js"
import {ACTIONS} from '../actions.js';



export const SingleRecipeView = React.createClass({

  componentDidMount: function(){
    ACTIONS.fetchSingleRecipe(this.props.routeParams.recipeId)
  },

  render: function(){
      return <SingleRecipeComponent {...this.props}/>
  }
})
