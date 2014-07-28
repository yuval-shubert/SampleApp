'use strict';

var server_ip = 'http://127.0.0.1';
/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
    .controller('AddRecipe',['$scope','$http','recipeService',function($scope,$http,recipeService) {
        $scope.recipe = recipeService.getRecipe();


        $scope.component ='';
        $scope.amount  = '';


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
            $scope.recipe.components.splice(index,1);
        };

        $scope.$watch('recipe', function(recipe){
            console.log('recipe was changed');
            recipeService.setRecipe(recipe);
            console.log(JSON.stringify(recipeService.getRecipe()))
        }, true);

        $scope.addOneRecipe = function(){

            if (this.component == '' || this.amount == ''){
                return;
            }

              this.recipe.components.push({
                  component: this.component,
                  amount: this.amount
              });

            this.component = '';
            this.amount = '';
        };

        $scope.sendRecipe = function(){
            $http.post(server_ip+':8080', {}).success(alert('success'));
        };



        $scope.loadRecipe = function(){
            this.recipe = recipeService.getRecipe();
            console.log('load recipe ' + JSON.stringify(this.recipe));
        };

        $scope.initRecipe = function(){
           recipeService.setRecipe( {
               name : '',
               owner : '',
               components : [],
               description: 'insert here your description',
               pictures: [],
               rank: {}
           }) ;
        };

        $scope.nextPage = function(){
            recipeService.setRecipe(this.recipe);
        };

        $scope.printConsole = function(){
            console.log(JSON.stringify(this.recipe));
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
                recipeService.setRecipe( {
                    name : '',
                    owner : '',
                    components : [],
                    description: 'insert here your description',
                    pictures: [],
                    rank :{}
                }) ;
            }).error(function(){alert("yuval sucks")});
        }
    }])

  .controller('MyCtrl2', [function() {

  }])
  .controller('MyCtrl3', [function() {

  }])

    .controller('FacebookLoginCtrl', ['$scope','$http',function($scope,$http,$location) {
        $scope.startUp = function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=615056888586794&version=v2.0";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk')

        // This is called with the results from from FB.getLoginStatus().
        function statusChangeCallback(response) {
            console.log('statusChangeCallback');
            console.log(response);
            // The response object is returned with a status field that lets the
            // app know the current login status of the person.
            // Full docs on the response object can be found in the documentation
            // for FB.getLoginStatus().
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
                testAPI();
            } else if (response.status === 'not_authorized') {
                // The person is logged into Facebook, but not your app.
                document.getElementById('status').innerHTML = 'Please log ' +
                    'into this app.';
            } else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
                document.getElementById('status').innerHTML = 'Please log ' +
                    'into Facebook.';
            }
        }

        // This function is called when someone finishes with the Login
        // Button.  See the onlogin handler attached to it in the sample
        // code below.
        $scope.checkLoginState = function checkLoginState() {
            FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
            });
        }
    }])
  .controller('SearchRecipeCtrl', ['$scope','$http','$location','sharedProperties',function($scope,$http,$location, sharedProperties ) {
        $scope.query = {
            components : []
        };

        $scope.component = '';


        $scope.addOneRecipe = function(){
            if (this.component == ''){
                return;
            }

            this.query.components.push(
                this.component
            );
            this.component = '';
        };
        $scope.deleteComponent = function(index) {
            $scope.query.components.splice(index,1);
        };

        $scope.searchForRecipes = function(){
            console.log('Components send'+ JSON.stringify(this.query.components))
            $http.post(server_ip + ':8080/search_recipe', {
                ingredients : this.query.components
            }).success(function (data, status, headers, config) {
                $scope.result = JSON.stringify(data);
                sharedProperties.setProperty("5");
                console.log('retrieved from DB'+JSON.stringify(data));
                $location.path("/Search_Result");
            }).error(function () {
                alert("yuval sucks");
            })
        };

            }])
    .controller('RecipeSearchResultCtrl', ['$scope','$http','sharedProperties',function($scope,$http,$location, sharedProperties ) {
          /* $scope.test1 = sharedProperties.getProperty();
           console.log(sharedProperties.getProperty());*/
           console.log("hey");


    }]);
