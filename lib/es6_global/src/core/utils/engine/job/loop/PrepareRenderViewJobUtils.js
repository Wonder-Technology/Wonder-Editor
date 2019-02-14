

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as SceneViewEditorService$WonderEditor from "../../../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as ManageIMGUIEngineService$WonderEditor from "../../../../../service/state/engine/ManageIMGUIEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../../../service/state/engine/MeshRendererEngineService.js";
import * as DeviceManagerEngineService$WonderEditor from "../../../../../service/state/engine/DeviceManagerEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../../../service/state/engine/camera/BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as PerspectiveCameraProjectionEngineService$WonderEditor from "../../../../../service/state/engine/camera/PerspectiveCameraProjectionEngineService.js";

function _computeAspect(param) {
  return param[2] / param[3];
}

function activeViewCamera(viewRect, viewActiveBasicCameraView, viewActivePerspectiveCameraProjection, engineState) {
  var match = PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraAspect(viewActivePerspectiveCameraProjection, engineState);
  var engineState$1 = match !== undefined ? engineState : PerspectiveCameraProjectionEngineService$WonderEditor.markPerspectiveCameraProjectionNotDirty(viewActivePerspectiveCameraProjection, PerspectiveCameraProjectionEngineService$WonderEditor.removePerspectiveCameraAspect(viewActivePerspectiveCameraProjection, PerspectiveCameraProjectionEngineService$WonderEditor.updatePerspectiveCameraProjection(PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraAspect(_computeAspect(viewRect), viewActivePerspectiveCameraProjection, engineState))));
  return BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(viewActiveBasicCameraView, engineState$1);
}

function unsafeGetSceneViewNeedActiveBasicCameraView(editorState, engineState) {
  var __x = SceneViewEditorService$WonderEditor.unsafeGetNeedActiveCamera(editorState);
  return GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(__x, engineState);
}

function prepareRenderViewJob(viewRect, _activeViewCameraFunc, engineState) {
  return ManageIMGUIEngineService$WonderEditor.sendUniformProjectionMatData(/* tuple */[
              viewRect[2],
              viewRect[3]
            ], Curry._1(_activeViewCameraFunc, DeviceManagerEngineService$WonderEditor.setScissor(viewRect, DeviceManagerEngineService$WonderEditor.setScissorTest(true, DeviceManagerEngineService$WonderEditor.setViewport(viewRect, engineState)))));
}

function markIsRenderSceneViewGameObjects(isRender, editorState, engineState) {
  var __x = SceneViewEditorService$WonderEditor.unsafeGetGridPlane(editorState);
  var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(__x, engineState);
  return /* tuple */[
          editorState,
          MeshRendererEngineService$WonderEditor.setMeshRendererIsRender(__x$1, isRender, engineState)
        ];
}

export {
  _computeAspect ,
  activeViewCamera ,
  unsafeGetSceneViewNeedActiveBasicCameraView ,
  prepareRenderViewJob ,
  markIsRenderSceneViewGameObjects ,
  
}
/* SceneViewEditorService-WonderEditor Not a pure module */
