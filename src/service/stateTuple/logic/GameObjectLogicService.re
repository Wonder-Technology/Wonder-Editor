open Wonderjs;

let createGameObjectForEditEngineState = engineState =>
  engineState |> GameObjectAPI.createGameObject;

let createGameObjectForRunEngineState = ((editorState, engineState)) => {
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

let addRenderGroupForEditEngineState =
    (
      gameObject,
      renderGroup,
      (addMeshRendererFunc, addMaterialFunc),
      engineState,
    ) =>
  engineState
  |> RenderGroupEngineService.addRenderGroupComponents(
       gameObject,
       renderGroup,
       (addMeshRendererFunc, addMaterialFunc),
     );

let addRenderGroupForRunEngineState =
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

let addGeometryForEditEngineState = (gameObject, component, engineState) =>
  GameObjectAPI.addGameObjectGeometryComponent(
    gameObject,
    component,
    engineState,
  );

let addGeometryForRunEngineState =
    (gameObject, component, (editorState, engineState)) => (
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

let addGeometryForEditEngineState = (gameObject, component, engineState) =>
  GameObjectAPI.addGameObjectGeometryComponent(
    gameObject,
    component,
    engineState,
  );

let addGeometryForRunEngineState =
    (gameObject, component, (editorState, engineState)) => (
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

let addCameraGroupForEditEngineState = (gameObject, cameraGroup, engineState) =>
  engineState
  |> CameraGroupEngineService.addCameraGroupComponents(
       gameObject,
       cameraGroup,
       (
         GameObjectAPI.addGameObjectBasicCameraViewComponent,
         GameObjectAPI.addGameObjectPerspectiveCameraProjectionComponent,
       ),
     );

let addCameraGroupForRunEngineState =
    (gameObject, cameraGroup, (editorState, engineState)) => (
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

let addDirectionLightForEditEngineState = (gameObject, component, engineState) =>
  GameObjectAPI.addGameObjectDirectionLightComponent(
    gameObject,
    component,
    engineState,
  );

let addDirectionLightForRunEngineState =
    (gameObject, component, (editorState, engineState)) => (
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

let addPointLightForEditEngineState = (gameObject, component, engineState) =>
  GameObjectAPI.addGameObjectPointLightComponent(
    gameObject,
    component,
    engineState,
  );

let addPointLightForRunEngineState =
    (gameObject, component, (editorState, engineState)) => (
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

let addArcballCameraControllerForEditEngineState =
    (gameObject, component, engineState) =>
  GameObjectAPI.addGameObjectArcballCameraControllerComponent(
    gameObject,
    component,
    engineState,
  );

let addArcballCameraControllerForRunEngineState =
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

let disposeRenderGroupComponent =
    (gameObject, materialType, (editorState, engineState)) =>
  switch (editorState) {
  | None => (
      None,
      engineState
      |> InspectorRenderGroupUtils.disposeRenderGroup(
           gameObject,
           materialType,
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
      |> InspectorRenderGroupUtils.disposeRenderGroup(
           gameObject,
           materialType,
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