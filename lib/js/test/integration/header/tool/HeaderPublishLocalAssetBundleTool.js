'use strict';

var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");
var PublishLocalModal$WonderEditor = require("../../../../src/core/atom_component/publishLocalModal/PublishLocalModal.js");

function buildPublishLocalModal($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, param) {
  var title = $staropt$star !== undefined ? $staropt$star : "publish local";
  var defaultName = $staropt$star$1 !== undefined ? $staropt$star$1 : "WonderLocal";
  var defaultUseWorker = $staropt$star$2 !== undefined ? $staropt$star$2 : false;
  var defaultUseAssetBundle = $staropt$star$3 !== undefined ? $staropt$star$3 : false;
  var closeFunc = $staropt$star$4 !== undefined ? $staropt$star$4 : (function (param) {
        return /* () */0;
      });
  var submitFunc = $staropt$star$5 !== undefined ? $staropt$star$5 : (function (zipName, useWorker, param) {
        return /* () */0;
      });
  return ReasonReact.element(undefined, undefined, PublishLocalModal$WonderEditor.make(closeFunc, title, submitFunc, defaultName, defaultUseWorker, defaultUseAssetBundle, /* array */[]));
}

var buildSelectTreeForAssetBundle = PublishLocalModal$WonderEditor.Method[/* buildSelectTreeForAssetBundle */4];

exports.buildPublishLocalModal = buildPublishLocalModal;
exports.buildSelectTreeForAssetBundle = buildSelectTreeForAssetBundle;
/* ReasonReact Not a pure module */
