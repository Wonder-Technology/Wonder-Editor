let _createAxisGizmo = (color, engineState) => {
  let (engineState, axisGameObject) =
    GameObjectEngineService.create(engineState);

  let (engineState, boxGeometry) =
    GeometryEngineService.createCubeGeometry(engineState);

  let (engineState, cylinderGeometry) =
    GeometryEngineService.createCylinderGeometry(
      0.1,
      0.1,
      5.,
      5,
      5,
      engineState,
    );

  let (engineState, boxGameObject, boxMaterial, boxMeshRenderer) =
    engineState
    |> CreateTransformGizmosUtils.createBasicGameObject(boxGeometry);

  let (
    engineState,
    cylinderGameObject,
    cylinderMaterial,
    cylinderMeshRenderer,
  ) =
    engineState
    |> CreateTransformGizmosUtils.createBasicGameObject(cylinderGeometry);

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("box", boxGameObject)
    |> GameObjectEngineService.setGameObjectName("line", cylinderGameObject);

  let engineState =
    engineState
    |> BasicMaterialEngineService.setColor(color, boxMaterial)
    |> MeshRendererEngineService.setMeshRendererIsRender(
         boxMeshRenderer,
         false,
       )
    |> BasicMaterialEngineService.setColor(color, cylinderMaterial)
    |> MeshRendererEngineService.setMeshRendererIsRender(
         cylinderMeshRenderer,
         false,
       );

  let engineState =
    engineState
    |> TransformGameObjectEngineService.setLocalPosition(
         cylinderGameObject,
         (0., 2.5, 0.),
       )
    |> TransformGameObjectEngineService.setLocalPosition(
         boxGameObject,
         (0., 5.5, 0.),
       );

  let engineState =
    engineState
    |> HierarchyGameObjectEngineService.addChild(
         axisGameObject,
         boxGameObject,
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

let _createAxisGizmos = engineState => {
  let (engineState, xAxisGizmo, xAxisTransform) =
    _createAxisGizmo(
      DataScaleGizmoSceneViewEditorService.getXAxisColor(),
      engineState,
    );
  let (engineState, yAxisGizmo, yAxisTransform) =
    _createAxisGizmo(
      DataScaleGizmoSceneViewEditorService.getYAxisColor(),
      engineState,
    );

  let (engineState, zAxisGizmo, zAxisTransform) =
    _createAxisGizmo(
      DataScaleGizmoSceneViewEditorService.getZAxisColor(),
      engineState,
    );

  let engineState =
    engineState
    |> TransformEngineService.setLocalEulerAngles(
         (0., 0., (-90.)),
         xAxisTransform,
       )
    |> TransformEngineService.setLocalEulerAngles(
         (90., 0., 0.),
         zAxisTransform,
       );

  (engineState, (xAxisGizmo, yAxisGizmo, zAxisGizmo));
};

let _createCenterBoxGizmo = engineState => {
  let (engineState, boxGameObject) =
    GameObjectEngineService.create(engineState);

  let (engineState, boxGeometry) =
    GeometryEngineService.createCubeGeometry(engineState);

  let (engineState, boxGameObject, boxMaterial, boxMeshRenderer) =
    engineState
    |> CreateTransformGizmosUtils.createBasicGameObject(boxGeometry);

  let engineState =
    engineState
    |> BasicMaterialEngineService.setColor(
         DataScaleGizmoSceneViewEditorService.getCenterBoxColor(),
         boxMaterial,
       )
    |> MeshRendererEngineService.setMeshRendererIsRender(
         boxMeshRenderer,
         false,
       );

  (engineState, boxGameObject);
};

let createScaleGizmos = engineState => {
  let (engineState, (xAxisGizmo, yAxisGizmo, zAxisGizmo)) =
    _createAxisGizmos(engineState);

  let (engineState, centerBoxGizmo) = _createCenterBoxGizmo(engineState);

  let (engineState, wholeGizmo) =
    GameObjectEngineService.create(engineState);

  let engineState =
    engineState
    |> HierarchyGameObjectEngineService.addChild(wholeGizmo, xAxisGizmo)
    |> HierarchyGameObjectEngineService.addChild(wholeGizmo, yAxisGizmo)
    |> HierarchyGameObjectEngineService.addChild(wholeGizmo, zAxisGizmo)
    |> HierarchyGameObjectEngineService.addChild(wholeGizmo, centerBoxGizmo);

  (
    engineState,
    wholeGizmo,
    (xAxisGizmo, yAxisGizmo, zAxisGizmo),
    centerBoxGizmo,
  );
};