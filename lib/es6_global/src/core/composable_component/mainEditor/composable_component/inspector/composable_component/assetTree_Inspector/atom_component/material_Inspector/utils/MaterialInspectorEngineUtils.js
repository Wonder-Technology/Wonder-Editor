

import * as Log$WonderLog from "../../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as PrimitiveEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/PrimitiveEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as CloneMaterialEngineLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/engine/CloneMaterialEngineLogicService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as ContainerGameObjectInspectorCanvasEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/inspectorCanvas/ContainerGameObjectInspectorCanvasEditorService.js";

function _createSphereWithClonedMaterial(material, addMaterialFunc, containerGameObject, inspectorEngineState) {
  var match = PrimitiveEngineService$WonderEditor.createSphere(material, addMaterialFunc, inspectorEngineState);
  var sphere = match[1];
  return /* tuple */[
          HierarchyGameObjectEngineService$WonderEditor.addChild(containerGameObject, sphere, GameObjectEngineService$WonderEditor.initGameObject(sphere, match[0])),
          sphere
        ];
}

function _createBasicMaterialSphereIntoInspectorCanvas(materialComponent, containerGameObject, engineState, inspectorEngineState) {
  var match = CloneMaterialEngineLogicService$WonderEditor.cloneBasicMaterialToOtherEngineState(materialComponent, engineState, inspectorEngineState);
  return _createSphereWithClonedMaterial(match[0], GameObjectComponentEngineService$WonderEditor.addBasicMaterialComponent, containerGameObject, match[1]);
}

function _createLightMaterialSphereIntoInspectorCanvas(materialComponent, containerGameObject, editorState, engineState, inspectorEngineState) {
  var match = CloneMaterialEngineLogicService$WonderEditor.cloneLightMaterialToOtherEngineState(materialComponent, editorState, engineState, inspectorEngineState);
  return /* tuple */[
          match[1],
          _createSphereWithClonedMaterial(match[0], GameObjectComponentEngineService$WonderEditor.addLightMaterialComponent, containerGameObject, match[2])
        ];
}

function createMaterialSphereIntoInspectorCanvas(type_, materialComponent, editorState, engineState, inspectorEngineState) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("inspector canvas-> container gameObject -> children is empty", "not"), (function (param) {
                        var containerGameObject = ContainerGameObjectInspectorCanvasEditorService$WonderEditor.unsafeGetContainerGameObject(editorState);
                        return Contract$WonderLog.Operators[/* = */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(containerGameObject, inspectorEngineState).length, 0);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  var containerGameObject = ContainerGameObjectInspectorCanvasEditorService$WonderEditor.unsafeGetContainerGameObject(editorState);
  if (type_) {
    return _createLightMaterialSphereIntoInspectorCanvas(materialComponent, containerGameObject, editorState, engineState, inspectorEngineState);
  } else {
    return /* tuple */[
            editorState,
            _createBasicMaterialSphereIntoInspectorCanvas(materialComponent, containerGameObject, engineState, inspectorEngineState)
          ];
  }
}

export {
  _createSphereWithClonedMaterial ,
  _createBasicMaterialSphereIntoInspectorCanvas ,
  _createLightMaterialSphereIntoInspectorCanvas ,
  createMaterialSphereIntoInspectorCanvas ,
  
}
/* Log-WonderLog Not a pure module */
