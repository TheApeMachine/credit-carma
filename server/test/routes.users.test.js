process.env.NODE_ENV = 'test';

const chai     = require('chai');
const should   = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../app');
const knex   = require('../db/knex');

describe('POST /users', () => {
  beforeEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        done();
      });
    });
  });

  afterEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      done();
    });
  });

  it('should not create a user with an invalid credit-card number', (done) => {
    chai.request(server)
    .post('/users')
    .send({
      first_name: 'Kermit',
      last_name: 'the Frog',
      card_number: '1234123412341234',
      cvv: '123',
      expires_on: '04/20'
    })
    .end((err, res) => {
      res.status.should.equal(500);
      done();
    });
  });

  it('should create a user with a valid credit-card number', (done) => {
    chai.request(server)
    .post('/users')
    .send({
      first_name: 'Kermit',
      last_name: 'the Frog',
      card_number: '5105105105105100',
      cvv: '123',
      expires_on: '04/20'
    })
    .end((err, res) => {
      res.status.should.equal(200);
      done();
    });
  });
});
