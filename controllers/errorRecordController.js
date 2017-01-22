var errorRecordController = function(errorRecord){

  var post = function(req,res){
    var errorRecordInstance = new errorRecord(req.body);


    var errorRecordRepo =
    require('../models/errorRecordRepository')(req,res,errorRecordInstance);

    errorRecordInstance.save(errorRecordRepo.saveCallBack);


    /*
    errorRecordInstance.save(function(err){
      if(err){
        res.status(500);
        res.status.send(err);
      }
      else {
        if(!req.body.appId || !req.body.errorDescr){
          res.status(400);
          res.send('appId is required');
        }
        else {
          //201=created
          res.status(201);
          res.send(errorRecordInstance);
        }

      }

    });
    */

  }
  var get = function(req,res){
    var query = {};
    if(req.query.appId){
      query.appId = req.query.appId;
    }

    errorRecord.find(query,function(err, errRecords){
        if(err){
          res.status(500);
          res.send(err);
        }
        else {
          res.json(errRecords);
        }
    });
  }

  return{
    post: post,
    get: get
  };
}

module.exports = errorRecordController;
