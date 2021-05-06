'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Progress$WonderEditor = require("../../../../src/core/atom_component/progress/Progress.js");
var SinonTool$WonderEditor = require("../../../tool/SinonTool.js");

function buildState($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var percent = $staropt$star !== undefined ? $staropt$star : 0;
  var style = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : ({
        width: Progress$WonderEditor.Method[/* buildWidthPercentStr */0](0)
      });
  var visibleStyle = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : ({
        width: Progress$WonderEditor.Method[/* buildWidthPercentStr */0](0)
      });
  return /* record */[
          /* percent */percent,
          /* style */style,
          /* visibleStyle */visibleStyle
        ];
}

function didMount(sandbox) {
  var send = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
  Progress$WonderEditor.Method[/* didMount */1](send);
  return send;
}

function willUnmount(param) {
  return Progress$WonderEditor.Method[/* willUnmount */2](/* () */0);
}

exports.buildState = buildState;
exports.didMount = didMount;
exports.willUnmount = willUnmount;
/* Progress-WonderEditor Not a pure module */
