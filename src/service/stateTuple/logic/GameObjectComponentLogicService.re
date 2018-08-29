open InspectorComponentType;

let getAllComponentArray = () => [|
  {
    componentType: Transform,
    hasComponentFunc: GameObjectComponentEngineService.hasTransformComponent,
  },
  {
    componentType: RenderGroup,
    hasComponentFunc: InspectorRenderGroupUtils.hasRenderGroupComponents,
  },
  {
    componentType: Geometry,
    hasComponentFunc: GameObjectComponentEngineService.hasGeometryComponent,
  },
  {
    componentType: ArcballCameraController,
    hasComponentFunc: GameObjectComponentEngineService.hasArcballCameraControllerComponent,
  },
  {
    componentType: CameraGroup,
    hasComponentFunc: CameraEngineService.hasCameraGroup,
  },
  {
    componentType: Light,
    hasComponentFunc: LightEngineService.hasLightComponent,
  },
|];

let _storeGameObjectComponentInComponentTypeMap =
    (gameObject, engineState, editorState) =>
  getAllComponentArray()
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. editorState, {componentType, hasComponentFunc}) =>
         engineState |> hasComponentFunc(gameObject) ?
           editorState
           |> InspectorEditorService.addComponentTypeToMap(
                gameObject,
                componentType,
              ) :
           editorState,
       editorState,
     );

let getGameObjectComponentStoreInComponentTypeMap =
    (gameObjectArr, runEngineState, editorState) => {
  let rec _iterateGameObject = (gameObjectArr, engineState, editorState) =>
    gameObjectArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. editorState, gameObject) => {
           let editorState =
             _storeGameObjectComponentInComponentTypeMap(
               gameObject,
               engineState,
               editorState,
             );

           _iterateGameObject(
             engineState |> GameObjectUtils.getChildren(gameObject),
             engineState,
             editorState,
           );
         },
         editorState,
       );

  _iterateGameObject(gameObjectArr, runEngineState, editorState);
};
