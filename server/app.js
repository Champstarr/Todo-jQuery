var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var fs = require("fs");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

 function saveTodoList(content){
  fs.writeFile('./public/todo_save.txt', content, function(err){
    if (err) return console.log(err);
    console.log("successfully saved todo_save.json");

  });


 }

 app.post('/save', function(req,res){
  console.log(req.body);
  
  saveTodoList(req.body.list_to_save);
    res.send("puppies")

  })

var server = app.listen(3000, function () {

 

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});