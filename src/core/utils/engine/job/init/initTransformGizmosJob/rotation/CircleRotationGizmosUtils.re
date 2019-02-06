let getCenterPoint = (editorState, engineState) =>
  InitTransformGizmosUtils.getCurrentSceneTreeNodePosition(
    editorState,
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
     {
       WonderLog.Log.print(("axis: ", 
     axisOfPlane, centerPoint  ,

  PlaneShapeUtils.setFromNormalAndCoplanarPoint(
    axisOfPlane |> Wonderjs.Vector3Service.normalize,
    centerPoint,
  )
       
       )) |> ignore;

  PlaneShapeUtils.setFromNormalAndCoplanarPoint(
    axisOfPlane |> Wonderjs.Vector3Service.normalize,
    centerPoint,
  );
     };

let getXYPlaneLocalAxis = () => (0., 0., 1.);

let buildXYPlane = (editorState, engineState) => {
  let (_, _, zAxis) =
    TransformGameObjectEngineService.getLocalToWorldMatrixTypeArray(
      SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
      engineState,
    )
    |> Matrix4Service.extractBasic;

  _buildPlane(
    zAxis,
    getCenterPoint(editorState, engineState),
    editorState,
    engineState,
  );
  /* _buildPlane(
       getXYPlaneLocalAxis(),
       getCenterPoint(editorState, engineState),
       editorState,
       engineState,
     ); */
};