'use strict';

var server_ip = 'http://10.0.0.4';
/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
    .controller('AddRecipe',['$scope','$http','addRecipeProperty',function($scope,$http,addRecipeProperty) {
        $scope.recipe = {
            name : '',
            owner : '',
            component :'',
            amount : '',
            componentsAdded : [],
            description: 'insert here your description',
            pictures: []
        };


        $scope.uploadFile = function(files) {
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", files[0]);

            /*$http.post(uploadUrl, fd, {
                withCredentials: true,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            }).success('success' ).error('error!');
            */
        };

        $scope.deleteComponent = function(index) {
            $scope.recipe.componentsAdded.splice(index,1);
        };

        $scope.addOneRecipe = function(){

            if (this.recipe.component == '' || this.recipe.amount == ''){
                return;
            }

              this.recipe.componentsAdded.push({
                  component: this.recipe.component,
                  amount: this.recipe.amount
              });
            this.recipe.component = '';
            this.recipe.amount = '';
        };

        $scope.sendRecipe = function(){
            alert('sd');
            $http.post(server_ip+':8080', {}).success(alert('success'));
        };
        $scope.loadRecipe = function(){
            this.recipe = addRecipeProperty.getRecipe();
        }

        $scope.nextPage = function(){
            addRecipeProperty.setRecipe(this.recipe);
        }

        $scope.printConsole = function(){
            console.log(this.recipe.componentsAdded);
        };

      $scope.mytime = new Date();

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };

        $scope.ismeridian = false;

        $scope.update = function() {
            var d = new Date();
            d.setHours( 14 );
            d.setMinutes( 0 );
            $scope.mytime = d;
        };

        $scope.changed = function () {
            console.log('Time changed to: ' + $scope.mytime);
        };

        $scope.clear = function() {
            $scope.mytime = null;
        };

        $scope.postRecipe = function(){
            $http.post(server_ip + ':8080/recipe', {
                recipe : this.recipe
            }).success(function(data, status, headers, config) {
                alert("Success");
            }).error(function(){alert("yuval sucks")});
        }
    }])

  .controller('MyCtrl2', [function() {

  }])
  .controller('MyCtrl3', [function() {

  }])
  .controller('SearchRecipeCtrl', ['$scope','$http','$location','sharedProperties',function($scope,$http,$location, sharedProperties ) {
        $scope.query = {
            component : 'ab',
            componentsAdded : []
        };


        $scope.addOneRecipe = function(){
            if (this.query.component == ''){
                return;
            }

            this.query.componentsAdded.push({
                component: this.query.component
            });
            this.query.component = '';
        };
        $scope.deleteComponent = function(index) {
            $scope.query.componentsAdded.splice(index,1);
        };

        $scope.searchForRecipes = function(){
            console.log('Components send'+ JSON.stringify(this.query.componentsAdded))
            $http.post(server_ip + ':8080/search_recipe', {
                ingredients : this.query.componentsAdded
            }).success(function (data, status, headers, config) {
                $scope.result = JSON.stringify(data);
                sharedProperties.setProperty("5");
                console.log(data);
                $location.path("/Search_Result");

            }).error(function () {
                alert("yuval sucks");
            })
        };

            }])
    .controller('RecipeSearchResultCtrl', ['$scope','$http','sharedProperties',function($scope,$http,$location, sharedProperties ) {
        $scope.test1= sharedProperties.getProperty();
           console.log(sharedProperties.getProperty());
           console.log("hey");


    }]);
