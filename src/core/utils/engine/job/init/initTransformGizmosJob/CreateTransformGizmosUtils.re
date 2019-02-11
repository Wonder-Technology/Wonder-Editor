let createBasicGameObject = (geometry, engineState) => {
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

let setToEditorState =
    (
      (
        translationWholeGizmo,
        (xAxisGizmo, yAxisGizmo, zAxisGizmo),
        (xyPlaneGizmo, xzPlaneGizmo, yzPlaneGizmo),
      ),
      (rotationWholeGizmo, (yzGizmo, xzGizmo, xyGizmo)),
      (
        scaleWholeGizmo,
        (xAxisScaleGizmo, yAxisScaleGizmo, zAxisScaleGizmo),
        centerBoxScaleGizmo,
      ),
      editorState: EditorType.editorState,
    )
    : EditorType.editorState => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        currentGizmoType: Translation,
        coordinateSystem: World,
        translationGizmoData: {
          translationWholeGizmo,
          translationXAxisGizmo: xAxisGizmo,
          translationYAxisGizmo: yAxisGizmo,
          translationZAxisGizmo: zAxisGizmo,
          translationXYPlaneGizmo: xyPlaneGizmo,
          translationXZPlaneGizmo: xzPlaneGizmo,
          translationYZPlaneGizmo: yzPlaneGizmo,
          isTranslationXAxisGizmoSelected: false,
          isTranslationYAxisGizmoSelected: false,
          isTranslationZAxisGizmoSelected: false,
          isTranslationXYPlaneGizmoSelected: false,
          isTranslationXZPlaneGizmoSelected: false,
          isTranslationYZPlaneGizmoSelected: false,
          currentSceneTreeNodeStartPoint: None,
          axisGameObjectStartPoint: None,
          dragStartPoint: None,
          currentSceneTreeNodeStartLocalPosition: None,
        },
        rotationGizmoData: {
          rotationWholeGizmo,
          rotationXZCircle: xzGizmo,
          rotationXYCircle: xyGizmo,
          rotationYZCircle: yzGizmo,
          isXZCircleGizmoSelected: false,
          isXYCircleGizmoSelected: false,
          isYZCircleGizmoSelected: false,
          dragStartPoint: None,
          lastTotalAngle: None,
          currentSceneTreeNodeStartLocalEulerAngles: None,
        },
        scaleGizmoData: {
          scaleWholeGizmo,
          scaleXAxisGizmo: xAxisScaleGizmo,
          scaleYAxisGizmo: yAxisScaleGizmo,
          scaleZAxisGizmo: zAxisScaleGizmo,
          scaleCenterBoxGizmo: centerBoxScaleGizmo,
          isScaleXAxisGizmoSelected: false,
          isScaleYAxisGizmoSelected: false,
          isScaleZAxisGizmoSelected: false,
          isScaleCenterBoxGizmoSelected: false,
          dragStartMouseLocation: None,
          dragStartPointInLocalCoordinateSystem: None,
          currentSceneTreeNodeStartLocalScale: None,
        },
      }),
  },
};