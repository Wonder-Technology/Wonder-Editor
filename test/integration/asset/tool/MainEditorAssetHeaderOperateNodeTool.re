let removeNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~store=TestTool.buildEmptyAppState(),
      ~nodeId,
      ~nodeType,
      (),
    ) => {
  MainEditorAssetNodeTool.setCurrentNodeData(nodeId, nodeType);

  AssetHeaderRemoveNodeEventHandler.CustomEventHandler.handleSelfLogic(
    (store, dispatchFunc),
    (),
    (),
  );
};

let removeTextureNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~store=TestTool.buildEmptyAppState(),
      ~textureNodeId,
      (),
    ) =>
  removeNode(
    ~dispatchFunc,
    ~store,
    ~nodeId=textureNodeId,
    ~nodeType=AssetNodeType.Texture,
    (),
  );

let removeFolderNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~store=TestTool.buildEmptyAppState(),
      ~folderNodeId,
      (),
    ) =>
  removeNode(
    ~dispatchFunc,
    ~store,
    ~nodeId=folderNodeId,
    ~nodeType=AssetNodeType.Folder,
    (),
  );

let removeWDBNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~store=TestTool.buildEmptyAppState(),
      ~wdbNodeId,
      (),
    ) =>
  removeNode(
    ~dispatchFunc,
    ~store,
    ~nodeId=wdbNodeId,
    ~nodeType=AssetNodeType.WDB,
    (),
  );

let addFolder =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorAssetHeader.Method.addFolder((store, dispatchFunc), (), ());