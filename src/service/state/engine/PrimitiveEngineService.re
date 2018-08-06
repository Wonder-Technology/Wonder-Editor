open Wonderjs;
let createEmptyGameObject = (editorState, engineState) => {
  let (editorState, (engineState, obj)) =
    GameObjectLogicService.createGameObject((editorState, engineState));

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("gameObject", obj);

  (editorState, engineState, obj);
};

/* let createRenderGroup = ((addMeshRendererFunc, addMaterialFunc), engineState) =>
   engineState
   |> RenderGroupEngineService.createRenderGroup((
        addMeshRendererFunc,
        addMaterialFunc,
      )); */

let createBox = (editorState, engineState) => {
  let (editorState, (engineState, obj)) =
    GameObjectLogicService.createGameObject((editorState, engineState));
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
    |> GameObjectLogicService.addGeometryComponent(obj, geometry)
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
    |> GameObjectLogicService.addDirectionLightComponent(obj, directionLight);

  (editorState, engineState, obj);
};