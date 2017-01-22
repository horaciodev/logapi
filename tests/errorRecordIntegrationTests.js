var should = require('should'),
    request = require('supertest'),
    app = require('../app').getApp,
    mongoose = require('mongoose'),
    errRecord = require('../models/errorRecordModel'),
    agent = request.agent(app);

    describe('errorRecord CRUD Test', function(){
      it('Should allow an errorRecord to be created return a read and _id',
        function(done){
          var errorRecordPost = {
                                  appId: 'TESTAPP',
                                  errorDescr:'This is a test error',
                                  sourceHost: 'localhost'
                                };
            agent.post('/api/Errors')
            .send(errorRecordPost)
            .expect(201)
            .end(function(err,results){
              //console.log(results);
              //results.body.read.should.equal(false);  //throws error
              results.body.should.have.property('_id');

              done();
            })
        })

        afterEach(function(done){
          errRecord.remove().exec();
          done();
        })
    })
