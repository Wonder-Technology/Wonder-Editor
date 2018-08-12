open Wonderjs;

let createEmptyGameObjectForEditEngineState = engineState => {
  let (engineState, obj) =
    GameObjectLogicService.createGameObjectForEditEngineState(engineState);

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("gameObject", obj);

  (engineState, obj);
};
let createEmptyGameObjectForRunEngineState = (editorState, engineState) => {
  let (editorState, (engineState, obj)) =
    GameObjectLogicService.createGameObjectForRunEngineState((editorState, engineState));

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("gameObject", obj);

  (editorState, engineState, obj);
};

let createBoxForEditEngineState = engineState => {
  let (engineState, obj) =
    GameObjectLogicService.createGameObjectForEditEngineState(engineState);
  let (engineState, geometry) =
    GeometryEngineService.createBoxGeometry(engineState);
  let (engineState, renderGroup) =
    RenderGroupEngineService.createRenderGroup(
      (MeshRendererEngineService.create, LightMaterialEngineService.create),
      engineState,
    );

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("cube", obj)
    |> GameObjectLogicService.addGeometryForEditEngineState(obj, geometry)
    |> GameObjectLogicService.addRenderGroupForEditEngineState(
         obj,
         renderGroup,
         (
           GameObjectAPI.addGameObjectMeshRendererComponent,
           GameObjectAPI.addGameObjectLightMaterialComponent,
         ),
       );

  (engineState, obj);
};
let createBoxForRunEngineState = (editorState, engineState) => {
  let (editorState, (engineState, obj)) =
    GameObjectLogicService.createGameObjectForRunEngineState((editorState, engineState));
  let (engineState, geometry) =
    GeometryEngineService.createBoxGeometry(engineState);
  let (engineState, renderGroup) =
    RenderGroupEngineService.createRenderGroup(
      (MeshRendererEngineService.create, LightMaterialEngineService.create),
      engineState,
    );

  let engineState =
    engineState |> GameObjectEngineService.setGameObjectName("cube", obj);

  let (editorState, engineState) =
    (editorState, engineState)
    |> GameObjectLogicService.addGeometryForRunEngineState(
         obj,
         geometry,
       )
    |> GameObjectLogicService.addRenderGroupForRunEngineState(
         obj,
         renderGroup,
         (
           GameObjectAPI.addGameObjectMeshRendererComponent,
           GameObjectAPI.addGameObjectLightMaterialComponent,
         ),
       );

  (editorState, engineState, obj);
};

let createDirectionLightForEditEngineState = engineState => {
  let (engineState, obj) =
    GameObjectLogicService.createGameObjectForEditEngineState(engineState);
  let (engineState, directionLight) =
    DirectionLightEngineService.create(engineState);

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("Direction Light", obj)
    |> GameObjectLogicService.addDirectionLightForEditEngineState(obj, directionLight);

  (engineState, obj);
};
let createDirectionLightForRunEngineState = (editorState, engineState) => {
  let (editorState, (engineState, obj)) =
    GameObjectLogicService.createGameObjectForRunEngineState((editorState, engineState));
  let (engineState, directionLight) =
    DirectionLightEngineService.create(engineState);

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("Direction Light", obj);

  let (editorState, engineState) =
    (editorState, engineState)
    |> GameObjectLogicService.addDirectionLightForRunEngineState(obj, directionLight);

  (editorState, engineState, obj);
};