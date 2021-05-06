'use strict';

var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");

function createSnapshotJsonStringify(component) {
  return JSON.stringify(component.toJSON());
}

function createSnapshotAndMatch(component) {
  return Wonder_jest.Expect[/* toMatchSnapshot */16](Wonder_jest.Expect[/* expect */0](component.toJSON()));
}

exports.createSnapshotJsonStringify = createSnapshotJsonStringify;
exports.createSnapshotAndMatch = createSnapshotAndMatch;
/* Wonder_jest Not a pure module */
