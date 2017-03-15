import React from 'react';
import {ACTIONS} from '../actions.js';


export const PreviewLists = React.createClass({

  _createIngredientJSX: function(ingredientArr){
    let component = this
    let finalJSX = ingredientArr.map(function(ingredientObj, i){
      return (
          <SingleIngredient key={i}
            data = {ingredientObj}
            _updateIngredientList = {component.props._updateIngredientListCB}
          />
        )
        })
      return finalJSX
    },

    _createDirectionJSX: function(directionArr){
      let component = this
      let finalJSX = directionArr.map(function(directionStr, i){
        return (
            <SingleDirection key={i}
              data = {directionStr}
              _updateDirectionList = {component.props._updateDirectionListCB}
            />
          )
          })
        return finalJSX
      },


  render: function(){
    return(
      <div className="preview-container">
        {this._createIngredientJSX(this.props.ingredientList)}
        {this._createDirectionJSX(this.props.directionList)}
      </div>
    )
  }


})



const SingleIngredient = React.createClass({

  _handleDelete: function(){
    let singleObj = this.props.data
    this.props._updateIngredientList(singleObj)
    },


    render: function(){
    return (
      <div class="single-ingredient">
         <div className="single_qty">
           <span></span>
         </div>
         <div className="single_name">
           <span></span>
         </div>
         <div className="btn-delete">
           <i onClick={this._handleDelete} className="fa fa-trash-o" aria-hidden="true"></i>
         </div>
     </div>
   )
  }
})

const SingleDirection = React.createClass({

    _handleDelete: function(){
      let singleDirection = this.props.data
      this.props._updateDirectionList(singleDirection)
      },


      render: function(){
      return (
        <div class="single-direction">
         <span>{this.props.key}. {this.props.data}</span>
         <div className="btn-delete">
           <i onClick={this._handleDelete} className="fa fa-trash-o" aria-hidden="true"></i>
         </div>
       </div>
     )
    }
})
