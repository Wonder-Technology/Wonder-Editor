'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");

function stubFakeDomForQuerySelector(sandbox, fakeDomId, fakeDom) {
  var querySelector = Curry._3(Sinon.createMethodStub, sandbox[0], document, "querySelector");
  Sinon.returns(fakeDom, Sinon.withOneArg("#" + (String(fakeDomId) + ""), querySelector));
  return /* () */0;
}

function stubFakeDomForGetElementById(sandbox, fakeDomId, fakeDom) {
  var getElementById = Curry._3(Sinon.createMethodStub, sandbox[0], document, "getElementById");
  Sinon.returns(fakeDom, Sinon.withOneArg("" + (String(fakeDomId) + ""), getElementById));
  return /* () */0;
}

exports.stubFakeDomForQuerySelector = stubFakeDomForQuerySelector;
exports.stubFakeDomForGetElementById = stubFakeDomForGetElementById;
/* Sinon Not a pure module */
