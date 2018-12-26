let removeNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~store=TestTool.buildEmptyAppState(),
      ~nodeId,
      (),
    ) => {
  MainEditorAssetNodeTool.setCurrentNodeId(nodeId);

  MainEditorAssetHeader.Method.removeAssetNode(
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
  removeNode(~dispatchFunc, ~store, ~nodeId=textureNodeId, ());

let removeMaterialNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~store=TestTool.buildEmptyAppState(),
      ~materialNodeId,
      (),
    ) =>
  removeNode(~dispatchFunc, ~store, ~nodeId=materialNodeId, ());

let removeFolderNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~store=TestTool.buildEmptyAppState(),
      ~folderNodeId,
      (),
    ) =>
  removeNode(~dispatchFunc, ~store, ~nodeId=folderNodeId, ());

let removeWDBNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~store=TestTool.buildEmptyAppState(),
      ~wdbNodeId,
      (),
    ) =>
  removeNode(~dispatchFunc, ~store, ~nodeId=wdbNodeId, ());

let addFolder =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorAssetHeader.Method.addFolder((store, dispatchFunc), (), ());

let addMaterial =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorAssetHeader.Method.addMaterial((store, dispatchFunc), (), ());