let getCameraPos = (editorState, engineState) =>
  TransformGameObjectEngineService.getPosition(
    SceneViewEditorService.unsafeGetEditCamera(editorState),
    engineState,
  );

let getCameraPosInLocalCoordSystem = (cameraPos, mMatrix, engineState) =>
  CoordinateUtils.convertPosFromWorldToLocalCoordSystem(
    cameraPos,
    mMatrix,
    engineState,
  );