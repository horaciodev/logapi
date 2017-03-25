var errorRecordController = function(errorRecord){

  var post = function(req,res){
    var errorRecordInstance = new errorRecord(req.body);


    var errorRecordRepo =
    require('../models/errorRecordRepository')(req,res,errorRecordInstance);

    errorRecordInstance.save(errorRecordRepo.saveCallBack);
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
