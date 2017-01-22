var errorRecordRepository = function(req,res,errorRecord){
  var saveCallBack = function(err){
    if(err){
      res.status(500);
      res.status.send(err);
    }
    else {
      if(!req.body.appId || !req.body.errorDescr){
        res.status(400);
        res.send('appId and errorDescr are required');
      }
      else {
        //201=created
        res.status(201);
        res.send(errorRecord);
      }

    }
  }

  return{
    saveCallBack : saveCallBack
  };
}

module.exports = errorRecordRepository;
