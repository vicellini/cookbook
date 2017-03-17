import React from 'react'
import {SingleRoute} from './single-nav-component.js'
import {ACTIONS} from '../actions.js'

export const Navbar = React.createClass({

 _createNavJSX: function(currentNavRoute){
    let routeList = [
      {appRoute : 'COOKBOOK', displayText : 'My CookBook', hashRoute: 'cookbook' },
      {appRoute : 'NEWRECIPE', displayText : 'Add Your Own Recipe!', hashRoute: 'recipe/create' },
      {appRoute : 'IMPORT', displayText : 'Import Recipe', hashRoute: 'recipe/import'}
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
      <nav className="navbar u_column">
        <img className="logo" src="../../images/cookbook-logo.png"/>
        {this._createNavJSX(this.props.currentNavRoute)}
      </nav>
    )
  }

})
