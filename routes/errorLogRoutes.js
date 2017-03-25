var express = require('express');

var routes = function(errorRecord){
  var errorRouter = express.Router();

  var errorRecordController =
  require('../controllers/errorRecordController')(errorRecord);

  errorRouter.use(function(req ,res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  //set up api routes

  errorRouter.route('/') //api/Errors
    .post(errorRecordController.post)
    .get(errorRecordController.get);

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
