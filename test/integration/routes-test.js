process.env.NODE_ENV = 'test';

var app = require('../../index');
var db = require('../../app/models');
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

describe('API routes', ()=> {

  after(function(done){
    db.Todo.remove({}, function(){
      done();
    })
  })

  describe('/api/todos', ()=> {

    beforeEach(function(done){
      db.Todo.create({name: 'Walk the dog'});
      db.Todo.create({name: 'Make some lunch'});
      db.Todo.create({name: 'Fix the computer'});
      done();
    });

    afterEach(function(done){
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
            expect(res.body).to.have.lengthOf(3);
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

  describe('/api/todos/:todo_id', () => {

    beforeEach(function(done){
      db.Todo.create({name: 'Walk the Dog'}, function(){
        done();
      });
    });

    afterEach(function(done){
      db.Todo.remove({}, function(){
        done();
      });
    });

    it('GETS /api/todos/:todo_id returns a single todo item', (done) => {
      db.Todo.findOne({name: 'Walk the Dog'}, function(err, foundTodo){
        var id = foundTodo._id;
        chai.request(app)
        .get('/api/todos/' + id)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.name).to.equal('Walk the Dog');
          expect(res).to.be.json;
          done();
        })
      })
    });

    it('PUT /api/:todo_id updates a single todo item', (done) => {
      db.Todo.findOne({name: 'Walk the Dog'}, function(err, foundTodo){
        var id = foundTodo._id;
        chai.request(app)
        .put('/api/todos/' + id)
        .send({isDone: true})
        .end(function(err, res){
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body.name).to.equal('Walk the Dog');
            expect(res.body.isDone).to.equal(true);
            expect(res).to.be.json;
            done();
        });
      });
    });

    it('DELETE /api/todo/:todo_id deletes a single todo item', (done) => {
      db.Todo.findOne({name: 'Walk the Dog'}, function(err, foundTodo){
        var id = foundTodo._id;
        chai.request(app)
        .delete('/api/todos/' + id)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('The todo has been successfully deleted');
          done();
        });
      })
    });
  });
});
