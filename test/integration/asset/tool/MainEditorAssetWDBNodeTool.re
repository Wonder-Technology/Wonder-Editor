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
      ~imageDataIndex,
      (),
    ) =>
  WDBNodeAssetEditorService.addWDBNodeToAssetTree(
    RootTreeAssetEditorService.getRootNode(editorState),
    WDBNodeAssetService.buildNode(
      ~nodeId,
      ~name,
      ~wdbGameObject=gameObject,
      ~imageDataIndex,
    ),
    editorState,
  );

let getWDBName = (~nodeId, ~editorState=StateEditorService.getState(), ()) =>
  NodeNameAssetLogicService.getWDBNodeName(
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState),
  );

let getWDBNodeIdByName = (wdbGameObjectName, (editorState, engineState)) =>
  MainEditorAssetTreeTool.findNodeByName(
    wdbGameObjectName,
    (editorState, engineState),
  )
  |> OptionService.unsafeGet
  |> NodeAssetService.getNodeId(~node=_);

let getValidTextureArray = editorState =>
  ImageDataMapAssetEditorService.getValidValues(editorState)
  |> Js.Array.filter(
       ({base64, uint8Array, blobObjectURL}: ImageDataType.imageData) =>
       uint8Array |> Js.Option.isSome
     );