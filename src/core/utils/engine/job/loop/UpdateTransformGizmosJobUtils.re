let _moveAndRotateTranslationWholeGizmoToCurrentSceneTreeNode =
    (currentGameObject, translationWholeGizmo, editorState, engineState) => {
  let currentGameObjectTransform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      currentGameObject,
      engineState,
    );
  let translationWholeGizmoTransform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      translationWholeGizmo,
      engineState,
    );

  engineState
  |> TransformEngineService.setPosition(
       translationWholeGizmoTransform,
       TransformEngineService.getPosition(
         currentGameObjectTransform,
         engineState,
       ),
     )
  |> TransformEngineService.setEulerAngles(
       translationWholeGizmoTransform,
       TransformEngineService.getEulerAngles(
         currentGameObjectTransform,
         engineState,
       ),
     );
};

let _computeScaleFactorBasedOnDistanceToCamera =
    (cameraPos, currentGameObjectPos) => {
  let factor = 0.03;

  Vector3Service.length(
    Wonderjs.Vector3Service.sub(
      Wonderjs.Vector3Type.Float,
      cameraPos,
      currentGameObjectPos,
    ),
  )
  *. factor;
};

let _scaleTranslationWholeGizmo =
    (currentGameObject, translationWholeGizmo, editorState, engineState) => {
  let cameraGameObject =
    SceneViewEditorService.unsafeGetEditCamera(editorState);

  let factor =
    _computeScaleFactorBasedOnDistanceToCamera(
      TransformGameObjectEngineService.getPosition(
        cameraGameObject,
        engineState,
      ),
      TransformGameObjectEngineService.getPosition(
        currentGameObject,
        engineState,
      ),
    );

  TransformGameObjectEngineService.setLocalScale(
    translationWholeGizmo,
    (factor, factor, factor),
    engineState,
  );
};

let updateTransformJob = (_, engineState) => {
  let editorState = StateEditorService.getState();

  IsTransformGizmoRenderSceneViewEditorService.isTranslationWholeGizmoRender(
    editorState,
  ) ?
    switch (SceneTreeEditorService.getCurrentSceneTreeNode(editorState)) {
    | None => engineState
    | Some(currentGameObject) =>
      let translationWholeGizmo =
        TransformGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
          editorState,
        );

      let engineState =
        engineState
        |> _moveAndRotateTranslationWholeGizmoToCurrentSceneTreeNode(
             currentGameObject,
             translationWholeGizmo,
             editorState,
           )
        |> _scaleTranslationWholeGizmo(
             currentGameObject,
             translationWholeGizmo,
             editorState,
           );
      /* |> JobEngineService.execUpdateTransformJob; */

      engineState;
    } :
    engineState;
};