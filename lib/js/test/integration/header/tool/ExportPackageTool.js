'use strict';

var HeaderExportPackageUtils$WonderEditor = require("../../../../src/core/composable_component/header/utils/export/HeaderExportPackageUtils.js");
var OperateMaterialLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/material/OperateMaterialLogicService.js");

function exportWPK(param) {
  return HeaderExportPackageUtils$WonderEditor._export(/* () */0);
}

var getDefaultSnapshotBase64 = OperateMaterialLogicService$WonderEditor.getDefaultSnapshotBase64;

exports.getDefaultSnapshotBase64 = getDefaultSnapshotBase64;
exports.exportWPK = exportWPK;
/* HeaderExportPackageUtils-WonderEditor Not a pure module */
