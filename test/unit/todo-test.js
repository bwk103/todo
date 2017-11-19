'use strict'

const Todo = require('../../app/models/todo.model');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const mongoose = require('mongoose');
require('sinon-mongoose');

chai.use(require('chai-datetime'));

describe('Todo Model Verification', () => {

  describe('name', () => {

    it('allows the user to set the value for "name"', done => {
      let t = new Todo({name: 'Walk the Dog'});
      t.validate(err => {
        expect(err).to.equal(null);
        expect(t.name).to.equal('Walk the Dog');
        done();
      });
    });

    it('is invalid if the name field is empty', done => {
      let t = new Todo();
      t.validate(err => {
        expect(err.errors.name).to.exist;
        done();
      });
    });

    it('is invalid if the user passes an empty string', done => {
      let t = new Todo({name: ''});
      t.validate(err => {
        expect(err.errors.name).to.exist;
        done();
      });
    });
  });

  describe('isDone', () => {

    it('defaults to false if not passed a value', done => {
      let t = new Todo({name: 'Walk the Dog'});
      t.validate(err => {
        expect(err).to.equal(null);
        expect(t.isDone).to.equal(false);
        done();
      });
    });

    it('allows the user to set the value to true', done => {
      let t = new Todo({name: 'Walk the Dog', isDone: true});
      t.validate(err => {
        expect(err).to.equal(null);
        expect(t.isDone).to.equal(true);
        done();
      });
    });
  });

  describe('dateCreated', () => {

    it('defaults to current date if not passed value', done => {
      let t = new Todo ({name: 'Walk the Dog'});
      let today = new Date();
      t.validate(err => {
        expect(err).to.equal(null);
        expect(t.dateCreated).to.equalDate(today);
        done();
      })
    });

    it('allows user to set value to an alternative date', done => {
      let testDate = new Date(2017, 10, 10)
      let t = new Todo ({
        name: 'Walk the Dog',
        isDone: true,
        dateCreated: testDate
      });
      t.validate(err => {
        expect(err).to.equal(null);
        expect(t.dateCreated).to.equal(testDate)
        done();
      })
    });

    it('throws an error if the user attempts to pass a string', done => {
      let testDate = ('This is not a date');
      let t = new Todo ({
        name: 'Walk the Dog',
        dateCreated: testDate
      });
      t.validate(err => {
        expect(err.errors.dateCreated.name).to.exist;
        done();
      });
    })
  })
})
