let getSceneViewSize = editorState => {
  let (_, _, width, height) =
    SceneViewEditorService.unsafeGetViewRect(editorState);

  (width, height);
};

let convertMouselocationInViewToNDC =
    ((x, y), (viewWidth, viewHeight))
    : CoordinateType.mouseData => {
  x:
    (x |> NumberType.convertIntToFloat)
    /. (viewWidth |> NumberType.convertIntToFloat)
    *. 2.
    -. 1.,
  y:
    1.
    -. (y |> NumberType.convertIntToFloat)
    /. (viewHeight |> NumberType.convertIntToFloat)
    *. 2.,
};

let convertPosFromWorldToLocalCoordSystem = (pos, mMatrix, engineState) =>
  Wonderjs.Vector3Service.transformMat4Tuple(
    pos,
    mMatrix
    |> Wonderjs.Matrix4Service.invert(
         _,
         Wonderjs.Matrix4Service.createIdentityMatrix4(),
       ),
  );