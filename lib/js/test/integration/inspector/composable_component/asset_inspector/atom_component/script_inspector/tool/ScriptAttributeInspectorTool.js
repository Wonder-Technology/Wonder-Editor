'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var TestTool$WonderEditor = require("../../../../../../../tool/TestTool.js");
var SinonTool$WonderEditor = require("../../../../../../../tool/SinonTool.js");
var ArrayService$WonderEditor = require("../../../../../../../../src/service/atom/ArrayService.js");
var GameObjectTool$WonderEditor = require("../../../../../../../tool/GameObjectTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../../tool/MainEditorSceneTool.js");
var LanguageEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/LanguageEditorService.js");
var MainEditorAssetIdTool$WonderEditor = require("../../../../../../asset/tool/MainEditorAssetIdTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../../../../asset/tool/MainEditorAssetTreeTool.js");
var ScriptAttributeInspector$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/scriptAttribute_inspector/ui/ScriptAttributeInspector.js");
var ScriptAttributeEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/script/ScriptAttributeEngineService.js");
var MainEditorScriptAttributeTool$WonderEditor = require("../../../../sceneTree_inspector/script/tool/MainEditorScriptAttributeTool.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var ScriptAttributeNodeAssetService$WonderEditor = require("../../../../../../../../src/service/record/editor/asset/ScriptAttributeNodeAssetService.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../../../../../atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");
var AddScriptAttributeDefaultFieldEventHandler$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/scriptAttribute_inspector/eventHandler/AddScriptAttributeDefaultFieldEventHandler.js");

function addDefaultField(sandbox, nodeId, $staropt$star, param) {
  var send = $staropt$star !== undefined ? $staropt$star : Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
  return Curry._3(ScriptAttributeInspector$WonderEditor.Method[/* addDefaultField */2], /* tuple */[
              TestTool$WonderEditor.buildEmptyAppState(/* () */0),
              TestTool$WonderEditor.getDispatch(/* () */0)
            ], (function (attribute) {
                return Curry._1(send, /* UpdateAttributeEntries */[attribute]);
              }), nodeId);
}

function getAttributeName(nodeId, editorState) {
  return ScriptAttributeNodeAssetService$WonderEditor.getNodeData(StateLogicService$WonderEditor.getEditorState((function (param) {
                      return OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, param);
                    })))[/* name */0];
}

function getAttribute(nodeId, editorState) {
  return ScriptAttributeNodeAssetService$WonderEditor.getNodeData(StateLogicService$WonderEditor.getEditorState((function (param) {
                      return OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, param);
                    })))[/* attribute */1];
}

function getAttributeEntries(nodeId, editorState) {
  return ScriptAttributeEngineService$WonderEditor.getScriptAttributeEntries(getAttribute(nodeId, editorState));
}

function updateScriptAttributeNodeByReplaceFieldData(nodeId, param) {
  return Curry._3(ScriptAttributeInspector$WonderEditor.Method[/* _updateScriptAttributeNodeByReplaceFieldData */1], /* tuple */[
              TestTool$WonderEditor.buildEmptyAppState(/* () */0),
              TestTool$WonderEditor.getDispatch(/* () */0)
            ], /* () */0, /* tuple */[
              nodeId,
              param[0],
              param[1]
            ]);
}

function updateScriptAttributeNodeByRemoveFieldData(sandbox, nodeId, fieldName, $staropt$star, param) {
  var send = $staropt$star !== undefined ? $staropt$star : Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
  return Curry._3(ScriptAttributeInspector$WonderEditor.Method[/* _updateScriptAttributeNodeByRemoveFieldData */0], /* tuple */[
              TestTool$WonderEditor.buildEmptyAppState(/* () */0),
              TestTool$WonderEditor.getDispatch(/* () */0)
            ], (function (attribute) {
                return Curry._1(send, /* UpdateAttributeEntries */[attribute]);
              }), /* tuple */[
              nodeId,
              fieldName
            ]);
}

function buildFieldJsObj(type_, defaultValue) {
  return {
          type: type_,
          defaultValue: defaultValue
        };
}

function buildField(type_, defaultValue) {
  return /* record */[
          /* type_ */type_,
          /* defaultValue */defaultValue,
          /* value */defaultValue
        ];
}

function renameField(sandbox, nodeId, oldName, newName, $staropt$star, param) {
  var send = $staropt$star !== undefined ? $staropt$star : Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  return Curry._3(ScriptAttributeInspector$WonderEditor.Method[/* _renameField */3], /* tuple */[
              TestTool$WonderEditor.buildEmptyAppState(/* () */0),
              TestTool$WonderEditor.getDispatch(/* () */0)
            ], /* tuple */[
              languageType,
              (function (attribute) {
                  return Curry._1(send, /* UpdateAttributeEntries */[attribute]);
                })
            ], /* tuple */[
              nodeId,
              oldName,
              newName
            ]);
}

function unsafeGetScriptAttributeFieldDefaultValue(nodeId, fieldName, editorState) {
  return ScriptAttributeEngineService$WonderEditor.unsafeGetScriptAttributeFieldDefaultValue(fieldName, getAttribute(nodeId, editorState));
}

function getDefaultFieldType(param) {
  return AddScriptAttributeDefaultFieldEventHandler$WonderEditor.CustomEventHandler[/* _getDefaultFieldType */3](/* () */0);
}

function getDefaultFieldDefaultValue(param) {
  return AddScriptAttributeDefaultFieldEventHandler$WonderEditor.CustomEventHandler[/* _getDefaultFieldDefaultValue */4](/* () */0);
}

function createDefaultSceneAndAddScriptComponent(sandbox) {
  MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
  return MainEditorInspectorAddComponentTool$WonderEditor.addScriptComponent(undefined, undefined, undefined, /* () */0);
}

function getFieldName(nodeId) {
  return ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getEditorState((function (param) {
                      return ScriptAttributeEngineService$WonderEditor.getScriptAttributeEntries(getAttribute(nodeId, param));
                    })))[0];
}

function prepareForOneScriptComponent(sandbox) {
  var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
  var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
  addDefaultField(sandbox, addedNodeId, undefined, /* () */0);
  MainEditorScriptAttributeTool$WonderEditor.addScriptAttribute(script, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
  return /* tuple */[
          script,
          addedNodeId,
          getFieldName(addedNodeId)
        ];
}

function prepareForTwoScriptComponents(sandbox) {
  var script1 = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
  MainEditorSceneTool$WonderEditor.setSecondCubeToBeCurrentSceneTreeNode(/* () */0);
  MainEditorInspectorAddComponentTool$WonderEditor.addScriptComponent(undefined, undefined, undefined, /* () */0);
  var script2 = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
  var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
  addDefaultField(sandbox, addedNodeId, undefined, /* () */0);
  MainEditorScriptAttributeTool$WonderEditor.addScriptAttribute(script1, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
  MainEditorScriptAttributeTool$WonderEditor.addScriptAttribute(script2, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
  return /* tuple */[
          /* tuple */[
            script1,
            script2
          ],
          addedNodeId,
          getFieldName(addedNodeId)
        ];
}

var TestUpdateScriptAttributeInAllScriptComponents = /* module */[
  /* createDefaultSceneAndAddScriptComponent */createDefaultSceneAndAddScriptComponent,
  /* getFieldName */getFieldName,
  /* prepareForOneScriptComponent */prepareForOneScriptComponent,
  /* prepareForTwoScriptComponents */prepareForTwoScriptComponents
];

exports.addDefaultField = addDefaultField;
exports.getAttributeName = getAttributeName;
exports.getAttribute = getAttribute;
exports.getAttributeEntries = getAttributeEntries;
exports.updateScriptAttributeNodeByReplaceFieldData = updateScriptAttributeNodeByReplaceFieldData;
exports.updateScriptAttributeNodeByRemoveFieldData = updateScriptAttributeNodeByRemoveFieldData;
exports.buildFieldJsObj = buildFieldJsObj;
exports.buildField = buildField;
exports.renameField = renameField;
exports.unsafeGetScriptAttributeFieldDefaultValue = unsafeGetScriptAttributeFieldDefaultValue;
exports.getDefaultFieldType = getDefaultFieldType;
exports.getDefaultFieldDefaultValue = getDefaultFieldDefaultValue;
exports.TestUpdateScriptAttributeInAllScriptComponents = TestUpdateScriptAttributeInAllScriptComponents;
/* TestTool-WonderEditor Not a pure module */
