process.env.NODE_ENV = 'test';

const dbImport = require('../db.js');
const sqlite3 = dbImport.sqlite3;
let db = dbImport.db;

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let server = require('../server.js');
let should = require('chai').should();
let expect = require('chai').expect;

// Unit Tests
describe('Homepage', () => {
  describe('/GET HTML Homepage', () => {
    it('it should GET the HTML homepage', (done) => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res).to.be.html;
        done();
      });
    }).timeout(10000);
  });
});

// Test 404 error on invalid page
describe('404 Error', () => {
  describe('404 Error with invalid endpoint /random', () => {
    it('it should GET the 404 error', (done) => {
      chai.request(server)
      .get('/random')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    })
  })
})

describe('All Villagers', () => {
  describe('/GET JSON of All Villagers', () => {
      it('It should GET a JSON of all villagers', (done) => {
        chai.request(server)
        .get('/api/villagers')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.have.ownProperty('Villagers').that.includes.all.keys(['0']);
          done();
        });
      });
  });
});

describe('All Quotes', () => {
  describe('/GET JSON of All Quotes', () => {
      it('It should GET a JSON of all quotes', (done) => {
        chai.request(server)
        .get('/api/quotes')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.have.ownProperty('Quotes').that.includes.all.keys(['0']);
          done();
        });
      });
  });
});
