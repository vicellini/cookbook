import React from 'react'
import {ACTIONS} from '../actions.js'

export const FilterMealComponent = React.createClass({
    getInitialState: function(){
      return {}
  },
   _handleFilterClick: function(evt){
   	let selectedMealType = evt.target.dataset.mealType

		ACTIONS.changeShownMeal(selectedMealType)
	},

   _getBtnClassName: function(viewType, currentView){
      if(viewType === currentView){
         return 'btn btn-danger btn-sm'
      } else {
         return 'btn btn-info btn-sm'

      }
   },


   render: function(){
      let currentMealType = this.props.shownMealType

      return (
         <div className="filter-recipe">
            <button
					className={ this._getBtnClassName('ALL', currentMealType) }
					onClick={this._handleNavClick}
					data-rated="ALL">
					All
				</button>
            <button
					className={ this._getBtnClassName('Breakfast', currentMealType) }
					onClick={this._handleNavClick}
					data-rated="Breakfast">
						Breakfast
				</button>
            <button
					className={ this._getBtnClassName('Lunch', currentMealType) }
					onClick={this._handleNavClick}
					data-rated="Lunch">
						Lunch
				</button>
            <button
					className={ this._getBtnClassName('Dinner', currentMealType) }
					onClick={this._handleNavClick}
					data-rated="Dinner">
            Dinner
				</button>
            <button
          className={ this._getBtnClassName('Dessert', currentMealType) }
          onClick={this._handleNavClick}
          data-rated="Dessert">
            Dessert
         </div>
      )
   }
})
