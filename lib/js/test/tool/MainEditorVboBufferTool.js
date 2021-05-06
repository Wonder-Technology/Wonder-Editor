'use strict';

var ImmutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ImmutableSparseMapService.js");

function passBufferShouldExistCheckWhenDisposeGeometry(geometryIndex, state) {
  var match = state[/* vboBufferRecord */36];
  ImmutableSparseMapService$WonderCommonlib.set(geometryIndex, 0, match[/* geometryVertexBufferMap */0]);
  ImmutableSparseMapService$WonderCommonlib.set(geometryIndex, 0, match[/* geometryElementArrayBufferMap */3]);
  return state;
}

exports.passBufferShouldExistCheckWhenDisposeGeometry = passBufferShouldExistCheckWhenDisposeGeometry;
/* No side effect */
