import React from 'react';
import {Navbar} from './components/navbar-component.js'
import {LoginFormView} from './views/register-view.js';
import {NewRecipeView} from './views/add-new-recipe-view.js';
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

    switch(this.state.currentNavRoute){
      case "ACCOUNT":
        componentToRender = <LoginFormView/>
      break;
      case "NEWRECIPE":
        componentToRender = <NewRecipeView/>
      break;
      default:
    }

    return (
    <div className="app-components u_column-container">
      <Navbar/>
      <div className="u_column page-content">
        {componentToRender}
      </div>
    </div>
    )
  }

})
