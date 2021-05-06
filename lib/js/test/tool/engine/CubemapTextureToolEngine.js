'use strict';

var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var ComponentToolEngine$WonderEditor = require("./ComponentToolEngine.js");
var OperateGlTextureMapService$Wonderjs = require("wonder.js/lib/js/src/service/primitive/texture/OperateGlTextureMapService.js");
var CubemapTextureEngineService$WonderEditor = require("../../../src/service/state/engine/texture/CubemapTextureEngineService.js");
var RecordCubemapTextureMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/texture/cubemap/RecordCubemapTextureMainService.js");
var DisposeCubemapTextureMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/texture/cubemap/DisposeCubemapTextureMainService.js");

var getIsNeedUpdate = CubemapTextureEngineService$WonderEditor.getIsNeedUpdate;

function getNewCubemap($staropt$star, param) {
  var engineState = $staropt$star !== undefined ? $staropt$star : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var geometryRecord = RecordCubemapTextureMainService$Wonderjs.getRecord(engineState);
  return ComponentToolEngine$WonderEditor.computeGeneratedIndex(geometryRecord[/* index */0], geometryRecord[/* disposedIndexArray */27])[0];
}

function isAlive(texture, engineState) {
  return DisposeCubemapTextureMainService$Wonderjs.isAlive(texture, RecordCubemapTextureMainService$Wonderjs.getRecord(engineState));
}

function unsafeGetGlTexture(texture, state) {
  return OperateGlTextureMapService$Wonderjs.unsafeGetTexture(texture, RecordCubemapTextureMainService$Wonderjs.getRecord(state)[/* glTextureMap */26]);
}

function buildSource($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var width = $staropt$star !== undefined ? $staropt$star : 4;
  var height = $staropt$star$1 !== undefined ? $staropt$star$1 : 4;
  var src = $staropt$star$2 !== undefined ? $staropt$star$2 : "";
  var name = $staropt$star$3 !== undefined ? $staropt$star$3 : "cubemapTexture_Source";
  return {
          width: width,
          height: height,
          src: src,
          name: name
        };
}

function setAllSources(engineState, texture, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, param) {
  var width = $staropt$star !== undefined ? $staropt$star : 4;
  var height = $staropt$star$1 !== undefined ? $staropt$star$1 : 4;
  var image1Name = $staropt$star$2 !== undefined ? $staropt$star$2 : "i1.png";
  var image2Name = $staropt$star$3 !== undefined ? $staropt$star$3 : "i2.png";
  var image3Name = $staropt$star$4 !== undefined ? $staropt$star$4 : "i3.png";
  var image4Name = $staropt$star$5 !== undefined ? $staropt$star$5 : "i4.png";
  var image5Name = $staropt$star$6 !== undefined ? $staropt$star$6 : "i5.png";
  var image6Name = $staropt$star$7 !== undefined ? $staropt$star$7 : "i6.png";
  var source1 = buildSource(width, height, "px.png", image1Name, /* () */0);
  var source2 = buildSource(width, height, "nx.png", image2Name, /* () */0);
  var source3 = buildSource(width, height, "py.png", image3Name, /* () */0);
  var source4 = buildSource(width, height, "ny.png", image4Name, /* () */0);
  var source5 = buildSource(width, height, "pz.png", image5Name, /* () */0);
  var source6 = buildSource(width, height, "nz.png", image6Name, /* () */0);
  var engineState$1 = CubemapTextureEngineService$WonderEditor.setNZSource(source6, texture, CubemapTextureEngineService$WonderEditor.setPZSource(source5, texture, CubemapTextureEngineService$WonderEditor.setNYSource(source4, texture, CubemapTextureEngineService$WonderEditor.setPYSource(source3, texture, CubemapTextureEngineService$WonderEditor.setNXSource(source2, texture, CubemapTextureEngineService$WonderEditor.setPXSource(source1, texture, engineState))))));
  return /* tuple */[
          engineState$1,
          /* tuple */[
            source1,
            source2,
            source3,
            source4,
            source5,
            source6
          ]
        ];
}

exports.getIsNeedUpdate = getIsNeedUpdate;
exports.getNewCubemap = getNewCubemap;
exports.isAlive = isAlive;
exports.unsafeGetGlTexture = unsafeGetGlTexture;
exports.buildSource = buildSource;
exports.setAllSources = setAllSources;
/* StateEngineService-WonderEditor Not a pure module */
