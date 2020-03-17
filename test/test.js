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

// Integration Tests
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

describe('Get Single Quote', () => {
  describe('/GET JSON of One Random Quote', () => {
      it('It should GET a JSON of a single random quote', (done) => {
        chai.request(server)
        .get('/api/quote')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.have.ownProperty('random_quote');
          expect(res.body.random_quote).to.have.ownProperty('quote');
          expect(res.body.random_quote.quote).to.be.a('string');
          expect(res.body.random_quote).to.have.ownProperty('villager_name');
          expect(res.body.random_quote.villager_name).to.be.a('string');
          done();
        });
      });
  });
});

describe('Get Single Quote with the Multiple Quote Route', () => {
  describe('/GET JSON of One Random Quote using api/quotes/random?', () => {
      it('It should GET a JSON of a single random quote', (done) => {
        chai.request(server)
        .get('/api/quotes')
        .query({num: 1})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.have.ownProperty('random_quotes').that.includes.all.keys(['0']);
          expect(res.body.random_quotes.length).to.equal(1);
          expect(res.body.random_quotes[0]).to.have.ownProperty('quote');
          expect(res.body.random_quotes[0]).to.have.ownProperty('villager_name');
          done();
        });
      });
  });
});

describe('Get Multiple Quotes', () => {
  describe('/GET JSON of Multiple Random Quotes', () => {
      it('It should GET a JSON of 3 random quotes', (done) => {
        chai.request(server)
        .get('/api/quotes')
        .query({num: 3})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.have.ownProperty('random_quotes').that.includes.all.keys(['0', '1', '2']);
          expect(res.body.random_quotes[0]).to.have.ownProperty('quote');
          expect(res.body.random_quotes[0]).to.have.ownProperty('villager_name');
          expect(res.body.random_quotes[1]).to.have.ownProperty('quote');
          expect(res.body.random_quotes[1]).to.have.ownProperty('villager_name');
          expect(res.body.random_quotes[2]).to.have.ownProperty('quote');
          expect(res.body.random_quotes[2]).to.have.ownProperty('villager_name');
          expect(res.body.random_quotes.length).to.equal(3);
          done();
        });
      });
  });
});

describe('Get 0 Quotes', () => {
  describe('/GET JSON containing 0 quotes', () => {
      it('It should GET a JSON that contains an empty array', (done) => {
        chai.request(server)
        .get('/api/quotes')
        .query({num: 0})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.have.ownProperty('random_quotes');
          expect(res.body.random_quotes).to.be.an('array');
          expect(res.body.random_quotes.length).to.equal(0);
          done();
        });
      });
  });
});

describe('Get Errors for Invalid Input in Num', () => {
  describe('/Get JSON with bad request error when num < 0', () => {
    it('It should GET a JSON with a 400 error for bad request, number less than 0', (done) => {
      chai.request(server)
      .get('/api/quotes')
      .query({num: -1})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res).to.be.json;
        expect(res.body).to.have.ownProperty('error');
        done();
      })
    })
  });

  describe('/Get JSON with bad request error when num query is empty', () => {
    it('It should GET a JSON with a 400 error for bad request', (done) => {
      chai.request(server)
      .get('/api/quotes')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res).to.be.json;
        expect(res.body).to.have.ownProperty('error');
        done();
      })
    })
  });

  describe('/Get JSON with bad request error when num query is null"', () => {
    it('It should GET a JSON with a 400 error for bad request', (done) => {
      chai.request(server)
      .get('/api/quotes')
      .query({num: null})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res).to.be.json;
        expect(res.body).to.have.ownProperty('error');
        done();
      })
    })
  });

  describe('/Get JSON with bad request error when num = "test"', () => {
    it('It should GET a JSON with a 400 error for bad request', (done) => {
      chai.request(server)
      .get('/api/quotes')
      .query({num: "test"})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res).to.be.json;
        expect(res.body).to.have.ownProperty('error');
        done();
      })
    })
  });

  describe('/Get JSON with bad request error when num = 1.5', () => {
    it('It should GET a JSON with a 400 error for bad request', (done) => {
      chai.request(server)
      .get('/api/quotes')
      .query({num: 1.5})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res).to.be.json;
        expect(res.body).to.have.ownProperty('error');
        done();
      })
    })
  });
});
