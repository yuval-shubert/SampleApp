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
            componentsAdded : []
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