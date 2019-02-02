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

let moveTranslationPlaneGizmo = (editorState, engineState) => {
  let currentSceneTreeNode =
    SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState);
  let cameraGameObject =
    SceneViewEditorService.unsafeGetEditCamera(editorState);
  let planeMoveStep = 1.;
  let cameraPosInCurrentSceneTreeNodeLocalCoordSystem =
    Wonderjs.Vector3Service.transformMat4Tuple(
      TransformGameObjectEngineService.getPosition(
        cameraGameObject,
        engineState,
      ),
      TransformEngineService.getLocalToWorldMatrixTypeArray(
        GameObjectComponentEngineService.unsafeGetTransformComponent(
          currentSceneTreeNode,
          engineState,
        ),
        engineState,
      )
      |> Wonderjs.Matrix4Service.invert(
           _,
           Wonderjs.Matrix4Service.createIdentityMatrix4(),
         ),
    );

  /* xy, xz, yz */

  let planeLocalPositionData =
    if (_isInPXPYPZ(cameraPosInCurrentSceneTreeNodeLocalCoordSystem)) {
      (
        (planeMoveStep, planeMoveStep, 0.),
        (planeMoveStep, 0., planeMoveStep),
        (0., planeMoveStep, planeMoveStep),
      );
    } else if (_isInNXPYPZ(cameraPosInCurrentSceneTreeNodeLocalCoordSystem)) {
      (
        (-. planeMoveStep, planeMoveStep, 0.),
        (-. planeMoveStep, 0., planeMoveStep),
        (0., planeMoveStep, planeMoveStep),
      );
    } else if (_isInPXNYPZ(cameraPosInCurrentSceneTreeNodeLocalCoordSystem)) {
      (
        (planeMoveStep, -. planeMoveStep, 0.),
        (planeMoveStep, 0., planeMoveStep),
        (0., -. planeMoveStep, planeMoveStep),
      );
    } else if (_isInPXPYNZ(cameraPosInCurrentSceneTreeNodeLocalCoordSystem)) {
      (
        (planeMoveStep, planeMoveStep, 0.),
        (planeMoveStep, 0., -. planeMoveStep),
        (0., planeMoveStep, -. planeMoveStep),
      );
    } else if (_isInNXNYPZ(cameraPosInCurrentSceneTreeNodeLocalCoordSystem)) {
      (
        (-. planeMoveStep, -. planeMoveStep, 0.),
        (-. planeMoveStep, 0., planeMoveStep),
        (0., -. planeMoveStep, planeMoveStep),
      );
    } else if (_isInNXPYNZ(cameraPosInCurrentSceneTreeNodeLocalCoordSystem)) {
      (
        (-. planeMoveStep, planeMoveStep, 0.),
        (-. planeMoveStep, 0., -. planeMoveStep),
        (0., planeMoveStep, -. planeMoveStep),
      );
    } else if (_isInPXNYNZ(cameraPosInCurrentSceneTreeNodeLocalCoordSystem)) {
      (
        (planeMoveStep, -. planeMoveStep, 0.),
        (planeMoveStep, 0., -. planeMoveStep),
        (0., -. planeMoveStep, -. planeMoveStep),
      );
    } else if (_isInNXNYNZ(cameraPosInCurrentSceneTreeNodeLocalCoordSystem)) {
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
            {j|cameraPosInCurrentSceneTreeNodeLocalCoordSystem: $cameraPosInCurrentSceneTreeNodeLocalCoordSystem is error|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      );

      ((0., 0., 0.), (0., 0., 0.), (0., 0., 0.));
    };

  _updatePlaneGizmoLocalPosition(
    planeLocalPositionData,
    editorState,
    engineState,
  );
};