let createEmptyGameObject = (editorState, engineState) => {
  let (editorState, (engineState, obj)) =
    GameObjectLogicService.createGameObject((editorState, engineState));

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("gameObject", obj);

  (editorState, engineState, obj);
};
let createBox = (editorState, engineState) => {
  let (editorState, (engineState, obj)) =
    GameObjectLogicService.createGameObject((editorState, engineState));
  let (engineState, material) =
    LightMaterialEngineService.create(engineState);
  let (engineState, meshRenderer) =
    MeshRendererEngineService.create(engineState);
  let (engineState, geometry) =
    GeometryEngineService.createBoxGeometry(engineState);

  let engineState =
    engineState |> GameObjectEngineService.setGameObjectName("cube", obj);

  let (editorState, engineState) =
    (editorState, engineState)
    |> GameObjectLogicService.addLightMaterialComponent(obj, material)
    |> GameObjectLogicService.addBoxGeometryComponent(obj, geometry)
    |> GameObjectLogicService.addMeshRendererComponent(obj, meshRenderer);

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
    |> GameObjectLogicService.addDirectionLightComponent(obj, directionLight);

  (editorState, engineState, obj);
};