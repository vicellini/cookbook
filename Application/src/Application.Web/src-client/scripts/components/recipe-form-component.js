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

  _updateIngredientList: function(singleIngred){
    let copyOfItems = this.state.ingredientList.map(function(copy){return copy})
      let copyOfItemsMinus = copyOfItems.filter(function(ingredientObj){
            if(singleIngred.nameOfIngredient !== ingredientObj.nameOfIngredient || singleIngred.qty !== ingredientObj.qty){
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
    let formEl = evt.target
    let newReceipeObj = {
      name: formEl.recipeName.value,
      category: formEl.category.value,
      ingredients: this.state.ingredientList,
      steps: this.state.directionList
    }
    ACTIONS.saveNewRecipe(newReceipeObj)

  },

  _handleNewIngridient: function(evt){
    evt.preventDefault()
    let newQty = this.refs.ingredientQty
    let newName = this.refs.ingredientName
    let newIngredientObj = {
      qty: newQty.value,
      nameOfIngredient: newName.value
    }
    let copyOfItems = this.state.ingredientList.map(function(copy){return copy})
    copyOfItems.push(newIngredientObj)
     this.setState({
       ingredientList : copyOfItems
     })
     this.refs.ingredientQty.value = ''
     this.refs.ingredientName.value = ''
  },

  _handleNewDirection: function(evt){
    evt.preventDefault()
    let directionEl = this.refs.singleDirection
    let newDirection = {
      direction: directionEl.value
    }
    let copyOfItems = this.state.directionList.map(function(copy){return copy})
    copyOfItems.push(newDirection)
     this.setState({
       directionList : copyOfItems
     })
     this.refs.singleDirection.value = ''
  },

  _handleImgPreviewClick: function(evt){

  },

  render: function(){
    return (
    <div className="new-recipe_input">
      <form className="new-recipe_form" onSubmit={this._handleFormSubmit}>
        <div className="form-group__field field_recipe-name">
          <label>Recipe Name</label>
          <br/>
          <input type="text" name="recipeName" placeholder="Enter Name"/>
          <p className="flash-msg"></p>
        </div>
        <select name="category">
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
        </select>
          <br/>
          <br/>
        <div className="ingredient_inputs">
          <label>Add Ingredient</label>
          <br/>
          <span>Qty.</span><input type="text" ref="ingredientQty" className="qty-input"/>
          <input type="text" ref="ingredientName"/><button onClick={this._handleNewIngridient}>&#43;</button>
          <p className="flash-msg"></p>
        </div>
          <br/>
        <div className="direction_input">
          <label>Add Direction</label>
          <br/>
          <input type="text" ref="singleDirection"/><button onClick={this._handleNewDirection}>&#43;</button>
          <p className="flash-msg"></p>
        </div>
          <br/>
        <div className="form-group__field field_recipe-image">
          <label>Add An Image</label>
          <br/>
          <input type="text" name="imgInputEl" ref="previewImgEl"/>
          <button onClick={this._handleImgPreviewClick}>&#43;</button>
          <label>Image Preview</label>
          <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=No%20Image%20Listed&w=300&h=200"/>
        </div>
        <br/>
        <button className="btn_submit" type="submit">Add This Recipe!</button>
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
