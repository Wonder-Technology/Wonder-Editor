

import * as Most from "most";
import * as ASBUtils$WonderEditor from "../ASBUtils.js";
import * as BufferUtils$WonderEditor from "../BufferUtils.js";
import * as DataViewUtils$WonderEditor from "../DataViewUtils.js";
import * as StateEditorService$WonderEditor from "../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../service/state/engine/state/StateEngineService.js";
import * as HeaderBuildAssetDataUtils$WonderEditor from "./HeaderBuildAssetDataUtils.js";
import * as Uint8ArrayAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/Uint8ArrayAssetEditorService.js";

function _getJsonStr(jsonByteLength, asb) {
  var decoder = new TextDecoder("utf-8");
  return decoder.decode(new Uint8Array(asb, ASBUtils$WonderEditor.getHeaderTotalByteLength(/* () */0), jsonByteLength));
}

function _getBuffer(jsonByteLength, asb) {
  return asb.slice(BufferUtils$WonderEditor.alignedLength(ASBUtils$WonderEditor.getHeaderTotalByteLength(/* () */0) + jsonByteLength | 0));
}

function _readHeader(dataView) {
  var match = DataViewUtils$WonderEditor.getUint32_1(0, dataView);
  var match$1 = DataViewUtils$WonderEditor.getUint32_1(match[1], dataView);
  return /* tuple */[
          match$1[1],
          match[0],
          match$1[0]
        ];
}

function importASB(asb) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var dataView = DataViewUtils$WonderEditor.create(asb);
  var match = _readHeader(dataView);
  var jsonByteLength = match[1];
  var jsonStr = _getJsonStr(jsonByteLength, asb);
  var buffer = _getBuffer(jsonByteLength, asb);
  var asbRecord = JSON.parse(jsonStr);
  return Most.flatMap((function (param) {
                var match = param[2];
                var match$1 = param[1];
                var lightMaterialMap = match$1[1];
                var basicMaterialMap = match$1[0];
                return Most.fromPromise(HeaderBuildAssetDataUtils$WonderEditor.buildWDBData(param[0], asbRecord, buffer, /* tuple */[
                                  match[0],
                                  match[1]
                                ]).then((function (param) {
                                  var match = param[1];
                                  var engineState = match[1];
                                  var match$1 = HeaderBuildAssetDataUtils$WonderEditor.buildScriptEventFunctionData(asbRecord, engineState, match[0]);
                                  var match$2 = HeaderBuildAssetDataUtils$WonderEditor.buildScriptAttributeData(asbRecord, engineState, match$1[1]);
                                  var editorState = HeaderBuildAssetDataUtils$WonderEditor.buildAssetBundleData(asbRecord, buffer, engineState, match$2[1]);
                                  StateEditorService$WonderEditor.setState(editorState);
                                  StateEngineService$WonderEditor.setState(engineState);
                                  return Promise.resolve(/* tuple */[
                                              /* tuple */[
                                                param[0],
                                                Uint8ArrayAssetEditorService$WonderEditor.buildImageUint8ArrayMap(editorState)
                                              ],
                                              /* tuple */[
                                                basicMaterialMap,
                                                lightMaterialMap
                                              ],
                                              /* tuple */[
                                                match$1[0],
                                                match$2[0]
                                              ]
                                            ]);
                                })));
              }), Most.map((function (param) {
                    var imageDataIndexMap = param[1];
                    var match = HeaderBuildAssetDataUtils$WonderEditor.buildTextureData(asbRecord, /* tuple */[
                          param[0],
                          imageDataIndexMap
                        ], /* tuple */[
                          param[2],
                          engineState
                        ]);
                    var match$1 = match[1];
                    return HeaderBuildAssetDataUtils$WonderEditor.buildMaterialData(asbRecord, /* tuple */[
                                imageDataIndexMap,
                                match[0]
                              ], /* tuple */[
                                match$1[0],
                                match$1[1]
                              ]);
                  }), Most.fromPromise(HeaderBuildAssetDataUtils$WonderEditor.buildImageData(asbRecord, buffer, editorState))));
}

export {
  _getJsonStr ,
  _getBuffer ,
  _readHeader ,
  importASB ,
  
}
/* most Not a pure module */
