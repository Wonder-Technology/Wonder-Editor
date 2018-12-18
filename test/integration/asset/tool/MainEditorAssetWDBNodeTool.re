open AssetNodeType;

let getWDBGameObject = (nodeId, editorState) => {
  let {wdbGameObject} =
    WDBNodeMapAssetEditorService.getWDBNodeMap(editorState)
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

  wdbGameObject;
};

let getAllWDBGameObjects = (editorState, engineState) =>
  GeometryAssetLogicService.getAllWDBGameObjects(editorState, engineState);

let addWDBNode =
    (
      ~gameObject,
      ~name="",
      ~arrayBuffer=Js.Typed_array.ArrayBuffer.make(0),
      (),
    ) => {
  let addedNodeId = MainEditorAssetIdTool.getNewAssetId();

  WDBNodeMapAssetEditorService.buildWDBNodeResult(name, None, gameObject)
  |> WDBNodeMapAssetEditorService.setResult(addedNodeId, _)
  |> StateLogicService.getAndSetEditorState;

  addedNodeId;
};

let getWDBNodeIdByName = (wdbGameObjectName, editorState) =>
  WDBNodeMapAssetEditorService.getWDBNodeMap(editorState)
  |> SparseMapService.reduceiValid(
       (. resultNodeId, {name}: AssetNodeType.wdbResultType, nodeId) =>
         switch (resultNodeId) {
         | Some(_) => resultNodeId
         | None => name === wdbGameObjectName ? Some(nodeId) : resultNodeId
         },
       None,
     )
  |> OptionService.unsafeGet;