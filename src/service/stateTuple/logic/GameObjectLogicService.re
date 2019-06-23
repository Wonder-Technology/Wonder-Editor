/* open Wonderjs; */

let createGameObject = ((editorState, engineState)) => {
  let (engineState, gameObject) =
    engineState |> GameObjectEngineService.create;

  (
    editorState
    |> InspectorEditorService.addComponentTypeToMap(
         gameObject,
         InspectorComponentType.Transform,
       ),
    (engineState, gameObject),
  );
};

let addRenderGroup =
    (
      gameObject,
      renderGroup,
      (addMeshRendererFunc, addMaterialFunc),
      (editorState, engineState),
    ) => (
  editorState
  |> InspectorEditorService.addComponentTypeToMap(
       gameObject,
       InspectorComponentType.RenderGroup,
     ),
  engineState
  |> RenderGroupEngineService.addRenderGroupComponents(
       gameObject,
       renderGroup,
       (addMeshRendererFunc, addMaterialFunc),
     ),
);

let addGeometry = (gameObject, component, (editorState, engineState)) => (
  editorState
  |> InspectorEditorService.addComponentTypeToMap(
       gameObject,
       InspectorComponentType.Geometry,
     ),
  GameObjectComponentEngineService.addGeometryComponent(
    gameObject,
    component,
    engineState,
  ),
);

let addCameraGroup = (gameObject, cameraGroup, (editorState, engineState)) => (
  editorState
  |> InspectorEditorService.addComponentTypeToMap(
       gameObject,
       InspectorComponentType.CameraGroup,
     ),
  engineState
  |> CameraGroupEngineService.addCameraGroupComponents(
       gameObject,
       cameraGroup,
       (
         GameObjectComponentEngineService.addBasicCameraViewComponent,
         GameObjectComponentEngineService.addPerspectiveCameraProjectionComponent,
       ),
     ),
);

let addDirectionLight = (gameObject, component, (editorState, engineState)) => (
  editorState
  |> InspectorEditorService.addComponentTypeToMap(
       gameObject,
       InspectorComponentType.Light,
     ),
  GameObjectComponentEngineService.addDirectionLightComponent(
    gameObject,
    component,
    engineState,
  ),
);

let addPointLight = (gameObject, component, (editorState, engineState)) => (
  editorState
  |> InspectorEditorService.addComponentTypeToMap(
       gameObject,
       InspectorComponentType.Light,
     ),
  GameObjectComponentEngineService.addPointLightComponent(
    gameObject,
    component,
    engineState,
  ),
);

let addScript = (gameObject, component, (editorState, engineState)) => (
  editorState
  |> InspectorEditorService.addComponentTypeToMap(
       gameObject,
       InspectorComponentType.Script,
     ),
  GameObjectComponentEngineService.addScriptComponent(
    gameObject,
    component,
    engineState,
  ),
);

let addFlyCameraController =
    (gameObject, component, (editorState, engineState)) => (
  editorState
  |> InspectorEditorService.addComponentTypeToMap(
       gameObject,
       InspectorComponentType.FlyCameraController,
     ),
  GameObjectComponentEngineService.addFlyCameraControllerComponent(
    gameObject,
    component,
    engineState,
  ),
);

let addArcballCameraController =
    (gameObject, component, (editorState, engineState)) => (
  editorState
  |> InspectorEditorService.addComponentTypeToMap(
       gameObject,
       InspectorComponentType.ArcballCameraController,
     ),
  GameObjectComponentEngineService.addArcballCameraControllerComponent(
    gameObject,
    component,
    engineState,
  ),
);

let disposeRenderGroup =
    (gameObject, materialType, (editorState, engineState)) => (
  editorState
  |> InspectorEditorService.removeComponentTypeToMap(
       gameObject,
       InspectorComponentType.RenderGroup,
     ),
  engineState
  |> InspectorRenderGroupUtils.disposeRenderGroup(gameObject, materialType),
);

let removeGeometry =
    (gameObject, geometryComponent, (editorState, engineState)) => (
  editorState
  |> InspectorEditorService.removeComponentTypeToMap(
       gameObject,
       InspectorComponentType.Geometry,
     ),
  engineState
  |> GameObjectComponentEngineService.removeGeometryComponent(
       gameObject,
       geometryComponent,
     ),
);

let disposeCameraGroup =
    (gameObject, cameraGroup, (editorState, engineState)) => (
  editorState
  |> InspectorEditorService.removeComponentTypeToMap(
       gameObject,
       InspectorComponentType.CameraGroup,
     ),
  engineState
  |> CameraGroupEngineService.disposeCameraGroupComponents(
       gameObject,
       cameraGroup,
       (
         GameObjectComponentEngineService.disposeBasicCameraViewComponent,
         GameObjectComponentEngineService.disposePerspectiveCameraProjectionComponent,
       ),
     ),
);

let disposeDirectionLight =
    (gameObject, component, (editorState, engineState)) => (
  editorState
  |> InspectorEditorService.removeComponentTypeToMap(
       gameObject,
       InspectorComponentType.Light,
     ),
  GameObjectComponentEngineService.disposeDirectionLightComponent(
    gameObject,
    component,
    engineState,
  ),
);

let disposePointLight = (gameObject, component, (editorState, engineState)) => (
  editorState
  |> InspectorEditorService.removeComponentTypeToMap(
       gameObject,
       InspectorComponentType.Light,
     ),
  GameObjectComponentEngineService.disposePointLightComponent(
    gameObject,
    component,
    engineState,
  ),
);

let disposeFlyCameraController =
    (gameObject, component, (editorState, engineState)) => (
  editorState
  |> InspectorEditorService.removeComponentTypeToMap(
       gameObject,
       InspectorComponentType.FlyCameraController,
     ),
  GameObjectComponentEngineService.disposeFlyCameraControllerComponent(
    gameObject,
    component,
    engineState,
  ),
);

let disposeArcballCameraController =
    (gameObject, component, (editorState, engineState)) => (
  editorState
  |> InspectorEditorService.removeComponentTypeToMap(
       gameObject,
       InspectorComponentType.ArcballCameraController,
     ),
  GameObjectComponentEngineService.disposeArcballCameraControllerComponent(
    gameObject,
    component,
    engineState,
  ),
);

let disposeScript = (gameObject, component, (editorState, engineState)) => (
  editorState
  |> InspectorEditorService.removeComponentTypeToMap(
       gameObject,
       InspectorComponentType.Script,
     ),
  GameObjectComponentEngineService.disposeScriptComponent(
    gameObject,
    component,
    engineState,
  ),
);

let isCurrentSceneTreeNodeSceneGameObject = ((editorState, engineState)) =>
  switch (editorState |> SceneTreeEditorService.getCurrentSceneTreeNode) {
  | None => false
  | Some(gameObject) =>
    engineState |> SceneEngineService.isSceneGameObject(gameObject)
  };

let isCurrentSceneTreeNodeSceneChildren = ((editorState, engineState)) =>
  switch (editorState |> SceneTreeEditorService.getCurrentSceneTreeNode) {
  | None => false
  | Some(gameObject) =>
    !(engineState |> SceneEngineService.isSceneGameObject(gameObject))
  };