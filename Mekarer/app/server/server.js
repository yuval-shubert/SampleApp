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

function searchRecipe(req, res, next){
    console.log('get search for recipe request.');
    console.log( req.params.ingredients);
    recipeCollection.findRecipe(req,res);
    console.log('send to client recipes');




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






