open Wonderjs;

let createGameObject = ((editorState, engineState)) =>
  switch (editorState) {
  | None => (None, engineState |> GameObjectAPI.createGameObject)
  | Some(editorState) =>
    let (engineState, gameObject) =
      engineState |> GameObjectAPI.createGameObject;

    (
      editorState
      |> InspectorEditorService.addComponentTypeToMap(
           gameObject,
           InspectorComponentType.Transform,
         )
      |. Some,
      (engineState, gameObject),
    );
  };

let addLightMaterialComponent =
    (gameObject, component, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      GameObjectAPI.addGameObjectLightMaterialComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.addComponentTypeToMap(
           gameObject,
           InspectorComponentType.Material,
         )
      |. Some,
      GameObjectAPI.addGameObjectLightMaterialComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  };

let addBasicMaterialComponent =
    (gameObject, component, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      GameObjectAPI.addGameObjectBasicMaterialComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.addComponentTypeToMap(
           gameObject,
           InspectorComponentType.Material,
         )
      |. Some,
      GameObjectAPI.addGameObjectBasicMaterialComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  };

let addMeshRendererComponent =
    (gameObject, component, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      GameObjectAPI.addGameObjectMeshRendererComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.addComponentTypeToMap(
           gameObject,
           InspectorComponentType.MeshRenderer,
         )
      |. Some,
      GameObjectAPI.addGameObjectMeshRendererComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  };

let addBoxGeometryComponent =
    (gameObject, component, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      GameObjectAPI.addGameObjectBoxGeometryComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.addComponentTypeToMap(
           gameObject,
           InspectorComponentType.CustomGeometry,
         )
      |. Some,
      GameObjectAPI.addGameObjectBoxGeometryComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  };

let addPerspectiveCameraProjectionComponent =
    (gameObject, component, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      GameObjectAPI.addGameObjectPerspectiveCameraProjectionComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.addComponentTypeToMap(
           gameObject,
           InspectorComponentType.PerspectiveCameraProjection,
         )
      |. Some,
      GameObjectAPI.addGameObjectPerspectiveCameraProjectionComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  };

let addBasicCameraViewComponent =
    (gameObject, component, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      GameObjectAPI.addGameObjectBasicCameraViewComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.addComponentTypeToMap(
           gameObject,
           InspectorComponentType.BasicCameraView,
         )
      |. Some,
      GameObjectAPI.addGameObjectBasicCameraViewComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  };

let addSourceInstanceComponent =
    (gameObject, component, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      GameObjectAPI.addGameObjectSourceInstanceComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.addComponentTypeToMap(
           gameObject,
           InspectorComponentType.SourceInstance,
         )
      |. Some,
      GameObjectAPI.addGameObjectSourceInstanceComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  };

let addDirectionLightComponent =
    (gameObject, component, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      GameObjectAPI.addGameObjectDirectionLightComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.addComponentTypeToMap(
           gameObject,
           InspectorComponentType.Light,
         )
      |. Some,
      GameObjectAPI.addGameObjectDirectionLightComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  };

let addPointLightComponent =
    (gameObject, component, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      GameObjectAPI.addGameObjectPointLightComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.addComponentTypeToMap(
           gameObject,
           InspectorComponentType.Light,
         )
      |. Some,
      GameObjectAPI.addGameObjectPointLightComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  };

let addArcballCameraControllerComponent =
    (gameObject, component, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      GameObjectAPI.addGameObjectArcballCameraControllerComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.addComponentTypeToMap(
           gameObject,
           InspectorComponentType.ArcballCameraController,
         )
      |. Some,
      GameObjectAPI.addGameObjectArcballCameraControllerComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  };

let disposeLightMaterialComponent =
    (gameObject, component, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      GameObjectAPI.disposeGameObjectLightMaterialComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.removeComponentTypeToMap(
           gameObject,
           InspectorComponentType.Material,
         )
      |. Some,
      GameObjectAPI.disposeGameObjectLightMaterialComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  };

let disposeBasicMaterialComponent =
    (gameObject, component, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      GameObjectAPI.disposeGameObjectBasicMaterialComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.removeComponentTypeToMap(
           gameObject,
           InspectorComponentType.Material,
         )
      |. Some,
      GameObjectAPI.disposeGameObjectBasicMaterialComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  };
let disposeMeshRendererComponent =
    (gameObject, component, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      GameObjectAPI.disposeGameObjectMeshRendererComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.removeComponentTypeToMap(
           gameObject,
           InspectorComponentType.MeshRenderer,
         )
      |. Some,
      GameObjectAPI.disposeGameObjectMeshRendererComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  };

let disposePerspectiveCameraProjectionComponent =
    (gameObject, component, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.removeComponentTypeToMap(
           gameObject,
           InspectorComponentType.PerspectiveCameraProjection,
         )
      |. Some,
      GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  };

let disposeBasicCameraViewComponent =
    (gameObject, component, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      GameObjectAPI.disposeGameObjectBasicCameraViewComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.removeComponentTypeToMap(
           gameObject,
           InspectorComponentType.BasicCameraView,
         )
      |. Some,
      GameObjectAPI.disposeGameObjectBasicCameraViewComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  };

let disposeDirectionLightComponent =
    (gameObject, component, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      GameObjectAPI.disposeGameObjectDirectionLightComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.removeComponentTypeToMap(
           gameObject,
           InspectorComponentType.Light,
         )
      |. Some,
      GameObjectAPI.disposeGameObjectDirectionLightComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  };

let disposePointLightComponent =
    (gameObject, component, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      GameObjectAPI.disposeGameObjectPointLightComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.removeComponentTypeToMap(
           gameObject,
           InspectorComponentType.Light
         )
      |. Some,
      GameObjectAPI.disposeGameObjectPointLightComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  };

let disposeArcballCameraControllerComponent = 
    (gameObject, component, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      GameObjectAPI.disposeGameObjectArcballCameraControllerComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.removeComponentTypeToMap(
           gameObject,
           InspectorComponentType.ArcballCameraController
         )
      |. Some,
      GameObjectAPI.disposeGameObjectArcballCameraControllerComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  };