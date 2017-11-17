process.env.NODE_ENV = 'test';

var app = require('../../index');
var db = require('../../app/models');
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var expect = chai.expect;

chai.use(chaiHttp);

describe('API routes', ()=> {

  after(function(done){
    db.Todo.remove({}, function(){
      mongoose.disconnect();
      app.close();
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

    afterEach((done)=> {
      mongoose.connection.db.dropDatabase(done);
    });

    it('GET /api/todos returns all todos', ()=> {
        return chai.request(app)
        .get('/api/todos')
        .then(function(res){
          expect(res.error).to.be.false;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array')
          expect(res.body).to.have.lengthOf(3);
        })
        .catch(function(err){
          throw err;
        })
    });

    it('POST /api/todos adds a todo to the database', () => {
        return chai.request(app)
        .post('/api/todos')
        .send({ name: 'Cut the grass'})
        .then(function(res) {
          expect(res.error).to.be.false;
          expect(res).to.have.status(201);
          expect(res.body.name).to.equal('Cut the grass');
          expect(res).to.be.json;
        })
        .then(()=>{
          return db.Todo.find();
        })
        .then(result => {
          expect(result).to.have.lengthOf(4);
        })
        .then(()=> {
          return db.Todo.find({name: 'Cut the grass'});
        })
        .then(result => {
          expect(result).to.have.lengthOf(1);
        })
        .catch(function(err){
          throw err;
        })
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

    it('GETS /api/todos/:todo_id returns a single todo item', () => {
      return db.Todo.findOne({name: 'Walk the Dog'})
      .then(function(foundTodo){
        return chai.request(app)
        .get('/api/todos/' + foundTodo._id)
      })
      .then(function(res){
        expect(res.error).to.be.false;
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal('Walk the Dog');
        expect(res).to.be.json;
      })
      .catch(function(err){
        throw err;
      })
    });

    it('PUT /api/:todo_id updates a single todo item', () => {
      return db.Todo.findOne({name: 'Walk the Dog'})
        .then(function(foundTodo){
          return chai.request(app)
          .put('/api/todos/' + foundTodo._id)
          .send({isDone: true})
        })
        .then(function(res){
          expect(res.error).to.be.false;
          expect(res).to.have.status(200);
          expect(res.body.name).to.equal('Walk the Dog');
          expect(res.body.isDone).to.equal(true);
          expect(res).to.be.json;
        })
    });

    it('DELETE /api/todo/:todo_id deletes a single todo item', () => {
      return db.Todo.findOne({name: 'Walk the Dog'})
      .then(function(foundTodo){
        return chai.request(app)
        .delete('/api/todos/' + foundTodo._id)
      })
      .then(function(res){
        expect(res.error).to.be.false;
        expect(res).to.have.status(200);
        expect(res.body.message).to.eql('The todo has been successfully deleted');
      })
      .catch(function(err){
        throw(err);
      })
    });
  });
});
