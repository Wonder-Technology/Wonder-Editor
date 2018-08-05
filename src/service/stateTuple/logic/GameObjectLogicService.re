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

let addRenderGroup =
    (
      gameObject,
      renderGroup,
      (addMeshRendererFunc, addMaterialFunc),
      (editorState, engineState),
    ) =>
  switch (editorState) {
  | None => (
      None,
      engineState
      |> RenderGroupEngineService.addRenderGroupComponents(
           gameObject,
           renderGroup,
           (addMeshRendererFunc, addMaterialFunc),
         ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.addComponentTypeToMap(
           gameObject,
           InspectorComponentType.RenderGroup,
         )
      |. Some,
      engineState
      |> RenderGroupEngineService.addRenderGroupComponents(
           gameObject,
           renderGroup,
           (addMeshRendererFunc, addMaterialFunc),
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

let addCustomGeometryComponent =
    (gameObject, component, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      GameObjectAPI.addGameObjectCustomGeometryComponent(
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
      GameObjectAPI.addGameObjectCustomGeometryComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  };

let addCameraGroupComponent =
    (gameObject, cameraGroup, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      engineState
      |> CameraGroupEngineService.addCameraGroupComponents(
           gameObject,
           cameraGroup,
           (
             GameObjectAPI.addGameObjectBasicCameraViewComponent,
             GameObjectAPI.addGameObjectPerspectiveCameraProjectionComponent,
           ),
         ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.addComponentTypeToMap(
           gameObject,
           InspectorComponentType.CameraGroup,
         )
      |. Some,
      engineState
      |> CameraGroupEngineService.addCameraGroupComponents(
           gameObject,
           cameraGroup,
           (
             GameObjectAPI.addGameObjectBasicCameraViewComponent,
             GameObjectAPI.addGameObjectPerspectiveCameraProjectionComponent,
           ),
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

let disposeRenderGroupComponent =
    (
      gameObject,
      renderRecord,
      (removeMeshRendererFunc, removeMaterialFunc),
      (editorState, engineState),
    ) =>
  switch (editorState) {
  | None => (
      None,
      engineState
      |> RenderGroupEngineService.disposeRenderGroupComponents(
           gameObject,
           renderRecord,
           (removeMeshRendererFunc, removeMaterialFunc),
         ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.removeComponentTypeToMap(
           gameObject,
           InspectorComponentType.RenderGroup,
         )
      |. Some,
      engineState
      |> RenderGroupEngineService.disposeRenderGroupComponents(
           gameObject,
           renderRecord,
           (removeMeshRendererFunc, removeMaterialFunc),
         ),
    )
  };

let disposeCameraGroupComponent =
    (gameObject, cameraGroup, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      engineState
      |> CameraGroupEngineService.disposeCameraGroupComponents(
           gameObject,
           cameraGroup,
           (
             GameObjectAPI.disposeGameObjectBasicCameraViewComponent,
             GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent,
           ),
         ),
    )
  | Some(editorState) => (
      editorState
      |> InspectorEditorService.removeComponentTypeToMap(
           gameObject,
           InspectorComponentType.CameraGroup,
         )
      |. Some,
      engineState
      |> CameraGroupEngineService.disposeCameraGroupComponents(
           gameObject,
           cameraGroup,
           (
             GameObjectAPI.disposeGameObjectBasicCameraViewComponent,
             GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent,
           ),
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
           InspectorComponentType.Light,
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
           InspectorComponentType.ArcballCameraController,
         )
      |. Some,
      GameObjectAPI.disposeGameObjectArcballCameraControllerComponent(
        gameObject,
        component,
        engineState,
      ),
    )
  };