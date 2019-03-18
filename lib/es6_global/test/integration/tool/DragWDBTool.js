

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as SceneTreeTool$WonderEditor from "../../tool/SceneTreeTool.js";
import * as GLSLToolEngine$WonderEditor from "../../tool/engine/GLSLToolEngine.js";
import * as FakeGlToolEngine$WonderEditor from "../../tool/engine/FakeGlToolEngine.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../asset/tool/MainEditorAssetTreeTool.js";
import * as MainEditorSceneTreeTool$WonderEditor from "../../unit/tool/MainEditorSceneTreeTool.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../asset/tool/MainEditorAssetUploadTool.js";

function testDragWDB(sandbox, param, testFunc) {
  SceneTreeTool$WonderEditor.buildThreeLayerSceneGraphToEngine(sandbox);
  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
  var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
  var glShaderSource = gl.shaderSource;
  return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(param[1], undefined, undefined, param[0], /* () */0).then((function (uploadedWDBNodeId) {
                var shaderSourceCountBeforeDrag = GLSLToolEngine$WonderEditor.getShaderSourceCallCount(glShaderSource);
                MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                var shaderSourceCountAfterDrag = GLSLToolEngine$WonderEditor.getShaderSourceCallCount(glShaderSource);
                return Curry._3(testFunc, shaderSourceCountBeforeDrag, shaderSourceCountAfterDrag, glShaderSource);
              }));
}

export {
  testDragWDB ,
  
}
/* SceneTreeTool-WonderEditor Not a pure module */
