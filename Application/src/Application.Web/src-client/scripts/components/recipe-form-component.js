import React from 'react';
import Backbone from 'backbone';
import {RecipeModel} from '../models/model-recipe.js'
import {PreviewLists} from './form-preview-component.js'

export const RecipeForm = React.createClass({
  getInitialState: function(){
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
    console.log(evt)
    let formEl = evt.target
    let newIngredient = {
      qty: formEl.ingredientQty.value,
      critical: formEl.ingredientName.value
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
      direction: this.name.singleDirection.value
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
    console.log(this.state)
    return (
    <div className="new-recipe_input">
      <form className="new-recipe_form" onSubmit={this._handleFormSubmit}>
        <div className="form-group__field field_recipe-name">
          <label>Recipe Name</label>
          <br/>
          <input type="text" name="recipeName" placeholder="Enter Name"/>
          <p className="flash-msg"></p>
        </div>
          <br/>
        <div className="ingredient_inputs">
          <label>Add Ingredient</label>
          <br/>
          <span>Qty.</span><input type="text" name="ingredientQty" className="qty-input"/>
          <input type="text" name="ingredientName"/><button onClick={this._handleNewIngridient}>&#43;</button>
          <p className="flash-msg"></p>
        </div>
          <br/>
        <select name="category">
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
        </select>
          <br/>
        <div className="direction_input">
          <label>Add Direction</label>
          <br/>
          <input type="text" name="singleDirection"/><button onClick={this._handleNewDirection}>&#43;</button>
          <p className="flash-msg"></p>
        </div>
          <br/>
        <div className="form-group__field field_recipe-image">
          <label>Add An Image</label>
          <br/>
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
