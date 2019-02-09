let getCenterPoint = (editorState, engineState) =>
  /* InitTransformGizmosUtils.getCurrentSceneTreeNodePosition(
       editorState,
       engineState,
     ); */
  TransformGameObjectEngineService.getPosition(
    OperateRotationGizmoSceneViewEditorService.unsafeGetRotationWholeGizmo(
      editorState,
    ),
    engineState,
  );

let _buildPlane = (axisOfPlane, centerPoint, editorState, engineState) =>
  /* WonderLog.Log.print((
       "LocalToWorldMatrixTypeArray: ",
     TransformGameObjectEngineService.getLocalToWorldMatrixTypeArray(
             SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
             engineState,
           ),

     initialDirectionVector,
     Wonderjs.Vector3Service.transformMat4Tuple(
           initialDirectionVector,
           TransformGameObjectEngineService.getLocalToWorldMatrixTypeArray(
             SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
             engineState,
           ),
         )


     )) |> ignore; */
  PlaneShapeUtils.setFromNormalAndCoplanarPoint(
    axisOfPlane |> Wonderjs.Vector3Service.normalize,
    centerPoint,
  );

let getXYPlaneLocalAxis = () => (0., 0., 1.);

let getXZPlaneLocalAxis = () => (0., 1., 0.);

let getYZPlaneLocalAxis = () => (1., 0., 0.);

let getXAxisOfPlane = (editorState, engineState) => {
  let (xAxis, _, _) =
    TransformGameObjectEngineService.getLocalToWorldMatrixTypeArray(
      OperateRotationGizmoSceneViewEditorService.unsafeGetRotationWholeGizmo(
        editorState,
      ),
      engineState,
    )
    |> Matrix4Service.extractBasic;

  xAxis;
};

let getYAxisOfPlane = (editorState, engineState) => {
  let (_, yAxis, _) =
    TransformGameObjectEngineService.getLocalToWorldMatrixTypeArray(
      OperateRotationGizmoSceneViewEditorService.unsafeGetRotationWholeGizmo(
        editorState,
      ),
      engineState,
    )
    |> Matrix4Service.extractBasic;

  yAxis;
};

let getZAxisOfPlane = (editorState, engineState) => {
  let (_, _, zAxis) =
    TransformGameObjectEngineService.getLocalToWorldMatrixTypeArray(
      OperateRotationGizmoSceneViewEditorService.unsafeGetRotationWholeGizmo(
        editorState,
      ),
      engineState,
    )
    |> Matrix4Service.extractBasic;

  zAxis;
};

let buildXYPlane = (editorState, engineState) =>
  _buildPlane(
    getZAxisOfPlane(editorState, engineState),
    getCenterPoint(editorState, engineState),
    editorState,
    engineState,
  );

let buildXZPlane = (editorState, engineState) =>
  _buildPlane(
    getYAxisOfPlane(editorState, engineState),
    getCenterPoint(editorState, engineState),
    editorState,
    engineState,
  );

let buildYZPlane = (editorState, engineState) =>
  _buildPlane(
    getXAxisOfPlane(editorState, engineState),
    getCenterPoint(editorState, engineState),
    editorState,
    engineState,
  );