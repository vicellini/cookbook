import React from 'react';
import {RecipeForm} from '../components/recipe-form-component.js'
import {STORE} from '../store.js';
import {ACTIONS} from '../actions.js';

export const NewRecipeView = React.createClass({
  render: function(){
    return (
      <div>
        <RecipeForm/>
      </div>
    )
  }
})
