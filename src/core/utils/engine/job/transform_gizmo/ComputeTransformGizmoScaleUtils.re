let computeScaleComponentBasedOnDistanceToCamera =
    (cameraPos, currentSceneTreeNodePos) => {
  let factor = 0.03;

  switch (
    Vector3Service.length(
      Wonderjs.Vector3Service.sub(
        Wonderjs.Vector3Type.Float,
        cameraPos,
        currentSceneTreeNodePos,
      ),
    )
  ) {
  | 0. => 1.
  | distance => distance *. factor
  };
};

let getScaleFactor = (editorState, engineState) => {
  let (scaleX, _, _) =
    TransformGameObjectEngineService.getLocalScale(
      OperateRotationGizmoSceneViewEditorService.unsafeGetRotationWholeGizmo(
        editorState,
      ),
      engineState,
    );

  scaleX;
};