import React from 'react';
import Backbone from 'backbone';
import {RecipeModel} from '../scripts/models/model-recipe.js'
import {ACTIONS} from '../actions.js';

export const RecipeForm = React.createClass({
  getInitalState: function(){
    return {
      ingredientList: [],
      directionList: []
    }
  },

  render: function(){
    <div className="new-recipe_container">
      <form className="new-recipe_form" onSubmit={_handleFormSubmit}>

      </form>
    </div>
  }
})
