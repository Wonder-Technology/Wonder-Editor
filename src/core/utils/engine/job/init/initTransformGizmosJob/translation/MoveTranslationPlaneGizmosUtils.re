let _isInPXPYPZ = ((x, y, z)) => x > 0. && y > 0. && z > 0.;

let _isInPXPYNZ = ((x, y, z)) => x > 0. && y > 0. && z <= 0.;

let _isInPXNYPZ = ((x, y, z)) => x > 0. && y <= 0. && z > 0.;

let _isInNXPYPZ = ((x, y, z)) => x <= 0. && y > 0. && z > 0.;

let _isInPXNYNZ = ((x, y, z)) => x > 0. && y <= 0. && z <= 0.;

let _isInNXPYNZ = ((x, y, z)) => x <= 0. && y > 0. && z <= 0.;

let _isInNXNYPZ = ((x, y, z)) => x <= 0. && y <= 0. && z > 0.;

let _isInNXNYNZ = ((x, y, z)) => x <= 0. && y <= 0. && z <= 0.;

let _updatePlaneGizmoLocalPosition =
    ((xyLocalPos, xzLocalPos, yzLocalPos), editorState, engineState) =>
  engineState
  |> TransformGameObjectEngineService.setLocalPosition(
       OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXYPlaneGizmo(
         editorState,
       ),
       xyLocalPos,
     )
  |> TransformGameObjectEngineService.setLocalPosition(
       OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXZPlaneGizmo(
         editorState,
       ),
       xzLocalPos,
     )
  |> TransformGameObjectEngineService.setLocalPosition(
       OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYZPlaneGizmo(
         editorState,
       ),
       yzLocalPos,
     );

let _computePlaneLocalPosition = (editorState, engineState) => {
  let cameraGameObject =
    SceneViewEditorService.unsafeGetEditCamera(editorState);
  let planeMoveStep = 1.;
  let cameraPosInWholeGizmoLocalCoordSystem =
    Wonderjs.Vector3Service.transformMat4Tuple(
      TransformGameObjectEngineService.getPosition(
        cameraGameObject,
        engineState,
      ),
      TransformEngineService.getLocalToWorldMatrixTypeArray(
        GameObjectComponentEngineService.unsafeGetTransformComponent(
          OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
            editorState,
          ),
          engineState,
        ),
        engineState,
      )
      |> Wonderjs.Matrix4Service.invert(
           _,
           Wonderjs.Matrix4Service.createIdentityMatrix4(),
         ),
    );

  if (_isInPXPYPZ(cameraPosInWholeGizmoLocalCoordSystem)) {
    (
      (planeMoveStep, planeMoveStep, 0.),
      (planeMoveStep, 0., planeMoveStep),
      (0., planeMoveStep, planeMoveStep),
    );
  } else if (_isInNXPYPZ(cameraPosInWholeGizmoLocalCoordSystem)) {
    (
      (-. planeMoveStep, planeMoveStep, 0.),
      (-. planeMoveStep, 0., planeMoveStep),
      (0., planeMoveStep, planeMoveStep),
    );
  } else if (_isInPXNYPZ(cameraPosInWholeGizmoLocalCoordSystem)) {
    (
      (planeMoveStep, -. planeMoveStep, 0.),
      (planeMoveStep, 0., planeMoveStep),
      (0., -. planeMoveStep, planeMoveStep),
    );
  } else if (_isInPXPYNZ(cameraPosInWholeGizmoLocalCoordSystem)) {
    (
      (planeMoveStep, planeMoveStep, 0.),
      (planeMoveStep, 0., -. planeMoveStep),
      (0., planeMoveStep, -. planeMoveStep),
    );
  } else if (_isInNXNYPZ(cameraPosInWholeGizmoLocalCoordSystem)) {
    (
      (-. planeMoveStep, -. planeMoveStep, 0.),
      (-. planeMoveStep, 0., planeMoveStep),
      (0., -. planeMoveStep, planeMoveStep),
    );
  } else if (_isInNXPYNZ(cameraPosInWholeGizmoLocalCoordSystem)) {
    (
      (-. planeMoveStep, planeMoveStep, 0.),
      (-. planeMoveStep, 0., -. planeMoveStep),
      (0., planeMoveStep, -. planeMoveStep),
    );
  } else if (_isInPXNYNZ(cameraPosInWholeGizmoLocalCoordSystem)) {
    (
      (planeMoveStep, -. planeMoveStep, 0.),
      (planeMoveStep, 0., -. planeMoveStep),
      (0., -. planeMoveStep, -. planeMoveStep),
    );
  } else if (_isInNXNYNZ(cameraPosInWholeGizmoLocalCoordSystem)) {
    (
      (-. planeMoveStep, -. planeMoveStep, 0.),
      (-. planeMoveStep, 0., -. planeMoveStep),
      (0., -. planeMoveStep, -. planeMoveStep),
    );
  } else {
    WonderLog.Log.error(
      WonderLog.Log.buildErrorMessage(
        ~title="moveTranslationPlaneGizmo",
        ~description=
          {j|cameraPosInWholeGizmoLocalCoordSystem: $cameraPosInWholeGizmoLocalCoordSystem is error|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    );

    ((0., 0., 0.), (0., 0., 0.), (0., 0., 0.));
  };
};

let moveTranslationPlaneGizmo = (editorState, engineState) =>
  _updatePlaneGizmoLocalPosition(
    _computePlaneLocalPosition(editorState, engineState),
    editorState,
    engineState,
  );