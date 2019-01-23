let _createBasicGameObject = (geometry, engineState) => {
  let (engineState, gameObject) =
    GameObjectEngineService.create(engineState);

  let (engineState, renderGroup) =
    engineState
    |> RenderGroupEngineService.createRenderGroup((
         MeshRendererEngineService.create,
         BasicMaterialEngineService.create,
       ));

  (
    engineState
    |> GameObjectComponentEngineService.addGeometryComponent(
         gameObject,
         geometry,
       )
    |> RenderGroupEngineService.addRenderGroupComponents(
         gameObject,
         renderGroup,
         (
           GameObjectComponentEngineService.addMeshRendererComponent,
           GameObjectComponentEngineService.addBasicMaterialComponent,
         ),
       ),
    gameObject,
    renderGroup.material,
    renderGroup.meshRenderer,
  );
};

let _createTranslationAxisGameObject = (color, engineState) => {
  let (engineState, axisGameObject) =
    GameObjectEngineService.create(engineState);

  let (engineState, coneGameObject) =
    GameObjectEngineService.create(engineState);

  let (engineState, cylinderGameObject) =
    GameObjectEngineService.create(engineState);

  let (engineState, coneGeometry) =
    GeometryEngineService.createConeGeometry(0.5, 1., 10, 10, engineState);

  let (engineState, cylinderGeometry) =
    GeometryEngineService.createCylinderGeometry(
      0.1,
      0.1,
      5.,
      5,
      5,
      engineState,
    );

  let (engineState, coneGameObject, coneMaterial, coneMeshRenderer) =
    engineState |> _createBasicGameObject(coneGeometry);

  let (
    engineState,
    cylinderGameObject,
    cylinderMaterial,
    cylinderMeshRenderer,
  ) =
    engineState |> _createBasicGameObject(cylinderGeometry);

  let engineState =
    engineState
    |> BasicMaterialEngineService.setColor(color, coneMaterial)
    /* |> BasicMaterialEngineService.setIsDepthTest(false, coneMaterial) */
    |> MeshRendererEngineService.setMeshRendererIsRender(
         coneMeshRenderer,
         false,
       )
    |> BasicMaterialEngineService.setColor(color, cylinderMaterial)
    /* |> BasicMaterialEngineService.setIsDepthTest(false, cylinderMaterial) */
    |> MeshRendererEngineService.setMeshRendererIsRender(
         cylinderMeshRenderer,
         false,
       );

  let cylinderTransform =
    engineState
    |> GameObjectComponentEngineService.unsafeGetTransformComponent(
         cylinderGameObject,
       );

  let coneTransform =
    engineState
    |> GameObjectComponentEngineService.unsafeGetTransformComponent(
         coneGameObject,
       );

  let engineState =
    engineState
    |> TransformEngineService.setLocalPosition(
         (0., 2.5, 0.),
         cylinderTransform,
       )
    |> TransformEngineService.setLocalPosition((0., 5.5, 0.), coneTransform);

  let engineState =
    engineState
    |> HierarchyGameObjectEngineService.addChild(
         axisGameObject,
         coneGameObject,
       )
    |> HierarchyGameObjectEngineService.addChild(
         axisGameObject,
         cylinderGameObject,
       );

  (
    engineState,
    axisGameObject,
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      axisGameObject,
      engineState,
    ),
  );
};

let _createTransformGameObjects = engineState => {
  let (engineState, xAxisGameObject, xAxisTransform) =
    _createTranslationAxisGameObject([|1., 0., 0.|], engineState);
  let (engineState, yAxisGameObject, yAxisTransform) =
    _createTranslationAxisGameObject([|0., 1., 0.|], engineState);
  let (engineState, zAxisGameObject, zAxisTransform) =
    _createTranslationAxisGameObject([|0., 0., 1.|], engineState);

  let engineState =
    engineState
    |> TransformEngineService.setLocalEulerAngles(
         (0., 0., 90.),
         xAxisTransform,
       )
    |> TransformEngineService.setLocalEulerAngles(
         (90., 0., 0.),
         zAxisTransform,
       );

  let (engineState, wholeGameObject) =
    GameObjectEngineService.create(engineState);

  let engineState =
    engineState
    |> HierarchyGameObjectEngineService.addChild(
         wholeGameObject,
         xAxisGameObject,
       )
    |> HierarchyGameObjectEngineService.addChild(
         wholeGameObject,
         yAxisGameObject,
       )
    |> HierarchyGameObjectEngineService.addChild(
         wholeGameObject,
         zAxisGameObject,
       );

  (
    engineState,
    wholeGameObject,
    (xAxisGameObject, yAxisGameObject, zAxisGameObject),
  );
};

let _setToEditorState =
    (
      wholeGameObject,
      (xAxisGameObject, yAxisGameObject, zAxisGameObject),
      editorState: EditorType.editorState,
    )
    : EditorType.editorState => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGameObjectData:
      Some({
        translationWholeGameObject: wholeGameObject,
        translationXAxisGameObject: xAxisGameObject,
        translationYAxisGameObject: yAxisGameObject,
        translationZAxisGameObject: zAxisGameObject,
      }),
  },
};

let _bindEvent = () => {};

let initJob = (_, engineState) => {
  let (
    engineState,
    wholeGameObject,
    (xAxisGameObject, yAxisGameObject, zAxisGameObject),
  ) =
    _createTransformGameObjects(engineState);

  _setToEditorState(
    wholeGameObject,
    (xAxisGameObject, yAxisGameObject, zAxisGameObject),
  )
  |> StateLogicService.getAndSetEditorState;

  engineState;
};