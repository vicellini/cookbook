import React from 'react';
import {Navbar} from './components/navbar-component.js'
import {LoginFormView} from './views/register-view.js';
import {RecipeListComponent} from './components/recipe-list-component.js';
import {SingleRecipeView} from './views/single-recipe-view.js';
import {NewRecipeView} from './views/add-new-recipe-view.js';
import {UserButton} from './components/sign-out-button-component.js';
import {STORE} from './store.js';
import {ACTIONS} from './actions.js';

export const ViewController = React.createClass({
  getInitialState: function(){
    ACTIONS.navChange(this.props.fromRoute, window.location.hash)
    ACTIONS.fetchAllRecipies()
    let storeObject = STORE.getStoreData()
    return storeObject
  },

  componentDidMount: function(){
  let component = this;
   STORE.onStoreChange(function(){
    let newStoreObj = STORE.getStoreData()
    component.setState(newStoreObj)
    })
  },


  render: function(){
    let componentToRender
    switch(this.state.currentNavRoute){
      case "ACCOUNT":
        componentToRender = <LoginFormView/>
      break;
      case "COOKBOOK":
        componentToRender = <RecipeListComponent {...this.state}/>
      break;
      case "NEWRECIPE":
        componentToRender = <NewRecipeView/>
      break;
      case "SINGLERECIPE":
        componentToRender = <SingleRecipeView selectedRecipe={this.props.recipeId}/>
      break;
    }

    return (
    <div className="app-window">
      <div className="app-components u_column-container">
        <UserButton/>
        <Navbar navRoute={this.state.currentNavRoute}/>
        <div className="u_column page-content">
          {componentToRender}
        </div>
      </div>
    </div>
    )
  }

})
