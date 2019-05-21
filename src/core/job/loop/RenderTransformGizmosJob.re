let _getTranslationAxisGameObjects = (editorState, engineState) =>
  ArrayService.fastMutableConcatArrays([|
    HierarchyGameObjectEngineService.getAllGameObjects(
      OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
        editorState,
      ),
      engineState,
    ),
    HierarchyGameObjectEngineService.getAllGameObjects(
      OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
        editorState,
      ),
      engineState,
    ),
    HierarchyGameObjectEngineService.getAllGameObjects(
      OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
        editorState,
      ),
      engineState,
    ),
  |]);

let _getTranslationPlaneGameObjects = (editorState, engineState) =>
  ArrayService.fastMutableConcatArrays([|
    HierarchyGameObjectEngineService.getAllGameObjects(
      OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXYPlaneGizmo(
        editorState,
      ),
      engineState,
    ),
    HierarchyGameObjectEngineService.getAllGameObjects(
      OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXZPlaneGizmo(
        editorState,
      ),
      engineState,
    ),
    HierarchyGameObjectEngineService.getAllGameObjects(
      OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYZPlaneGizmo(
        editorState,
      ),
      engineState,
    ),
  |]);

let _renderTransformGameObjects =
    ((prepareGlStateFunc, renderFunc, restoreGlStateFunc), engineState) => {
  let gl = DeviceManagerEngineService.unsafeGetGl(engineState);

  let engineState = engineState |> prepareGlStateFunc;

  let engineState = renderFunc(gl, engineState);

  let engineState = engineState |> restoreGlStateFunc;

  engineState;
};

let _renderTranslationGizmos = (editorState, engineState) => {
  let translationAxisGameObjects =
    _getTranslationAxisGameObjects(editorState, engineState);

  let translationPlaneGameObjects =
    _getTranslationPlaneGameObjects(editorState, engineState);

  engineState
  |> _renderTransformGameObjects((
       RenderTranslationGizmosUtils.prepareTranslationAxisGlState,
       RenderTranslationGizmosUtils.render(
         RenderTranslationGizmosUtils.getRenderDataArr(
           translationAxisGameObjects,
           engineState,
         ),
       ),
       RenderTranslationGizmosUtils.restoreTranslationAxisGlState,
     ))
  |> _renderTransformGameObjects((
       RenderTranslationGizmosUtils.prepareTranslationPlaneGlState,
       RenderTranslationGizmosUtils.render(
         RenderTranslationGizmosUtils.getRenderDataArr(
           translationPlaneGameObjects,
           engineState,
         ),
       ),
       RenderTranslationGizmosUtils.restoreTranslationPlaneGlState,
     ));
};

let _getRotationGameObjectData = editorState => [|
  (
    OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXYCircleGizmo(
      editorState,
    ),
    SceneViewType.XYCircle,
  ),
  (
    OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXZCircleGizmo(
      editorState,
    ),
    SceneViewType.XZCircle,
  ),
  (
    OperateRotationGizmoSceneViewEditorService.unsafeGetRotationYZCircleGizmo(
      editorState,
    ),
    SceneViewType.YZCircle,
  ),
|];

let _renderRotationGizmos = (editorState, engineState) =>
  engineState
  |> _renderTransformGameObjects((
       RenderRotationGizmosUtils.prepareRotationGlState,
       RenderRotationGizmosUtils.render(
         editorState,
         RenderRotationGizmosUtils.getRenderDataArr(
           _getRotationGameObjectData(editorState),
           engineState,
         ),
       ),
       RenderRotationGizmosUtils.restoreRotationGlState,
     ));

let _getScaleGameObjects = (editorState, engineState) =>
  ArrayService.fastMutableConcatArrays([|
    HierarchyGameObjectEngineService.getAllGameObjects(
      OperateScaleGizmoSceneViewEditorService.unsafeGetScaleXAxisGizmo(
        editorState,
      ),
      engineState,
    ),
    HierarchyGameObjectEngineService.getAllGameObjects(
      OperateScaleGizmoSceneViewEditorService.unsafeGetScaleYAxisGizmo(
        editorState,
      ),
      engineState,
    ),
    HierarchyGameObjectEngineService.getAllGameObjects(
      OperateScaleGizmoSceneViewEditorService.unsafeGetScaleZAxisGizmo(
        editorState,
      ),
      engineState,
    ),
    [|
      OperateScaleGizmoSceneViewEditorService.unsafeGetScaleCenterBoxGizmo(
        editorState,
      ),
    |],
  |]);

let _renderScaleGizmos = (editorState, engineState) => {
  let scaleGameObjects = _getScaleGameObjects(editorState, engineState);

  engineState
  |> _renderTransformGameObjects((
       RenderScaleGizmosUtils.prepareScaleGlState,
       RenderScaleGizmosUtils.render(
         RenderScaleGizmosUtils.getRenderDataArr(
           scaleGameObjects,
           engineState,
         ),
       ),
       RenderScaleGizmosUtils.restoreScaleGlState,
     ));
};

let renderJob = (_, engineState) => {
  open SceneViewType;

  let editorState = StateEditorService.getState();

  IsTransformGizmoRenderSceneViewEditorService.isTransformGizmoRender(
    editorState,
    engineState,
  ) ?
    {
      let currentSceneTreeNode =
        SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState);

      switch (
        CurrentTransformGizmoSceneViewEditorService.getCurrentGizmoType(
          editorState,
        )
      ) {
      | Translation => _renderTranslationGizmos(editorState, engineState)
      | Rotation => _renderRotationGizmos(editorState, engineState)
      | Scale => _renderScaleGizmos(editorState, engineState)
      };
    } :
    engineState;
};