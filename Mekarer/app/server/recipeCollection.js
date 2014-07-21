var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('Mekarer', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'Mekarer' database");
        db.collection('recipes', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'recipes' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.testRecipe = function(){
    console.log('hello');
}

exports.findRecipe = function(req, res) {

    db.collection('recipes', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
            console.log(items);
        });
    });
};

exports.findAll = function() {
    db.collection('recipes', function(err, collection) {
        collection.find().toArray(function(err, items) {
            console.log(items);
        });
    });
};

exports.addrecipe = function(recipe) {
    console.log('Adding recipe: ' + JSON.stringify(recipe));
    db.collection('recipes', function(err, collection) {
        collection.insert(recipe, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updaterecipe = function(req, res) {
    var id = req.params.id;
    var recipe = req.body;
    console.log('Updating recipe: ' + id);
    console.log(JSON.stringify(recipe));
    db.collection('recipes', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, recipe, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating recipe: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(recipe);
            }
        });
    });
}

exports.deleterecipe = function(req, res) {
    var id = req.params.id;
    console.log('Deleting recipe: ' + id);
    db.collection('recipes', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

   /* var recipes = [
        {
            name: "CHATEAU DE SAINT COSME",
            year: "2009",
            grapes: "Grenache / Syrah",
            country: "France",
            region: "Southern Rhone",
            description: "The aromas of fruit and spice...",
            picture: "saint_cosme.jpg"
        },
        {
            name: "LAN RIOJA CRIANZA",
            year: "2006",
            grapes: "Tempranillo",
            country: "Spain",
            region: "Rioja",
            description: "A resurgence of interest in boutique vineyards...",
            picture: "lan_rioja.jpg"
        }];

    db.collection('recipes', function(err, collection) {
        collection.insert(recipes, {safe:true}, function(err, result) {});
    });*/

};