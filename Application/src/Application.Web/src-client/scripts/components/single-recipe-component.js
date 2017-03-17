import React from 'react';

export const SingleRecipeComponent = React.createClass({

  _createIngredientJSX: function(ingredientArr){
      let finalJSX = ingredientArr.map(function(singleIngredObj, i){
          return (
            <SingleIngredient key={i}
              data={singleIngredObj}
            />
          )
          return finalJSX
      })
  },

  _createDirectionJSX: function(directionArr){
    let finalJSX = directionArr.map(function(singeDirection, i){
      return (
        <SingleDirection key={i}
          data={SingleDirection}/>
      )
      return finalJSX
    })
  },


  render: function(){
    return(
      <div className="single-recipe">
        <div className="recipe-card top">
          <img/>
          <ul className="single-recipe_ingredients">
            {}
          </ul>
        </div>
        <div className="recipe-card bottom">
          <ol className="single-recipe_directions">
            {}
          </ol>
        </div>

      </div>
    )
  }
})

const SingleIngredient = React.createClass({
  render: function(){
    return(
      <li><span>{this.props.data.qty}</span><span>{this.props.data.name}</span></li>
    )
  }
})

const SingleDirection = React.createClass({
  getInitialState: function(){
    return{
      isChecked = false
    }
  },

  _handleComplete: function(evt){
    console.log(evt.target)
  },

  render: function(){
    let completeStatus = 'single-recipe_direction'
    if{this.state.isChecked !== false}{
      completeStatus = 'single-recipe_direction complete'
    }
    <li><input type="checkbox" onClick={this._handleComplete}/><span className={completeStatus}>{this.props.data.steps}</span></li>
  }
})
