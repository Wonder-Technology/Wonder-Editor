let getCameraPos = (editorState, engineState) =>
  TransformGameObjectEngineService.getPosition(
    SceneViewEditorService.unsafeGetEditCamera(editorState),
    engineState,
  );

let getCameraPosInLocalCoordSystem =
    (cameraPos, mMatrix, engineState) =>
  Wonderjs.Vector3Service.transformMat4Tuple(
  cameraPos,
    mMatrix
    |> Wonderjs.Matrix4Service.invert(
         _,
         Wonderjs.Matrix4Service.createIdentityMatrix4(),
       ),
  );