import React from 'react';
import {STORE} from '../store.js'
export const RecipeSearchComponent = React.createClass({

  _handleSearch: function(evt){
    evt.preventDefault()
    let searchValue = evt.target.search.value
    console.log(searchValue)
    STORE.setStore('search', searchValue)
  },

  render: function(){

      return (
        <form className="recipe-search" onSubmit={this._handleSearch}>
          <input className="search_input" type="text" name="search" placeholder="Search Recipes"/>
          <button className="btn-search" type="submit">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </form>
      )
  }
})
