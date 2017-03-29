import React from 'react';
import {Navbar} from './components/navbar-component.js'
import {LoginFormView} from './views/register-view.js';
import {CookbookView} from './views/cookbook-view.js';
import {SingleRecipeView} from './views/single-recipe-view.js';
import {BookmarkView} from './views/bookmark-view.js';
import {NewRecipeView} from './views/add-new-recipe-view.js';
import {SuccessView} from './views/thank-you-view.js';
import {UserButton} from './components/sign-out-button-component.js';
import {STORE} from './store.js';
import {ACTIONS} from './actions.js';


var selectBody = document.querySelector('body')
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
        selectBody.className = 'body_home'
        componentToRender = <LoginFormView/>
      break;
      case "COOKBOOK":
        selectBody.className = 'body_home'
        componentToRender = <CookbookView {...this.state}/>
      break;
      case "NEWRECIPE":
        selectBody.className = 'body_recipe'
        componentToRender = <NewRecipeView/>
      break;
      case "THANKS":
        selectBody.className = 'body_recipe'
        componentToRender = <SuccessView/>
      break;
      case "SINGLERECIPE":
        selectBody.className = 'body_recipe'
        componentToRender = <SingleRecipeView
                             {...this.state}
                             />
      break;
      case "BOOKMARKS":
        selectBody.className = 'body_bookmark'
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
