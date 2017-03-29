import React from 'react';
import {RecipeListComponent} from "../components/recipe-list-component.js"
import {ACTIONS} from '../actions.js';

export const CookbookView = React.createClass({

  componentWillMount: function(){
    let component = this;
    ACTIONS.fetchAllRecipies()
  },

  render: function(){

    return <RecipeListComponent {...this.props}/>
  }



})
