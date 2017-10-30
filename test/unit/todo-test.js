var Todo = require('../../app/models/todo.model'),
    chai = require('chai'),
    expect = chai.expect;

chai.use(require('chai-datetime'));

describe('Todo Model', () => {

  describe('name', () => {

    it('allows the user to set the value for "name"', done => {
      var t = new Todo({name: 'Walk the Dog'});
      t.validate(err => {
        expect(err).to.equal(null);
        expect(t.name).to.equal('Walk the Dog');
        done();
      });
    });

    it('is invalid if the name field is empty', done => {
      var t = new Todo();
      t.validate(err => {
        expect(err.errors.name).to.exist;
        done();
      });
    });

    it('is invalid if the user passes an empty string', done => {
      var t = new Todo({name: ''});
      t.validate(err => {
        expect(err.errors.name).to.exist;
        done();
      });
    });
  });

  describe('isDone', () => {

    it('defaults to false if not passed a value', done => {
      var t = new Todo({name: 'Walk the Dog'});
      t.validate(err => {
        expect(err).to.equal(null);
        expect(t.isDone).to.equal(false);
        done();
      });
    });

    it('allows the user to set the value to true', done => {
      var t = new Todo({name: 'Walk the Dog', isDone: true});
      t.validate(err => {
        expect(err).to.equal(null);
        expect(t.isDone).to.equal(true);
        done();
      });
    });
  });

  describe('dateCreated', () => {

    it('defaults to current date if not passed value', done => {
      var t = new Todo ({name: 'Walk the Dog'});
      var today = new Date();
      t.validate(err => {
        expect(err).to.equal(null);
        expect(t.dateCreated).to.equalDate(today);
        done();
      })
    });

    it('allows user to set value to an alternative date', done => {
      var testDate = new Date(2017, 10, 10)
      var t = new Todo ({
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
      var testDate = ('This is not a date');
      var t = new Todo ({
        name: 'Walk the Dog',
        dateCreated: testDate
      });
      t.validate(err => {
        expect(err.errors.dateCreated.name).to.exist;
        done();
      });
    })
  })
});
