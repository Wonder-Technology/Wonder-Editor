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

let _getDisposedIndex = disposedIndexArray => (
  disposedIndexArray,
  disposedIndexArray |> ArrayService.getLast,
);

let _generateIndex = (index, disposedIndexArray) =>
  switch (_getDisposedIndex(disposedIndexArray)) {
  | (disposedIndexArray, None) => (index, succ(index), disposedIndexArray)
  | (disposedIndexArray, Some(disposedIndex)) => (
      disposedIndex,
      index,
      disposedIndexArray,
    )
  };

let getNewGeometry = (~engineState=StateEngineService.unsafeGetState(), ()) => {
  open Wonderjs.GeometryType;

  let {disposedIndexArray, aliveIndexArray, index} as geometryRecord =
    Wonderjs.RecordGeometryMainService.getRecord(engineState);

  let (index, newIndex, disposedIndexArray) =
    _generateIndex(index, disposedIndexArray);

  index;
};