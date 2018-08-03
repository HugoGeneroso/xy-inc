'use strict';
var app = require('../../server/server');
var testTools = require('@loopback/testlab/');
describe('POIs (unit)', () => {
  describe('findAllPOIs()', () => {
    it('lists all the points of interests when present', () => {
      const pois = app.models.POIs.find(function(err, pois) { //  busca os pontos de interesse existentes
        testTools.expect(pois).to.be.type('object');
        console.log(pois);
      });
    });
  });
});

describe('POIs (unit)', () => {
  describe('findNearestPOIs()', () => {
    it(
    'lists all near points of interests when coords and limit are given',
    () => {
      var xcoord = 20;
      var ycoord = 10;
      var limite = 10;
      const pois = app.models.POIs.findNearestPOIs( //  busca os pontos de interesse existentes
        xcoord,
        ycoord,
        limite,
        function(err, result) {
          testTools.expect(result).to.be.type('object');
          testTools.expect(result.length).to.be.above(0);
          console.log(result);
        });
    });
  });
});

describe('POIs (unit)', () => {
  describe('findNearestPOIsWrongInput()', () => {
    it(
    'throw an exception when xcoord is invalid',
    () => {
      var xcoord = -20;
      var ycoord = 10;
      var limite = 10;
      const pois = app.models.POIs.findNearestPOIs(
        xcoord,
        ycoord,
        limite,
        function(err, result) { //  busca os pontos de interesse existentes
          testTools.expect(err).to.have.value('statusCode', '400');
          testTools.expect(err).to.have.value('message',
            'Todos os valores precisam ser numeros inteiros não negativos');
          console.log(err);
        });
    });
  });
});

describe('POIs (unit)', () => {
  describe('insertNewPOI()', () => {
    it(
    'calls create method to insert a POI when coords and name are given',
    () => {
      var xcoord = 35;
      var ycoord = 99;
      var nome = 'Teste';
      let insert = app.models.POIs;
      var post = testTools.sinon.stub(app.models.POIs, 'create');
      post.yields();
      var callback = testTools.sinon.spy();
      insert.create({
        'xcoord': xcoord,
        'ycoord': ycoord,
        'nome': nome,
      }, callback);
      post.restore();
      testTools.sinon.assert.calledOnce(callback);
    });
  });
});

describe('POIs (unit)', () => {
  describe('insertNewPOIWrongInput()', () => {
    it(
    'throws exception when input is invalid',
    () => {
      var xcoord = 35;
      var ycoord = -99;
      var nome = 'Teste';
      let insert = app.models.POIs;
      insert.create({
        'xcoord': xcoord,
        'ycoord': ycoord,
        'nome': nome,
      }, function(err, result) {
        testTools.expect(err.statusCode).to.be.eql(422);
        console.log(err.message);
      });
    });
  });
});
