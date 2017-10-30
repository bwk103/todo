process.env.NODE_ENV = 'test';

var app = require('../../index');
var db = require('../../app/models');
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

describe('API routes', (done)=> {

    before(function(done){
        db.Todo.remove({});
        db.Todo.create({name: 'Walk the dog'});
        db.Todo.create({name: 'Make some lunch'});
        db.Todo.create({name: 'Fix the computer'});
        done();
    });

    after(function(done){
        db.Todo.remove({}, function(){
            done();
        });
    });

    it('GET /api/todos returns all todos', (done)=> {
        chai.request(app)
        .get('/api/todos')
        .end(function(err, res){
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('array')
            expect(res.body).to.be.lengthOf(3)
            done();
        });
    });

    it('POST /api/todos adds a todo to the database', (done) => {
        chai.request(app)
        .post('/api/todos')
        .send({ name: 'Cut the grass'})
        .end(function(err, res){
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body.name).to.equal('Cut the grass');
            expect(res).to.be.json;
            done();
        });
    });
});
