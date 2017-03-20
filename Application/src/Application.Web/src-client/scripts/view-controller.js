import React from 'react';
import {Navbar} from './components/navbar-component.js'
import {LoginFormView} from './views/register-view.js';
import {MyCookbookView} from './views/cookbook-view.js';
import {NewRecipeView} from './views/add-new-recipe-view.js';
import {UserButton} from './components/sign-in-button-component.js';
import {STORE} from './store.js';
import {ACTIONS} from './actions.js';

export const ViewController = React.createClass({
  getInitialState: function(){
    ACTIONS.navChange(this.props.fromRoute, window.location.hash)
    let storeObject = STORE.getStoreData()
    return storeObject
  },


  render: function(){
    let componentToRender
    console.log(this.state.currentNavRoute)

    switch(this.state.currentNavRoute){
      case "ACCOUNT":
        componentToRender = <LoginFormView/>
      break;
      case "COOKBOOK":
        componentToRender = <MyCookbookView/>
      break;
      case "NEWRECIPE":
        componentToRender = <NewRecipeView/>
      break;
      case "SINGLERECIPE":
        conponentToRender = <SingleRecipeView/>
      default:
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
