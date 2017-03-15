export const STORE = {
 _data: {
    recipeList: [],
    currentNavRoute: ''
 },

 getStoreData: function(){
  return this._data
 },

 setStore: function(storeProp, payload){
   if (typeof this._data[storeProp] === 'undefined' ) {
     throw new Error('cannot pass undefined property to .setStore() ')
   }
   this._data[storeProp] = payload

   if(typeof this._callBack === 'function'){
     this._callBack()
   }
 },




}
