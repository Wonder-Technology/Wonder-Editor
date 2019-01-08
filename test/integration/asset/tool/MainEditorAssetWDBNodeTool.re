open NodeAssetType;

let getWDBGameObject = (nodeId, editorState) =>
  OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
  |> WDBNodeAssetService.getWDBGameObject;

let getAllWDBGameObjects = (editorState, engineState) =>
  GeometryAssetLogicService.getAllWDBGameObjects(editorState, engineState);

let addWDBNodeToRoot =
    (
      ~gameObject,
      ~nodeId,
      ~editorState,
      ~name="",
      ~arrayBuffer=Js.Typed_array.ArrayBuffer.make(0),
      (),
    ) =>
  WDBNodeAssetEditorService.addWDBNodeToAssetTree(
    RootTreeAssetEditorService.getRootNode(editorState),
    WDBNodeAssetService.buildNode(~nodeId, ~name, ~wdbGameObject=gameObject),
    editorState,
  );

let getWDBNodeIdByName = (wdbGameObjectName, (editorState, engineState)) =>
  MainEditorAssetTreeTool.findNodeByName(
    wdbGameObjectName,
    (editorState, engineState),
  )
  |> OptionService.unsafeGet
  |> NodeAssetService.getNodeId(~node=_);