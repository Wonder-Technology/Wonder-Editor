let _isCenterToCameraAndNormalOfCirclePlaneNearlyPerpendicular =
    (cameraPos, centerPoint, normalOfCirclePlane) => {
  let factor = 0.2;
  let cosVal =
    Vector3Service.dot(
      Wonderjs.Vector3Service.sub(
        Wonderjs.Vector3Type.Float,
        cameraPos,
        centerPoint,
      )
      |> Wonderjs.Vector3Service.normalize,
      normalOfCirclePlane |> Wonderjs.Vector3Service.normalize,
    );

  cosVal <= factor && cosVal >= -. factor;
};

let isGizmoUnUsed = (circleGizmoName, editorState, engineState) => {
  let cameraPos = CameraPosUtils.getCameraPos(editorState, engineState);

  let centerPoint =
    CircleRotationGizmosUtils.getCenterPoint(editorState, engineState);

  switch (circleGizmoName) {
  | "xy" =>
    _isCenterToCameraAndNormalOfCirclePlaneNearlyPerpendicular(
      cameraPos,
      centerPoint,
      CircleRotationGizmosUtils.getZAxisOfPlane(editorState, engineState),
    )
  | "xz" =>
    _isCenterToCameraAndNormalOfCirclePlaneNearlyPerpendicular(
      cameraPos,
      centerPoint,
      CircleRotationGizmosUtils.getYAxisOfPlane(editorState, engineState),
    )
  | "yz" =>
    _isCenterToCameraAndNormalOfCirclePlaneNearlyPerpendicular(
      cameraPos,
      centerPoint,
      CircleRotationGizmosUtils.getXAxisOfPlane(editorState, engineState),
    )
  };
};