

(function () {

    var application = angular.module('Application');

    var controller = application.controller('RecipeController', RecipeController);

    RecipeController.$inject = ['$http'];

    function RecipeController($http) {
        var vm = this;

        var count = 0;

        vm.Recipe = [];

        var promise = $http.get('/api/Recipe');

        promise.then(function (result) {
            vm.Recipe = result.data;
        }, function (result) {
            console.log(result)
        });

        vm.Add = function (Recipe) {
            var copy = angular.copy(Recipe);
            Recipe.name = '';

            var promise = $http.post('/api/Recipe', copy);
            promise.then(function (result) {
                vm.Recipe.push(result.data)
            });
        };

        vm.Remove = function (Recipe) {

            var url = '/api/Recipe/{id}'.replace('{id}', Recipe.id);

            var promise = $http.delete(url);
            promise.then(function (result) {


                var index = vm.Recipe.indexOf(Recipe);
                vm.Recipe.splice(index, 1);
            });
        };
    }
})();