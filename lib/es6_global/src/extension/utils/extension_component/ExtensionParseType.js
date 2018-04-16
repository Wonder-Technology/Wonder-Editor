'use strict';


function panelTypeToJs(param) {
  return {
          name: param[/* name */0],
          parent: param[/* parent */1],
          render: param[/* render */2],
          initialState: param[/* initialState */3],
          willRender: param[/* willRender */4],
          didMount: param[/* didMount */5]
        };
}

function panelTypeFromJs(param) {
  return /* record */[
          /* name */param.name,
          /* parent */param.parent,
          /* render */param.render,
          /* initialState */param.initialState,
          /* willRender */param.willRender,
          /* didMount */param.didMount
        ];
}

function tToJs(param) {
  return {
          panelExtension: param[/* panelExtension */0],
          methodExtension: param[/* methodExtension */1],
          name: param[/* name */2]
        };
}

function tFromJs(param) {
  return /* record */[
          /* panelExtension */param.panelExtension,
          /* methodExtension */param.methodExtension,
          /* name */param.name
        ];
}

export {
  panelTypeToJs   ,
  panelTypeFromJs ,
  tToJs           ,
  tFromJs         ,
  
}
/* No side effect */
