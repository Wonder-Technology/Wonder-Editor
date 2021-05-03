

import * as Wonder_jest from "../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";

function createSnapshotJsonStringify(component) {
  return JSON.stringify(component.toJSON());
}

function createSnapshotAndMatch(component) {
  return Wonder_jest.Expect[/* toMatchSnapshot */16](Wonder_jest.Expect[/* expect */0](component.toJSON()));
}

export {
  createSnapshotJsonStringify ,
  createSnapshotAndMatch ,
  
}
/* Wonder_jest Not a pure module */
