'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
    .controller('AddRecipe',['$scope','$http',function($scope,$http) {
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
            $http.post('http://10.0.0.8:8080', {}).success(alert('success'));
        };

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

<<<<<<< HEAD
        $scope.postRecipe = function(){
            $http.post('http://10.0.0.8:8080/recipe', {
                recipe : this.recipe
            }).success(function(data, status, headers, config) {
                alert("Success");
            }).error(function(){alert("yuval sucks")});
        }
=======
>>>>>>> 9e096b637a2d695a32a2076979b06b20515a55af
    }])

  .controller('MyCtrl2', [function() {

  }])
  .controller('MyCtrl3', [function() {

  }]);
