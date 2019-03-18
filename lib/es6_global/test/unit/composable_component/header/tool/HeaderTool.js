

import * as TestTool$WonderEditor from "../../../../tool/TestTool.js";
import * as HeaderFile$WonderEditor from "../../../../../src/core/composable_component/header/atom_component/file/HeaderFile.js";

function buildFakeZipData (arrayBuffer){
  return [
    ["Assets/",{}],
    ["Assets/newFolder",{}],
    ["Assets/newFolder 1",{}],
    ["Assets/CubeTexture.wdb",{
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

function buildPublishFakeJsZipCreateFunc (sandbox){
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

function buildFileComponent(state, send, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return HeaderFile$WonderEditor.Method[/* buildFileComponent */4](/* tuple */[
              state,
              send
            ], /* tuple */[
              uiState,
              dispatchFunc
            ], /* tuple */[
              true,
              (function (param) {
                  return /* () */0;
                }),
              (function (param) {
                  return /* () */0;
                })
            ]);
}

function buildHeaderFileState($staropt$star, param) {
  var isShowControlsModal = $staropt$star !== undefined ? $staropt$star : false;
  return /* record */[/* isShowControlsModal */isShowControlsModal];
}

export {
  buildFakeZipData ,
  buildPublishFakeJsZipCreateFunc ,
  buildFileComponent ,
  buildHeaderFileState ,
  
}
/* TestTool-WonderEditor Not a pure module */
