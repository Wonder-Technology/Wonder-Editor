let getCubeGeometryName = () => "Cube";

let getSphereGeometryName = () => "Sphere";

let getBoxTexturedGeometryName = () => "Mesh";

let getDefaultCubeGeometryComponent =
    (~editorState=StateEditorService.getState(), ()) =>
  editorState
  |> AssetGeometryDataEditorService.getGeometryData
  |> (({defaultCubeGeometryComponent}) => defaultCubeGeometryComponent);

let getDefaultSphereGeometryComponent =
    (~editorState=StateEditorService.getState(), ()) =>
  editorState
  |> AssetGeometryDataEditorService.getGeometryData
  |> (({defaultSphereGeometryComponent}) => defaultSphereGeometryComponent);

let changeGeometry =
    (
      ~sourceGeometry,
      ~targetGeometry,
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorGeometry.Method.changeGeometry(
    (store, dispatchFunc),
    gameObject,
    (sourceGeometry, targetGeometry),
  );