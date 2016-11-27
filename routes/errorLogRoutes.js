var express = require('express');

var routes = function(errorRecord){
  var errorRouter = express.Router();

  //set up api routes

  errorRouter.route('/') //api/Errors
    .post(function(req,res){
      var errorRecordInstance = new errorRecord(req.body);

      //console.log(errorRecordInstance);
      errorRecordInstance.save(function(err){
        if(err){
          res.status(500).send(err);
        }
        else {
          //201=created
          res.status(201).send(errorRecordInstance);
        }

      });

    })
    .get(function(req,res){
      //var responsejson = {hello: "This is sparta!"};

      var query = {};
      if(req.query.appId){
        query.appId = req.query.appId;
      }

      errorRecord.find(query,function(err, errRecords){
          if(err){
            res.status(500).send(err);
          }
          else {
            res.json(errRecords);
          }
      });

    });

    //custom middleware for /:id route only
    errorRouter.use('/:id', function(req,res,next){
      errorRecord.findById(req.params.id,function(err, errRecord){
          if(err){
            res.status(500).send(err);
          }
          else if(errRecord){
            req.errRecord = errRecord;
            next();
          }
          else{
            res.status(404).send('item not found');
          }
      });
    });
    //route for 1 element
    errorRouter.route('/:id') //api/Errors/:id
    .get(function(req,res){

      res.json(req.errRecord);

    });

    return errorRouter;
};

module.exports = routes;
