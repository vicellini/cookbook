import React from 'react';
import Backbone from 'backbone';
import {RecipeModel} from '../models/model-recipe.js'
import {PreviewLists} from './form-preview-component.js'
import {ACTIONS} from '../actions.js';

export const RecipeForm = React.createClass({
  getInitalState: function(){
    return {
      ingredientList: [],
      directionList: [],
      imgPreviewLink: ''
    }
  },

  _updateIngredientList: function(ingredientName){
    let copyOfItems = this.state.ingredientList.map(function(copy){return copy})
      let copyOfItemsMinus = copyOfItems.filter(function(someObj){
            if(ingredientName !== ingredientObj.name){
              return true
            } else {
              return false
            }
          })
          this.setState({
            ingredientList: copyOfItemsMinus
          })
     },

  _updateDirectionList: function(directionStr){
   let copyOfItems = this.state.directionList.map(function(copy){return copy})
     let copyOfItemsMinus = copyOfItems.filter(function(someStr){
           if(directionStr !== someStr){
             return true
           } else {
             return false
           }
         })
         this.setState({
           directionList: copyOfItemsMinus
         })
    },

  render: function(){
    <div className="new-recipe_container">
      <form className="new-recipe_form" onSubmit={_handleFormSubmit}>
        <div className="form-group__field field_recipe-name">
          <label>Recipe Name</label>
          <input type="text" name="recipeName" placeholder="Enter Name"/>
          <p class="flash-msg"></p>
        </div>
        <form className="ingredient_form">
          <label>Add Ingredient</label>
          <span>Qty.</span><input type="text" ref="ingredient-qty"/>
          <input type="text" ref="ingredient-name"/><button onClick={_handleAddIngredient}>&#43;</button>
          <p class="flash-msg"></p>
        </form>
        <select name="category">
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
        </select>
        <form className="direction_form">
          <label>Add Direction</label>
          <input type="text" ref="single-direction"/><button onClick={_handleAddDirection}>&#43;</button>
          <p class="flash-msg"></p>
        </form>
        <div className="form-group__field field_recipe-image">
          <input type="text" name="imgInputEl" ref="previewImgEl"/>
          <button onClick={this._handleImgPreviewClick} >&#43;</button>
        </div>
      </form>
      <PreviewList
        {...this.state}
        _updateIngredientListCB={this._updateIngredientList}
        _updateDirectionListCB={this._updateDirectionList}
      />
    </div>
  }
})
