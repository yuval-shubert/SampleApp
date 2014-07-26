'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ui.bootstrap',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Search_Recipe', {templateUrl: 'partials/Search_Recipe.html', controller: 'SearchRecipeCtrl'});
  $routeProvider.when('/Favorite_Recipe', {templateUrl: 'partials/Favorite_Recipe.html', controller: 'MyCtrl2'});
  $routeProvider.when('/Add_Recipe', {templateUrl: 'partials/Add_Recipe.html', controller: 'AddRecipe'});
  $routeProvider.when('/My_Recipe', {templateUrl: 'partials/Add_Recipe_Part3.html', controller: 'AddRecipe'});
  $routeProvider.when('/Add_Recipe', {templateUrl: 'partials/Add_Recipe.html', controller: 'AddRecipe'});
  $routeProvider.when('/Add_Recipe_Part2', {templateUrl: 'partials/Add_Recipe_Part2.html', controller: 'AddRecipe'});
  $routeProvider.when('/Add_Recipe_Part3', {templateUrl: 'partials/Add_Recipe_Part3.html', controller: 'AddRecipe'});
  $routeProvider.when('/Search_Result', {templateUrl: 'partials/Recipe_Search_Result.html', controller: 'RecipeSearchResultCtrl'});
  $routeProvider.otherwise({redirectTo: '/Search_Recipe.html'});
}])
    .service('sharedProperties', function () {
        var RecipeSearchResult = '';

        return {
            getProperty: function () {
                return RecipeSearchResult;
            },
            setProperty: function (value) {
                RecipeSearchResult = value;
            }
        }
    }
        .service('addRecipeProperty',function(){
            var recipe = {
                name : '',
                owner : '',
                component :'',
                amount : '',
                componentsAdded : [],
                description: 'insert here your description',
                pictures: []
            }

            return {
                getRecipe: function () {
                    return this.recipe;
                },
                setRecipe: function (value) {
                    this.recipe = value;
                }
            }

        })
);


