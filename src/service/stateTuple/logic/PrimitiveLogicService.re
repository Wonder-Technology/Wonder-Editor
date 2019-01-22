open Wonderjs;

let createEmptyGameObject = (editorState, engineState) => {
  let (editorState, (engineState, obj)) =
    GameObjectLogicService.createGameObject((editorState, engineState));

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("GameObject", obj);

  (editorState, engineState, obj);
};

let _create3DGameObject =
    ((name, geometry, lightMaterial), (editorState, engineState)) => {
  let (editorState, (engineState, obj)) =
    GameObjectLogicService.createGameObject((editorState, engineState));

  let transform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      obj,
      engineState,
    );

  let engineState =
    engineState
    |> TransformEngineService.setLocalScale((1., 1., 1.), transform);

  let (engineState, meshRenderer) =
    MeshRendererEngineService.create(engineState);
  let renderGroup =
    RenderGroupEngineService.buildRenderGroup(meshRenderer, lightMaterial);

  let engineState =
    engineState |> GameObjectEngineService.setGameObjectName(name, obj);

  let (editorState, engineState) =
    (editorState, engineState)
    |> GameObjectLogicService.addRenderGroup(
         obj,
         renderGroup,
         (
           GameObjectAPI.addGameObjectMeshRendererComponent,
           GameObjectAPI.addGameObjectLightMaterialComponent,
         ),
       )
    |> GameObjectLogicService.addGeometry(obj, geometry);

  (editorState, engineState, obj);
};
let createCube = ((cubeGeometry, lightMaterial), editorState, engineState) =>
  _create3DGameObject(
    ("Cube", cubeGeometry, lightMaterial),
    (editorState, engineState),
  );

let createSphere =
    ((sphereGeometry, lightMaterial), editorState, engineState) =>
  _create3DGameObject(
    ("Sphere", sphereGeometry, lightMaterial),
    (editorState, engineState),
  );

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