import React from 'react';
import {Navbar} from './components/navbar-component.js'
import {LoginFormView} from './views/register-view.js';
import {RecipeListComponent} from './components/recipe-list-component.js';
import {SingleRecipeView} from './views/single-recipe-view.js';
import {BookmarkView} from './views/bookmark-view.js';
import {NewRecipeView} from './views/add-new-recipe-view.js';
import {UserButton} from './components/sign-out-button-component.js';
import {STORE} from './store.js';
import {ACTIONS} from './actions.js';

export const ViewController = React.createClass({
  getInitialState: function(){
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
        componentToRender = <SingleRecipeView
                             {...this.state}
                             />
      break;
      case "BOOKMARKS":
        componentToRender = <BookmarkView {...this.state}/>
      break;
    }

    return (
    <div className="app-window">
      <div className="app-components u_column-container">
        <UserButton {...this.state}/>
        <Navbar navRoute={this.state.currentNavRoute}/>
        <div className="u_column page-content">
          {componentToRender}
        </div>
      </div>
    </div>
    )
  }

})
