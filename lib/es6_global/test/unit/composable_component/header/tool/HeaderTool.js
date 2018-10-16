

import * as TestTool$WonderEditor from "../../../../tool/TestTool.js";
import * as BaseEventTool$WonderEditor from "../../../../tool/ui/BaseEventTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as HeaderLoadWDBUtils$WonderEditor from "../../../../../src/core/composable_component/header/utils/HeaderLoadWDBUtils.js";
import * as OperateGameObjectEventTool$WonderEditor from "../../../../tool/OperateGameObjectEventTool.js";

var buildFakeZipData = function (arrayBuffer){
  return [
    ["Assets/",{}],
    ["Assets/newFolder",{}],
    ["Assets/newFolder 1",{}],
    ["Assets/newJson.json",{
      async: function(){
          return new Promise((resolve, _) => resolve("this is json result"))
      },
    }],
    ["Assets/BoxTexture.wdb",{
      async: function(){
          return new Promise((resolve, _) => resolve(
            new Int8Array(arrayBuffer)
          ))
      },
    }],
    ["assets.json",{
      async: function(){
          return new Promise((resolve, _) => resolve(
            JSON.stringify(
              {
                "textures": [{
                  "path": "Assets/58eed7f99e14f",
                  "textureIndex": 0,
                  "warpS": 0,
                  "warpT": 0,
                  "minFilter": 0,
                  "magFilter": 1
                }, {
                  "path": "Assets/newFolder/newTexture",
                  "textureIndex": 1,
                  "warpS": 1,
                  "warpT": 1,
                  "minFilter": 1,
                  "magFilter": 1
                }],
                "sources": [{
                  "base64": "this is image result",
                  "name": "58eed7f99e14f.png",
                  "textureArray": [0, 1]
                }]
              }
            )
          ))
      },
    }],
  ]
};

var buildExportFakeJsZipCreateFunc = function (sandbox){
        var obj = {
           file: sandbox.stub(),
           generateAsync: sandbox.stub(),
        };

        obj.file = obj.file.returns(obj);
        obj.generateAsync = (a,b) => {
          return new Promise((resolve, _) => resolve(obj))
        };

        return obj;

};

var buildImportFakeJsZipCreateFunc = function (sandbox,zipData){
        var obj = {
           loadAsync: sandbox.stub(),
        };

        var obj2 = {
           forEach: function(handleFunc){
             zipData.forEach((data) => {
               handleFunc(data[0],data[1]);
             })
           },
           async: function() {
             return obj2
           }
        };

        obj.loadAsync = (zip, a) => {
          return new Promise((resolve, _) => resolve(obj2))
        };

        return obj;

};

function triggerAddBox() {
  var component = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
  return BaseEventTool$WonderEditor.triggerComponentEvent(component, OperateGameObjectEventTool$WonderEditor.triggerClickAddBox);
}

function triggerDisposeBox() {
  var component = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
  return BaseEventTool$WonderEditor.triggerComponentEvent(component, OperateGameObjectEventTool$WonderEditor.triggerClickDisposeAndExecDisposeJob);
}

function triggerAddEmptyGameObject() {
  var component = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
  return BaseEventTool$WonderEditor.triggerComponentEvent(component, OperateGameObjectEventTool$WonderEditor.triggerClickAddEmptyGameObject);
}

var fileLoad = HeaderLoadWDBUtils$WonderEditor.loadSceneWDB;

export {
  buildFakeZipData ,
  buildExportFakeJsZipCreateFunc ,
  buildImportFakeJsZipCreateFunc ,
  triggerAddBox ,
  triggerDisposeBox ,
  triggerAddEmptyGameObject ,
  fileLoad ,
  
}
/* TestTool-WonderEditor Not a pure module */
