let _isSelectScaleAxisGizmo = (scaleAxisGizmo, ray, engineState, editorState) =>
  SelectTranslationGizmoUtils.isSelectTranslationAxisGizmo(
    scaleAxisGizmo,
    ray,
    engineState,
    editorState,
  );

let _isSelectScaleCenterBoxGizmo =
    (scaleCenterBoxGizmo, ray, engineState, editorState) =>
  SelectTranslationGizmoUtils.isIntersectMesh(
    scaleCenterBoxGizmo,
    ray,
    engineState,
  );

let _selectAxisGizmo =
    (
      ray,
      (
        setCurrentGizmoColorFunc,
        onlySelectScaleAxisGizmoFunc,
        getDragStartPointInLocalCoordinateSystemFunc,
      ),
      (editorState, engineState),
    ) => {
  let editorState = editorState |> onlySelectScaleAxisGizmoFunc;

  let engineState = setCurrentGizmoColorFunc(editorState, engineState);

  let dragStartPointInLocalCoordinateSystem =
    getDragStartPointInLocalCoordinateSystemFunc(
      ray,
      (editorState, engineState),
    );

  editorState
  |> AxisScaleGizmoSceneViewEditorService.setDragStartPointInLocalCoordinateSystem(
       dragStartPointInLocalCoordinateSystem,
     );
};

let _selectCenterBoxGizmo =
    (event, setCurrentGizmoColorFunc, (editorState, engineState)) => {
  let editorState =
    editorState
    |> SelectScaleGizmoSceneViewEditorService.onlySelectScaleCenterBoxGizmo;

  let engineState = setCurrentGizmoColorFunc(editorState, engineState);

  editorState
  |> CenterBoxScaleGizmoSceneViewEditorService.setDragStartMouseLocation(
       CenterBoxUtils.getDragStartMouseLocationInViewForCenterBox(event),
     );
};

let _handleSelectAxisGizmo = (ray, editorState, engineState) =>
  _isSelectScaleAxisGizmo(
    OperateScaleGizmoSceneViewEditorService.unsafeGetScaleXAxisGizmo(
      editorState,
    ),
    ray,
    engineState,
    editorState,
  ) ?
    _selectAxisGizmo(
      ray,
      (
        CurrentTransformGizmosUtils.setCurrentGizmoColor(
          GameObjectEngineService.getAllBasicMaterials(
            HierarchyGameObjectEngineService.getAllGameObjects(
              OperateScaleGizmoSceneViewEditorService.unsafeGetScaleXAxisGizmo(
                editorState,
              ),
              engineState,
            ),
            engineState,
          ),
        ),
        SelectScaleGizmoSceneViewEditorService.onlySelectScaleXAxisGizmo,
        AxisScaleGizmoUtils.getIntersectedPointWithAxisInLocalCoordinateSystemForXAxis,
      ),
      (editorState, engineState),
    ) :
    _isSelectScaleAxisGizmo(
      OperateScaleGizmoSceneViewEditorService.unsafeGetScaleYAxisGizmo(
        editorState,
      ),
      ray,
      engineState,
      editorState,
    ) ?
      _selectAxisGizmo(
        ray,
        (
          CurrentTransformGizmosUtils.setCurrentGizmoColor(
            GameObjectEngineService.getAllBasicMaterials(
              HierarchyGameObjectEngineService.getAllGameObjects(
                OperateScaleGizmoSceneViewEditorService.unsafeGetScaleYAxisGizmo(
                  editorState,
                ),
                engineState,
              ),
              engineState,
            ),
          ),
          SelectScaleGizmoSceneViewEditorService.onlySelectScaleYAxisGizmo,
          AxisScaleGizmoUtils.getIntersectedPointWithAxisInLocalCoordinateSystemForYAxis,
        ),
        (editorState, engineState),
      ) :
      _isSelectScaleAxisGizmo(
        OperateScaleGizmoSceneViewEditorService.unsafeGetScaleZAxisGizmo(
          editorState,
        ),
        ray,
        engineState,
        editorState,
      ) ?
        _selectAxisGizmo(
          ray,
          (
            CurrentTransformGizmosUtils.setCurrentGizmoColor(
              GameObjectEngineService.getAllBasicMaterials(
                HierarchyGameObjectEngineService.getAllGameObjects(
                  OperateScaleGizmoSceneViewEditorService.unsafeGetScaleZAxisGizmo(
                    editorState,
                  ),
                  engineState,
                ),
                engineState,
              ),
            ),
            SelectScaleGizmoSceneViewEditorService.onlySelectScaleZAxisGizmo,
            AxisScaleGizmoUtils.getIntersectedPointWithAxisInLocalCoordinateSystemForZAxis,
          ),
          (editorState, engineState),
        ) :
        editorState
        |> SelectScaleGizmoSceneViewEditorService.markNotSelectAnyScaleGizmo;

let _handleSelectCenterBoxGizmo =
    (event, ray, handleSelectAxisGizmoFunc, editorState, engineState) =>
  _isSelectScaleCenterBoxGizmo(
    OperateScaleGizmoSceneViewEditorService.unsafeGetScaleCenterBoxGizmo(
      editorState,
    ),
    ray,
    engineState,
    editorState,
  ) ?
    _selectCenterBoxGizmo(
      event,
      CurrentTransformGizmosUtils.setCurrentGizmoColor(
        GameObjectEngineService.getAllBasicMaterials(
          HierarchyGameObjectEngineService.getAllGameObjects(
            OperateScaleGizmoSceneViewEditorService.unsafeGetScaleCenterBoxGizmo(
              editorState,
            ),
            engineState,
          ),
          engineState,
        ),
      ),
      (editorState, engineState),
    ) :
    handleSelectAxisGizmoFunc(ray, editorState, engineState);

let selectScaleGizmo = (event, engineState, editorState) => {
  let cameraGameObject =
    SceneViewEditorService.unsafeGetEditCamera(editorState);

  let ray =
    RayUtils.createPerspectiveCameraRayFromEvent(
      event,
      cameraGameObject,
      (editorState, engineState),
    );

  _handleSelectCenterBoxGizmo(
    event,
    ray,
    _handleSelectAxisGizmo,
    editorState,
    engineState,
  );
};