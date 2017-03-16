import React from 'react';
import Backbone from 'backbone';
import {RecipeModel} from '../models/model-recipe.js'
import {PreviewLists} from './form-preview-component.js'

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

  _handleFormSubmit: function(evt){
    evt.preventDefault()
  },

  _handleNewIngridient: function(evt){
    evt.preventDefault()
    let newIngredient = {
      quantity: this.refs.ingredientQty.value,
      critical: this.refs.ingredientName.value
    }
    let copyOfItems = this.state.ingredientList.map(function(copy){return copy})
    copyOfItems.push(userTask)
     this.setState({
       ingredientList : copyOfItems
     })
  },

  _handleNewDirection: function(evt){
    evt.preventDefault()
    let newDirection = {
      direction: this.refs.singleDirection.value
    }
    let copyOfItems = this.state.directionList.map(function(copy){return copy})
    copyOfItems.push(newDirection)
     this.setState({
       directionList : copyOfItems
     })
  },

  _handleImgPreviewClick: function(evt){

  },

  render: function(){
    return (
    <div className="new-recipe_container">
      <form className="new-recipe_form" onSubmit={this._handleFormSubmit}>
        <div className="form-group__field field_recipe-name">
          <label>Recipe Name</label>
          <input type="text" name="recipeName" placeholder="Enter Name"/>
          <p className="flash-msg"></p>
        </div>
        <div className="ingredient_form" onSubmit={this._handleNewIngridient}>
          <label>Add Ingredient</label>
          <span>Qty.</span><input type="text" ref="ingredientQty"/>
          <input type="text" ref="ingredientName"/><button>&#43;</button>
          <p className="flash-msg"></p>
        </div>
        <select name="category">
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
        </select>
        <div className="direction_form" onSubmit={this._handleNewDirection}>
          <label>Add Direction</label>
          <input type="text" ref="singleDirection"/><button>&#43;</button>
          <p className="flash-msg"></p>
        </div>
        <div className="form-group__field field_recipe-image">
          <input type="text" name="imgInputEl" ref="previewImgEl"/>
          <button onClick={this._handleImgPreviewClick}>&#43;</button>
        </div>
      </form>
      <PreviewLists
        {...this.state}
        _updateIngredientListCB={this._updateIngredientList}
        _updateDirectionListCB={this._updateDirectionList}
      />
    </div>
    )
  }
})
