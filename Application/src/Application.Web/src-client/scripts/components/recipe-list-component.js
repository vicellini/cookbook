import React from 'react'

export const RecipeListComponent = React.createClass({

  _makeRecipeComponents: function(recipeList){
    let arrayofRecipeComponents = recipeList.map(function(recipeObj, i){
      return (
          <RecipeItem recipeData={recipeObj} key={i}/>
      )
    })

    return arrayofRecipeComponents
  },

  _filterRecipeByCategory: function(recipeList, mealType){
    let filteredList = recipeList.filter(function(recipeObj){

      if(mealType === recipeObj.rating || mealType === "ALL"){
        return true
      } else {
        return false
      }
    })
    return filteredList
  },

  render: function(){
    let self = this
    let allTheRecipes = this.props.recipeList
    let filteredRecipes = this._filterRecipeByCategory( allTheRecipes, this.props.shownMealType)

    return (
      <div className="cookBook-recipes">
        <h2>Recipes</h2>
        {this._makeRecipeComponents(filteredRecipes)}
      </div>
    )
  })
