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
  $routeProvider.when('/Facebook_Login', {templateUrl: 'partials/Facebook_Login.html', controller: 'FacebookLoginCtrl'});
  $routeProvider.when('/Search_Recipe', {templateUrl: 'partials/Search_Recipe.html', controller: 'SearchRecipeCtrl'});
  $routeProvider.when('/Favorite_Recipe', {templateUrl: 'partials/Favorite_Recipe.html', controller: 'MyCtrl2'});
  $routeProvider.when('/Add_Recipe', {templateUrl: 'partials/Add_Recipe.html', controller: 'AddRecipe'});
  $routeProvider.when('/My_Recipe', {templateUrl: 'partials/Add_Recipe_Part3.html', controller: 'AddRecipe'});
  $routeProvider.when('/Add_Recipe', {templateUrl: 'partials/Add_Recipe.html', controller: 'AddRecipe'});
  $routeProvider.when('/Add_Recipe_Part2', {templateUrl: 'partials/Add_Recipe_Part2.html', controller: 'AddRecipe'});
  $routeProvider.when('/Add_Recipe_Part3', {templateUrl: 'partials/Add_Recipe_Part3.html', controller: 'AddRecipe'});
  $routeProvider.when('/Results', {templateUrl: 'partials/Results.html', controller: 'searchResultCtr'});
  $routeProvider.otherwise({redirectTo: '/Search_Recipe.html'});
}])
        .service('recipeService',function(){
            var recipeProperty = {
                name : '',
                owner : '',
                components : [],
                description: 'insert here your description',
                pictures: [],
                rank :{}
            };

            return {
                getRecipe: function () {
                    return recipeProperty;
                },
                setRecipe: function (value) {
                    recipeProperty = value;
                }
            }

        })
    .service('searchResultService',function(){
            var results = [];

            return {
                getServiceResults: function(){
                    return results;
                },
                setServiceResults: function(value){
                    results = value;
                }
            }

    });



