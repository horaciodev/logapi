var should = require('should'),
    sinon = require('sinon');

describe('errorRecordController Tests:', function(){
  describe('Post_no_appId', function(){
    it('should not allow errorRecord without appId on post',function(){
        //Arrange

        /*
        mocking request and response objects
        */
        var req= {
          body:{
            errorDescr:'This is a test error'
          }
        }

        var res = {
          status: sinon.spy(), //mock
          send: sinon.spy()   //mock
        }

        /*
        note this is a mock since we're not saving to mongodb
        So all we need is an object with save() method that receives
        and executes a callback function.
        */

        var errorRecord = function(errRec){
          this.save = function(cbFn){ cbFn(); };        
        };

        var errorRecordController =
        require('../controllers/errorRecordController')(errorRecord);
        //Act

        errorRecordController.post(req,res);

        //Assertions
        //checking for bad request
        res.status.calledWith(400).should.equal(true, 'Bad status' +
          res.status.args[0][0]);
        res.send.calledWith('appId and errorDescr are required').should.equal(true);

        //teardown
        res.status.reset();
        res.send.reset();

    });
  });

  describe('Post_no_errorDescr', function(){
    it('should not allow errorRecord without errorDescr on post',function(){
        //Arrange

        /*
        mocking request and response objects
        */
        var req= {
          body:{
            appId:'CORESVCS'
          }
        }

        var res = {
          status: sinon.spy(), //mock
          send: sinon.spy()   //mock
        }

        /*
        note this is a mock since we're not saving to mongodb
        So all we need is an object with save() method that does nothing
        */

        var errorRecord = function(errorRec){
          this.save = function(cbFn){ cbFn(); };
        };

        var errorRecordController =
        require('../controllers/errorRecordController')(errorRecord);
        //Act

        errorRecordController.post(req,res);

        //Assertions
        //checking for bad request
        res.status.calledWith(400).should.equal(true, 'Bad status' +
          res.status.args[0][0]);
        res.send.calledWith('appId and errorDescr are required').should.equal(true);

        //teardown
        res.status.reset();
        res.send.reset();

    });
  });
})
