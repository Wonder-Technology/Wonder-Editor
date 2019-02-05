let getCameraPos = (editorState, engineState) =>
  TransformGameObjectEngineService.getPosition(
    SceneViewEditorService.unsafeGetEditCamera(editorState),
    engineState,
  );

let getCameraPosInLocalCoordSystem =
    (cameraPos, inverseMMatrix, editorState, engineState) =>
  Wonderjs.Vector3Service.transformMat4Tuple(
    getCameraPos(editorState, engineState),
    inverseMMatrix,
  );