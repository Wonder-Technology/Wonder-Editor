let getDefaultCubeGeometryName = PrepareDefaultComponentLogicService.getDefaultCubeGeometryName;

let getDefaultSphereGeometryName = PrepareDefaultComponentLogicService.getDefaultSphereGeometryName;

let getBoxTexturedGeometryName = () => "Mesh";

let getDefaultCubeGeometryComponent =
    (~editorState=StateEditorService.getState(), ()) =>
  editorState
  |> GeometryDataAssetEditorService.getGeometryData
  |> (({defaultCubeGeometryComponent}) => defaultCubeGeometryComponent);

let getDefaultSphereGeometryComponent =
    (~editorState=StateEditorService.getState(), ()) =>
  editorState
  |> GeometryDataAssetEditorService.getGeometryData
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

let getAllShowGeometrys = (gameObject, engineState) =>
  MainEditorGeometry.Method._getAllShowGeometrys(gameObject, engineState);