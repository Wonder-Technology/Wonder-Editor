'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var HeaderAssetBundle$WonderEditor = require("../../../../../src/core/composable_component/header/atom_component/asset_bundle/HeaderAssetBundle.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../src/service/state/engine/state/StateEngineService.js");
var LanguageEditorService$WonderEditor = require("../../../../../src/service/state/editor/LanguageEditorService.js");
var HeaderAssetBundleGenerateAllAB$WonderEditor = require("../../../../../src/core/composable_component/header/atom_component/asset_bundle/HeaderAssetBundleGenerateAllAB.js");
var GenerateAssetBundleEngineService$WonderEditor = require("../../../../../src/service/state/engine/asset_bundle/GenerateAssetBundleEngineService.js");
var HeaderAssetBundleGenerateSingleRAB$WonderEditor = require("../../../../../src/core/composable_component/header/atom_component/asset_bundle/HeaderAssetBundleGenerateSingleRAB.js");
var HeaderAssetBundleGenerateSingleSAB$WonderEditor = require("../../../../../src/core/composable_component/header/atom_component/asset_bundle/HeaderAssetBundleGenerateSingleSAB.js");

var buildSelectTreeForGenerateSingleRAB = HeaderAssetBundle$WonderEditor.Method[/* buildSelectTreeForGenerateSingleRAB */5];

function buildGenerateSingleRABModal(selectTree, send, $staropt$star, param) {
  var languageType = $staropt$star !== undefined ? $staropt$star : StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  return HeaderAssetBundleGenerateSingleRAB$WonderEditor.Method[/* renderGenerateSingleRABModal */8](languageType, selectTree, send, /* tuple */[
              (function (param) {
                  return /* () */0;
                }),
              (function (param) {
                  return /* () */0;
                })
            ]);
}

var generateSingleRABResourceData = HeaderAssetBundleGenerateSingleRAB$WonderEditor.Method[/* _generateSingleRABResourceData */6];

function generateSingleRAB(selectTree, $staropt$star, $staropt$star$1, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = $staropt$star$1 !== undefined ? $staropt$star$1 : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = Curry._2(generateSingleRABResourceData, selectTree, /* tuple */[
        editorState,
        engineState
      ]);
  return GenerateAssetBundleEngineService$WonderEditor.generateSingleRAB(GenerateAssetBundleEngineService$WonderEditor.buildResourceData(match[0], match[1], match[2], match[3], match[4], match[5], match[6], match[7], match[8]), engineState);
}

function buildTextureData(textureComponent, imageDataIndex) {
  return /* record */[
          /* textureComponent */textureComponent,
          /* imageDataIndex */imageDataIndex
        ];
}

var buildWDBGeometryFolderName = HeaderAssetBundle$WonderEditor.Method[/* _buildWDBGeometryFolderName */3];

var GenerateSingleRAB = /* module */[
  /* buildSelectTreeForGenerateSingleRAB */buildSelectTreeForGenerateSingleRAB,
  /* buildGenerateSingleRABModal */buildGenerateSingleRABModal,
  /* generateSingleRABResourceData */generateSingleRABResourceData,
  /* generateSingleRAB */generateSingleRAB,
  /* buildTextureData */buildTextureData,
  /* buildWDBGeometryFolderName */buildWDBGeometryFolderName
];

function generateSingleSAB($staropt$star, $staropt$star$1, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = $staropt$star$1 !== undefined ? $staropt$star$1 : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return HeaderAssetBundleGenerateSingleSAB$WonderEditor.Method[/* generateSingleSAB */0](/* tuple */[
              editorState,
              engineState
            ]);
}

var GenerateSingleSAB = /* module */[/* generateSingleSAB */generateSingleSAB];

var buildSelectTreeForGenerateAllAB = HeaderAssetBundle$WonderEditor.Method[/* buildSelectTreeForGenerateAllAB */6];

function buildGenerateAllABModal(selectTree, send, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var nameInputValue = $staropt$star !== undefined ? $staropt$star : "WonderAllAB";
  var dependencyRelationInputValue = $staropt$star$1 !== undefined ? $staropt$star$1 : HeaderAssetBundleGenerateAllAB$WonderEditor.Method[/* buildDefaultDependencyRelationInputValue */5](/* () */0);
  var languageType = $staropt$star$2 !== undefined ? $staropt$star$2 : StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  return HeaderAssetBundleGenerateAllAB$WonderEditor.Method[/* renderGenerateAllABModal */10](/* tuple */[
              /* record */[
                /* selectTreeForGenerateAllAB */selectTree,
                /* nameInputValue */nameInputValue,
                /* dependencyRelationInputValue */dependencyRelationInputValue
              ],
              send
            ], languageType, /* tuple */[
              (function (param) {
                  return /* () */0;
                }),
              (function (param) {
                  return /* () */0;
                })
            ]);
}

function generateAllABZip(selectTree, createZipFunc, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = $staropt$star$1 !== undefined ? $staropt$star$1 : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var nameInputValue = $staropt$star$2 !== undefined ? $staropt$star$2 : "WonderAllAB";
  var dependencyRelationInputValue = $staropt$star$3 !== undefined ? $staropt$star$3 : HeaderAssetBundleGenerateAllAB$WonderEditor.Method[/* buildDefaultDependencyRelationInputValue */5](/* () */0);
  return HeaderAssetBundleGenerateAllAB$WonderEditor.Method[/* generateAllABZip */4](selectTree, /* tuple */[
              nameInputValue,
              dependencyRelationInputValue
            ], createZipFunc, /* tuple */[
              editorState,
              engineState
            ]);
}

function prepareDigest (sandbox){
var digestStub = sandbox.stub();

digestStub.returns(
new Promise((resolve, reject) => {
resolve(new ArrayBuffer())
})
);


       window.crypto = {
subtle: {
digest: digestStub
}
       } ;

return digestStub;
        };

var GenerateAllAB = /* module */[
  /* buildSelectTreeForGenerateAllAB */buildSelectTreeForGenerateAllAB,
  /* buildGenerateAllABModal */buildGenerateAllABModal,
  /* generateAllABZip */generateAllABZip,
  /* prepareDigest */prepareDigest
];

exports.GenerateSingleRAB = GenerateSingleRAB;
exports.GenerateSingleSAB = GenerateSingleSAB;
exports.GenerateAllAB = GenerateAllAB;
/* HeaderAssetBundle-WonderEditor Not a pure module */
