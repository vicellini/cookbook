import React from 'react'
import {STORE} from '../store.js'

export const RecipeListComponent = React.createClass({
 getInitialState: function (){
   let storeObj = STORE.getStoreData()
   return storeObj
 },

  _makeRecipeComponents: function(recipeList){
    let arrayofRecipeComponents = recipeList.map(function(recipeObj, i){
      console.log(recipeObj)
      return (
          <RecipeItem recipeObj={recipeObj} key={i}/>
      )
    })
    // console.log(recipeList)
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
    let allTheRecipes = this.props.recipeList
    console.log(this.props.recipeList)
    // let filteredRecipes = this._filterRecipeByCategory( allTheRecipes, this.props.shownMealType)

    return (
      <div className="cookBook-recipes">
        <h2>Recipes</h2>
        {this._makeRecipeComponents(this.state.recipeList)}
      </div>
    )
  }
})
  export const RecipeItem = React.createClass({
    render: function(){
      // let renderIngredients = this.props.recipeObj.ingredients.map((obj, i)=>{
      //     return(
      //       <div key={i}>
      //         <h1>{obj.name}</h1>
      //         <p>{obj.quantity}</p>
      //       </div>
      //
      //     )
      // })
      const { name, category, media1 } = this.props.recipeObj
      return (
        <div className="recipeList">
        Recipe
        <p>{name}</p>
        Type
        <p>{category}</p>
        Image
        <img src={media1}></img>
        </div>
      )
    }
  })
