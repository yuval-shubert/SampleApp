'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1') .service('searchResultService',function(){
        var results = 'a';

        return {
            getServiceResults: function(){
                return results;
            },
            setServiceResults: function(value){
                results = value;
            }
        }
    }).service('recipeService',function(){
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

    });
