import React from 'react';
import {ACTIONS} from '../actions.js';
import {STORE} from '../store.js';

export const FilterMealComponent = React.createClass({

   _handleFilterClick: function(evt){
    let categoryClicked = evt.target.dataset.category
    ACTIONS.changeShownMeal(categoryClicked)
	},

   _getBtnClassName: function(viewType, currentView){
      if(viewType === currentView){
         return 'btn-filter btn-selected btn-sm u_column'
      } else {
         return 'btn-filter btn-normal btn-sm u_column'
      }
   },


   render: function(){
      let currentMealType = this.props.shownMealType
      return (
         <div className="filter-recipe u_column-container">
        <button
					className={this._getBtnClassName('ALL', currentMealType)}
					onClick={this._handleFilterClick}
					data-category="ALL">
					All
				</button>
            <button
					className={this._getBtnClassName('Breakfast', currentMealType)}
					onClick={this._handleFilterClick}
					data-category="Breakfast">
						Breakfast
				</button>
            <button
					className={this._getBtnClassName('Lunch', currentMealType)}
					onClick={this._handleFilterClick}
					data-category="Lunch">
						Lunch
				</button>
            <button
					className={this._getBtnClassName('Dinner', currentMealType)}
					onClick={this._handleFilterClick}
					data-category="Dinner">
            Dinner
				</button>
            <button
          className={ this._getBtnClassName('Dessert', currentMealType)}
          onClick={this._handleFilterClick}
          data-category="Dessert">
            Dessert
          </button>
         </div>
      )
   }
})
