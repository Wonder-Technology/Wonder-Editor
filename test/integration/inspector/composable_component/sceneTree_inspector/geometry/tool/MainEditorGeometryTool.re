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
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorGeometry.Method.changeGeometry(
    (uiState, dispatchFunc),
    gameObject,
    (sourceGeometry, targetGeometry),
  );

let getAllShowGeometrys = (gameObject, engineState) =>
  MainEditorGeometry.Method.getAllShowGeometrys(gameObject, engineState);