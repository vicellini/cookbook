import React from 'react'
import {SingleRoute} from './single-nav-component.js'
import {ACTIONS} from '../actions.js'

export const Navbar = React.createClass({

 _createNavJSX: function(currentNavRoute){
    let routeList = [
      {appRoute : 'COOKBOOK', displayText : 'My CookBook', hashRoute: 'cookbook', img: 'http://www.simpleimageresizer.com/_uploads/photos/0a5daa06/cookbook-icon_28x28.png'},
      {appRoute : 'NEWRECIPE', displayText : 'Add Recipe!', hashRoute: 'recipe/create', img: 'http://www.simpleimageresizer.com/_uploads/photos/0a5daa06/add-recipe_28x28.png' },
    ]

    let navComponents = routeList.map(function(eachObj, i){
      return <SingleRoute {...eachObj}
              key = {i}
              _currentRoute = {currentNavRoute}/>
    })
    return navComponents
  },

  render: function(){
    return(
      <nav id="sidebar" className="navbar u_column">
        <img className="logo" src="../../images/cookbook-logo.png"/>
        <div className="nav-buttons">
          {this._createNavJSX(this.props.navRoute)}
        </div>
      </nav>
    )
  }

})
