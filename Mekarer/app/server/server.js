var ip_addr = '0.0.0.0';
var port    =  '8080';
var restify = require('restify');
var recipeCollection = require('./recipeCollection');

var server = restify.createServer({
    name : "myapp"
});

server.listen(port ,ip_addr, function(){
    console.log('%s listening at %s', server.name , server.url);
});

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

var PATH = '/recipe';
var PATH_SEARCH = '/search_recipe';

server.get({path : PATH , version : '0.0.1'} , getRecipe);
server.post({path : PATH , version: '0.0.1'} ,postNewRecipe);
server.post({path : PATH_SEARCH , version: '0.0.1'} ,searchRecipe);

 function recipeCompare(a,b) {
    if (a.rank.componentCovered > b.rank.componentCovered)
        return 1;

    if (a.rank.componentCovered < b.rank.componentCovered)
        return -1;

    if (a.rank.componentInUse > b.rank.componentInUse)
        return 1;

    if (a.rank.componentInUse < b.rank.componentInUse)
        return -1;

    return 0;
}

function searchRecipe(req, res, next){
    console.log('get search for recipe request.');
    console.log( req.params.ingredients);
    var ingredients = req.params.ingredients;

    recipeCollection.findRecipe(req,res,function(result,response){
        console.log('result - ' + JSON.stringify(result));
        addRanksToRecipes(result,ingredients);
      // result.sort(recipeCompare);
        console.log('result  after add ranks- ' + JSON.stringify(result));
        response.send(result);

    });

}

function addRanksToRecipes(recipes,ingredients){
    console.log('addRanksToRecipes');
    var matching_counter = 0;
    for (var i =0; i< recipes.length; i++){
        var components = recipes[i].components;
        for (var j =0; j < components.length; j++) {
            var component = components[j];
            if (ingredients.indexOf(component.component) >= 0) {
                matching_counter += 1;
                console.log('addRanksToRecipes' + matching_counter);
            }
        }
        recipes[i].rank.componentCovered =  matching_counter / recipes[i].components.length ;
        recipes[i].rank.componentInUse =  matching_counter;

    }
}



function getRecipe(req, res , next){
    var recipe = {
        name : '',
        owner : '',
        component :'',
        amount : '',
        componentsAdded : [],
        description: 'insert here your description',
        pictures: []
    };

    console.log('get GET event');
    recipe = req.recipe;
    console.log(recipe.name);
    /*res.setHeader('Access-Control-Allow-Origin','*');
     if(success){
     res.send(200 , success);
     return next();
     }
     else
     return next(err);*/

}

function postNewRecipe(req, res , next){
    var recipe = {
        name : '',
        owner : '',
        component :'',
        amount : '',
        componentsAdded : [],
        description: 'insert here your description',
        pictures: []
    };

    console.log('get post event');
    console.log(req.params);
    recipe = req.params.recipe;
    console.log(recipe.name);
    res.setHeader('Access-Control-Allow-Origin','*');
    res.send(200);
    console.log('flag a');
    recipeCollection.addrecipe(recipe);
    console.log('flag b');


    recipeCollection.findAll();


}






