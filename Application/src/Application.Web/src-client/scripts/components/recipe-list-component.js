import React from 'react';
import {FilterMealComponent} from './filter-meal-component.js';
import {RecipeSearchComponent} from './search-bar-component.js';
import {ACTIONS} from '../actions.js';

export const RecipeListComponent = React.createClass({


  _makeRecipeComponents: function(recipeList){
    let recipeComponentsJSX = recipeList.map(function(recipeObj, i){
      return (
          <RecipeItem recipeObj={recipeObj} key={i}/>
      )
    })
    return recipeComponentsJSX
  },

  _filterRecipeByCategory: function(recipeArr, category){
     let filteredList = recipeArr.filter(function(recipeObj){
        if(category === recipeObj.category || category === "ALL" ){
           return true
        } else {
           return false
        }
     })
     return filteredList
  },

  _matchSearchTerm: function(ingredArr, searchTerm){
    for(var i = 0; i < ingredArr.length; i++){
      let ingredient = ingredArr[i].name
      if(ingredient.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
        return true
      }
    }
  },


  _filterSearchRecipe: function(recipeArr, searchTerm){
    console.log(recipeArr, 'all')
    let component = this
    let filteredList = recipeArr.filter(function(recipeObj){
        if(component._matchSearchTerm(recipeObj.ingredients, searchTerm) === true){
          return true
        }
      })
      console.log(filteredList, 'filter')
    return filteredList
  },


  render: function(){
    let allRecipes = this.props.recipeList
    let searchTerms = this._filterSearchRecipe(allRecipes, this.props.search)
    let theFilteredRecipes = this._filterRecipeByCategory(searchTerms, this.props.shownMealType)

    return (
      <div className="cookBook-recipes">
        <h2>My CookBook</h2>
        <FilterMealComponent {...this.props}/>
        <RecipeSearchComponent {...this.props}/>
        <div className="row all-recipes">
          {this._makeRecipeComponents(theFilteredRecipes)}
        </div>
      </div>
    )
  }
})

export const RecipeItem = React.createClass({

  _handleSingleRecipe: function(evt){
    let recipeIdEl = evt.currentTarget.dataset.recipe_id
    let hashRoute = 'recipe/' + recipeIdEl
    ACTIONS.routeTo(hashRoute)
  },

  render: function(){

    const { name, category, media1, id } = this.props.recipeObj
    return (
        <div className="col-sm-6 single-thumbnail" data-recipe_id={id} onClick={this._handleSingleRecipe}>
          <div className="thumbnail">
            <img src={media1}/>
          </div>
          <div className="cookbook_details">
            <h3>{name}</h3>
            <p>{category}</p>
          </div>
        </div>
    )
  }
})
