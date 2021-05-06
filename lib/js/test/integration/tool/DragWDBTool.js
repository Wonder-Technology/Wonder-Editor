'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var SceneTreeTool$WonderEditor = require("../../tool/SceneTreeTool.js");
var GLSLToolEngine$WonderEditor = require("../../tool/engine/GLSLToolEngine.js");
var FakeGlToolEngine$WonderEditor = require("../../tool/engine/FakeGlToolEngine.js");
var MainEditorAssetTreeTool$WonderEditor = require("../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorSceneTreeTool$WonderEditor = require("../../unit/tool/MainEditorSceneTreeTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../asset/tool/MainEditorAssetUploadTool.js");

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

exports.testDragWDB = testDragWDB;
/* SceneTreeTool-WonderEditor Not a pure module */
