var express= require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db;
var errorRecord = require('./models/errorRecordModel');

if(process.env.ENV == 'Test'){
  db = mongoose.connect('mongodb://rhino:27017/errorLogTest');
}
else {
  db = mongoose.connect('mongodb://rhino:27017/errorLog');
}

var app = express();

var port = process.env.port || 9002;

//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//passing model
errorRouter = require('./routes/errorLogRoutes')(errorRecord);


app.use('/api/Errors',errorRouter);

//Basic Home page route
app.get('/', function(req,res){
  res.send('Error Log - API');
});

app.listen(port,function(){
  console.log('Gulp is running my app on port:' + port);
});

module.exports.getApp = app;
