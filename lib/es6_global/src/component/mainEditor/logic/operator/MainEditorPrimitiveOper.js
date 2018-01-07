'use strict';

import * as MainEditorGameObjectAdaptor$WonderEditor    from "../adaptor/MainEditorGameObjectAdaptor.js";
import * as MainEditorBoxGeometryAdaptor$WonderEditor   from "../adaptor/MainEditorBoxGeometryAdaptor.js";
import * as MainEditorMeshRendererAdaptor$WonderEditor  from "../adaptor/MainEditorMeshRendererAdaptor.js";
import * as MainEditorBasicMaterialAdaptor$WonderEditor from "../adaptor/MainEditorBasicMaterialAdaptor.js";

function createBox(state) {
  var match = MainEditorBasicMaterialAdaptor$WonderEditor.create(state);
  var match$1 = MainEditorMeshRendererAdaptor$WonderEditor.create(match[0]);
  var match$2 = MainEditorGameObjectAdaptor$WonderEditor.create(match$1[0]);
  var obj = match$2[1];
  var match$3 = MainEditorBoxGeometryAdaptor$WonderEditor.create(match$2[0]);
  var geometry = match$3[1];
  var state$1 = MainEditorGameObjectAdaptor$WonderEditor.addGeometryComponent(obj, geometry, MainEditorGameObjectAdaptor$WonderEditor.addMeshRendererComponent(obj, match$1[1], MainEditorGameObjectAdaptor$WonderEditor.addMaterialComponent(obj, match[1], MainEditorBoxGeometryAdaptor$WonderEditor.setConfigData(geometry, {
                    width: 5,
                    height: 5,
                    depth: 5,
                    widthSegment: undefined,
                    heightSegment: undefined,
                    depthSegment: undefined
                  }, match$3[0]))));
  return /* tuple */[
          state$1,
          obj
        ];
}

export {
  createBox ,
  
}
/* MainEditorGameObjectAdaptor-WonderEditor Not a pure module */
