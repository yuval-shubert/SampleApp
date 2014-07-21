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

var PATH = '/recipe'
server.get({path : PATH , version : '0.0.1'} , getRecipe);
server.post({path : PATH , version: '0.0.1'} ,postNewRecipe);

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
    res.send(200);
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






