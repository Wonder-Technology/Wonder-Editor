open Wonderjs;

let createEmptyGameObject = (editorState, engineState) => {
  let (editorState, (engineState, obj)) =
    GameObjectLogicService.createGameObject((editorState, engineState));

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("GameObject", obj);

  (editorState, engineState, obj);
};

let createCube = ((cubeGeometry, lightMaterial), editorState, engineState) => {
  let (editorState, (engineState, obj)) =
    GameObjectLogicService.createGameObject((editorState, engineState));

  let (engineState, meshRenderer) =
    MeshRendererEngineService.create(engineState);
  let renderGroup =
    RenderGroupEngineService.buildRenderGroup(meshRenderer, lightMaterial);

  let engineState =
    engineState |> GameObjectEngineService.setGameObjectName("Cube", obj);

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