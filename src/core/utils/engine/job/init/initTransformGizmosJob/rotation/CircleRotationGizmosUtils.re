let getCenterPoint = (editorState, engineState) =>
  InitTransformGizmosUtils.getCurrentSceneTreeNodePosition(
    editorState,
    engineState,
  );

let _buildPlane = (axisOfPlane, centerPoint, editorState, engineState) => {
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

  WonderLog.Log.print((
    "axis: ",
    axisOfPlane,
    centerPoint,
    PlaneShapeUtils.setFromNormalAndCoplanarPoint(
      axisOfPlane |> Wonderjs.Vector3Service.normalize,
      centerPoint,
    ),
  ))
  |> ignore;

  PlaneShapeUtils.setFromNormalAndCoplanarPoint(
    axisOfPlane |> Wonderjs.Vector3Service.normalize,
    centerPoint,
  );
};

let getXYPlaneLocalAxis = () => (0., 0., 1.);

let getXAxisOfPlane = (editorState, engineState) => {
  let (xAxis, _, _) =
    TransformGameObjectEngineService.getLocalToWorldMatrixTypeArray(
      SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
      engineState,
    )
    |> Matrix4Service.extractBasic;

  xAxis;
};

let getYAxisOfPlane = (editorState, engineState) => {
  let (_, yAxis, _) =
    TransformGameObjectEngineService.getLocalToWorldMatrixTypeArray(
      SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
      engineState,
    )
    |> Matrix4Service.extractBasic;

  yAxis;
};

let getZAxisOfPlane = (editorState, engineState) => {
  let (_, _, zAxis) =
    TransformGameObjectEngineService.getLocalToWorldMatrixTypeArray(
      SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
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