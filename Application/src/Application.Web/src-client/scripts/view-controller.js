import React from 'react';
import {LoginForm} from './components/login-form-component.js';
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
        componentToRender = <LoginForm/>
      break;
      case "NEWRECIPE":
        componentToRender = <NewRecipeView/>
      break;
      default:
    }

    return (
    <div>
      {componentToRender}
    </div>
    )
  }

})
