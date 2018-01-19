var errorRecordRepository = function(req,res,errorRecord){
  var validateAndSaveModel = function(){

      if(!req.body.appId || !req.body.errorDescr){
        res.status(400);
        res.send('appId and errorDescr are required');
        console.log('I am going to give you a HTTP 400 -');
        throw 400;
      }
      else {
        //201=created
        errorRecord.save();
        res.status(201);
        res.send(errorRecord);
      }

  }

  return{
    validateAndSaveModel : validateAndSaveModel
  };
}

module.exports = errorRecordRepository;
