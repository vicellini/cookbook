import React from 'react';
import {ACTIONS} from '../actions.js';

export const SingleRecipeComponent = React.createClass({

  _handleDeleteAlert(evt){
    let formEl = evt.target
    let recipeId = parseInt(formEl.dataset.id)
    let result = confirm("Are you sure you want to delete this recipe?")
      if(result === true){
        ACTIONS.deleteCurrentRecipe(recipeId)
      }else{
        alert("close call")
      }
  },

  _createIngredientJSX: function(ingredientArr){
      let finalJSX = ingredientArr.map(function(singleIngredObj, i){
          return (
            <SingleIngredient key={i}
              data={singleIngredObj}
            />
          )
          })
        return finalJSX
  },

  _createDirectionJSX: function(directionArr){
    let finalJSX = directionArr.map(function(singeDirectionObj, i){
      return (
        <SingleDirection key={i}
          data={singeDirectionObj}
        />
      )
      })
      return finalJSX
  },


  render: function(){
    let recipeObj = this.props.singleRecipe
    let ingredientsJsx
    let directionJsx
    if( recipeObj.ingredients ) ingredientsJsx = this._createIngredientJSX(recipeObj.ingredients)
    if( recipeObj.steps ) directionJsx = this._createDirectionJSX(recipeObj.steps)

    return(
      <div className="single-recipe">
        <h1>{recipeObj.name}</h1>
        <div className="recipe-card-top u_column-container">
          <img className="u_column" src={recipeObj.media1}/>
          <ul className="single-recipe_ingredients u_column">
            { ingredientsJsx }
          </ul>
        </div>
        <div className="recipe-card-bottom">
          <ol className="single-recipe_directions">
            {directionJsx}
          </ol>
        </div>
        <button className="recipe-delete" data-id={recipeObj.id} onClick={this._handleDeleteAlert}>Delete This Recipe</button>
      </div>
    )
  }
})

const SingleIngredient = React.createClass({
  render: function(){
    return(
      <li className="ingredient-sum u_column-container">
        <p className="ingredient-list-quantity u_column">{this.props.data.quantity}</p>
        <p className="ingredient-list-name u_column">{this.props.data.name}</p>
      </li>
    )
  }
})

const SingleDirection = React.createClass({
  getInitialState: function(){
    return{
      isChecked: false
    }
  },

  _handleComplete: function(evt){
    if(this.state.isChecked !== true){
      this.setState ({
        isChecked: true
      })
    }else{
      this.setState ({
        isChecked: false
      })
    }
  },

  render: function(){
    let completeStatus = 'single-recipe_direction'
    if(this.state.isChecked !== false){
      completeStatus = 'single-recipe_direction complete'
    }
    return (
      <li className={completeStatus}>
        <input type="checkbox" onClick={this._handleComplete}/><span className="direction-text">{this.props.data.description}</span>
      </li>
    )
  }
})
