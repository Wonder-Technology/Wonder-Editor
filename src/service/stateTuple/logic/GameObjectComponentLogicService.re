open InspectorComponentType;

let buildAllComponentArray = () => [|
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

let _setGameObjectComponentInComponentTypeMap =
    (gameObject, gameObjectAllComponentArray, engineState, editorState) =>
  gameObjectAllComponentArray
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

let setGameObjectArrComponentTypeMap =
    (gameObjectArr, gameObjectAllComponentArray, engineState, editorState) => {
  let rec _iterateGameObject = (gameObjectArr, engineState, editorState) =>
    gameObjectArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. editorState, gameObject) => {
           let editorState =
             _setGameObjectComponentInComponentTypeMap(
               gameObject,
               gameObjectAllComponentArray,
               engineState,
               editorState,
             );

           _iterateGameObject(
             engineState |> HierarchyGameObjectEngineService.getChildren(gameObject),
             engineState,
             editorState,
           );
         },
         editorState,
       );

  _iterateGameObject(gameObjectArr, engineState, editorState);
};