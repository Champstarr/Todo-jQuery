var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

 function saveTodoList(content){
  fs.writeFile('./public/todo_save.txt', content, function(err){
    if (err) return console.log(err);
    console.log("successfully saved todo_save.json");

  });


 }

app.post('/item', function(req,res){
  // Note the db name todosdb in the connection string

  MongoClient.connect('mongodb://localhost:27017/todosdb', function(err, db) {
    if (err) {
      throw err;
    }

    // Find the collection todos (or create it if it doesn't already exist)
    var collection = db.collection('todos');

    // Insert a document into the collection
    collection.insert(req.body.new_item, function(err, item) {
      // Show the item that was just inserted; contains the _id field
      // Note that it is an array containing a single object
      console.log(item[0]._id);
      res.send(item[0]._id);

      // Log the number of items in the collection
      collection.count(function(err, count) {
        console.log("count = " + count);
      });

      // Locate all the entries using find
      collection.find().toArray(function(err, results) {
        console.log(results);

        // Close the db connection
        db.close();
      });
    }); // End of function(err, docs) callback
  });

})

 app.get('/item', function(req,res){
  MongoClient.connect('mongodb://localhost:27017/todosdb', function(err, db) {
    if (err) {
      throw err;
    }

    // Find the collection todos (or create it if it doesn't already exist)
    var collection = db.collection('todos');
    collection.find().toArray(function(err, results){
      res.send(results);


    });

  });

 })

var server = app.listen(3000, function () {

 

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});