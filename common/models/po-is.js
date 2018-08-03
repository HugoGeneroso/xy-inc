'use strict';

module.exports = function(POIs) {
  var re =  /^\d+$/;
  POIs.validatesFormatOf('xcoord', {
    with: re,
    message: 'A coordenada x deve ser um numero inteiro e não negativo',
  });
  POIs.validatesFormatOf('ycoord', {
    with: re,
    message: 'A coordenada y deve ser um numero inteiro e não negativo',
  });
  /**
   * Este serviço receberá uma coordenada X e uma c oordenada Y, especificando um ponto de referência, em como uma distância máxima (dmax) em metros. O serviço deverá retornar todos os POIs da base de dados que estej am a uma distância menor ou igual a d-max a partir do ponto de referência.
   * @param {number} xcoord coordenada x do ponto de referencia
   * @param {number} ycoord coordenada y do ponto de referencia
   * @param {number} limite Valor em metros do limite de distancia dos pontos de interesse
   * @param {Function(Error, object)} callback
   */

  POIs.findNearestPOIs = function(xcoord, ycoord, limite, callback) {
    var result = {};
    // TODO
    if (xcoord <= 0 || ycoord <= 0 || limite <= 0) {
      var err = {
        statusCode: '400',
        message: 'Todos os valores precisam ser numeros inteiros não negativos',
      };
      callback(err);
    } else {
      POIs.find(function(err, pois) { //  busca os pontos de interesse existentes
        var i;
        var result = [];
        for (i = 0; i < pois.length; i++) { //  verifica quais são os pois proximos de acoordo com a referencia e o limite
          if (limite >= (
            Math.sqrt(
              (
                (pois[i].xcoord - xcoord) * (pois[i].xcoord - xcoord)
              ) + (
                (pois[i].ycoord - ycoord) * (pois[i].ycoord - ycoord)
              )
            )
          )
        ) { //  mede a distancia e adiciona no resultado
            result.push(pois[i]);
          }
        }
        callback(null, result);
      });
    }
  };
};
