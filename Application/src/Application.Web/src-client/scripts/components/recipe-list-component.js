import React from 'react'

export const RecipeListComponent = React.createClass({
 getInitialState: function (){
   return {}
 },

  _makeRecipeComponents: function(recipeList){
    let arrayofRecipeComponents = recipeList.map(function(recipeObj, i){
      return (
          <RecipeItem recipeObj={recipeObj} key={i}/>
      )
    })

    return arrayofRecipeComponents

  },

  // _filterRecipeByCategory: function(recipeList, mealType){
  //   let filteredList = recipeList.filter(function(recipeObj){
  //
  //     if(mealType === recipeObj.category || mealType === "ALL"){
  //       return true
  //     } else {
  //       return false
  //     }
  //   })
  //   return filteredList
  // },

  render: function(){
    let self = this
    console.log(this.props)
    let allTheRecipes = this.props.recipeList
    // let filteredRecipes = this._filterRecipeByCategory( allTheRecipes, this.props.shownMealType)

    return (
      <div className="cookBook-recipes">
        <h2>Recipes</h2>
        {/* {this._makeRecipeComponents(filteredRecipes)} */}
      </div>
    )
  }
})
  export const RecipeItem = React.createClass({
    render: function(){
      return (
        <h1>test</h1>
      )
    }
  })
