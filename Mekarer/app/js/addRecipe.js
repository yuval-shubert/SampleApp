var components = [];


function AddRecipe(){
    $scope.recipe = {
        name : 'asd',
        owner : '',
        component :'',
        amount : ''
    };

}

function addOneRecipe(){
    components.push('s');

}

function printConsole(){
    console.log($scope.components);
};