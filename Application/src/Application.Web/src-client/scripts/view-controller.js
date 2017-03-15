import React from 'react';
import {NewRecipeView} from './views/add-new-recipe-view.js'
import {STORE} from './store.js';
import {ACTIONS} from './actions.js';

export const ViewController = React.createClass({
  getInitalState: function(){
    ACTIONS.changeNav(this.props.fromRoute, window.location.hash)
    let storeObject = STORE.getStoreData()
    return storeObject
  },

  render: function(){
    let componentToRender

    switch(this.state.currentNavRoute){
      case "NEWRECIPE":
        componentToRender = <NewRecipeView/>
      break;
      case "ACCOUNT":
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
