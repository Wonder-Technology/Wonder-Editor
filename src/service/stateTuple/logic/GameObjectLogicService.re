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

let disposeRenderGroupForEditEngineState =
    (gameObject, materialType, engineState) =>
  engineState
  |> InspectorRenderGroupUtils.disposeRenderGroup(gameObject, materialType);

let disposeRenderGroupForRunEngineState =
    (gameObject, materialType, (editorState, engineState)) => (
  editorState
  |> InspectorEditorService.removeComponentTypeToMap(
       gameObject,
       InspectorComponentType.RenderGroup,
     ),
  engineState
  |> InspectorRenderGroupUtils.disposeRenderGroup(gameObject, materialType),
);

let disposeGeometryForEditEngineState = GameObjectComponentEngineService.disposeGeometryComponent;

let disposeGeometryForRunEngineState =
    (gameObject, geometryComponent , (editorState, engineState)) => (
  editorState
  |> InspectorEditorService.removeComponentTypeToMap(
       gameObject,
       InspectorComponentType.Geometry
     ),
  engineState
  |> GameObjectComponentEngineService.disposeGeometryComponent(
       gameObject,
       geometryComponent
     ),
);



let disposeCameraGroupForEditEngineState =
    (gameObject, cameraGroup, engineState) =>
  engineState
  |> CameraGroupEngineService.disposeCameraGroupComponents(
       gameObject,
       cameraGroup,
       (
         GameObjectAPI.disposeGameObjectBasicCameraViewComponent,
         GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent,
       ),
     );

let disposeCameraGroupForRunEngineState =
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

let disposeDirectionLightForEditEngineState =
    (gameObject, component, engineState) =>
  GameObjectAPI.disposeGameObjectDirectionLightComponent(
    gameObject,
    component,
    engineState,
  );

let disposeDirectionLightForRunEngineState =
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

let disposePointLightForEditEngineState = (gameObject, component, engineState) =>
  GameObjectAPI.disposeGameObjectPointLightComponent(
    gameObject,
    component,
    engineState,
  );

let disposePointLightForRunEngineState =
    (gameObject, component, (editorState, engineState)) => (
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

let disposeArcballCameraControllerForEditEngineState =
    (gameObject, component, engineState) =>
  GameObjectAPI.disposeGameObjectArcballCameraControllerComponent(
    gameObject,
    component,
    engineState,
  );

let disposeArcballCameraControllerForRunEngineState =
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