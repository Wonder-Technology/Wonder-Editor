open Wonderjs;

let createEmptyGameObject = (editorState, engineState) => {
  let (editorState, (engineState, obj)) =
    GameObjectLogicService.createGameObject((editorState, engineState));

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("gameObject", obj);

  (editorState, engineState, obj);
};

let createBox = (cubeGeometry, editorState, engineState) => {
  let (editorState, (engineState, obj)) =
    GameObjectLogicService.createGameObject((editorState, engineState));
  let (engineState, renderGroup) =
    RenderGroupEngineService.createRenderGroup(
      (MeshRendererEngineService.create, LightMaterialEngineService.create),
      engineState,
    );

  let engineState =
    engineState |> GameObjectEngineService.setGameObjectName("cube", obj);

  let (editorState, engineState) =
    (editorState, engineState)
    |> GameObjectLogicService.addGeometry(obj, cubeGeometry)
    |> GameObjectLogicService.addRenderGroup(
         obj,
         renderGroup,
         (
           GameObjectAPI.addGameObjectMeshRendererComponent,
           GameObjectAPI.addGameObjectLightMaterialComponent,
         ),
       );

  (editorState, engineState, obj);
};

let createDirectionLight = (editorState, engineState) => {
  let (editorState, (engineState, obj)) =
    GameObjectLogicService.createGameObject((editorState, engineState));
  let (engineState, directionLight) =
    DirectionLightEngineService.create(engineState);

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("Direction Light", obj);

  let (editorState, engineState) =
    (editorState, engineState)
    |> GameObjectLogicService.addDirectionLight(obj, directionLight);

  (editorState, engineState, obj);
};