open Wonderjs;

let createGameObject = ((editorState, engineState)) => {
  let (engineState, gameObject) =
    engineState |> GameObjectAPI.createGameObject;

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
  GameObjectAPI.addGameObjectGeometryComponent(
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
         GameObjectAPI.addGameObjectBasicCameraViewComponent,
         GameObjectAPI.addGameObjectPerspectiveCameraProjectionComponent,
       ),
     ),
);

let addDirectionLight = (gameObject, component, (editorState, engineState)) => (
  editorState
  |> InspectorEditorService.addComponentTypeToMap(
       gameObject,
       InspectorComponentType.Light,
     ),
  GameObjectAPI.addGameObjectDirectionLightComponent(
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
  GameObjectAPI.addGameObjectPointLightComponent(
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
  GameObjectAPI.addGameObjectArcballCameraControllerComponent(
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
         GameObjectAPI.disposeGameObjectBasicCameraViewComponent,
         GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent,
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
  GameObjectAPI.disposeGameObjectDirectionLightComponent(
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
  GameObjectAPI.disposeGameObjectPointLightComponent(
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
  GameObjectAPI.disposeGameObjectArcballCameraControllerComponent(
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