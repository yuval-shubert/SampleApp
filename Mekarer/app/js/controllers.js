'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
    .controller('AddRecipe',['$scope',function($scope) {
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
              this.recipe.componentsAdded.push({
                  component: this.recipe.component,
                  amount: this.recipe.amount
              });
        };

        $scope.printConsole = function(){
            console.log(this.recipe.componentsAdded);
        };

    }])

  .controller('MyCtrl2', [function() {

  }])
  .controller('MyCtrl3', [function() {

  }])
  .controller('MyCtrl4', [function() {

  }])

  .controller('DropdownCtrl',[function DropdownCtrl($scope) {
  $scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    console.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
}]);