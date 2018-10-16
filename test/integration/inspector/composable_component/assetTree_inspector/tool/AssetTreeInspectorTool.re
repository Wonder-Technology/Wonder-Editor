module Rename = {
  let _renameAssetNode = ((store, dispatchFunc), (nodeId, nodeType), name) =>
    AssetTreeInspector.Method.renameAssetTreeNode(
      (store, dispatchFunc),
      (nodeId, nodeType),
      name,
    );

  let renameAssetTextureNode =
      (
        ~store=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~nodeId,
        ~name,
        (),
      ) =>
    _renameAssetNode(
      (store, dispatchFunc),
      (nodeId, AssetNodeType.Texture),
      name,
    );

  let renameAssetMaterialNode =
      (
        ~store=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~nodeId,
        ~name,
        (),
      ) =>
    _renameAssetNode(
      (store, dispatchFunc),
      (nodeId, AssetNodeType.Material),
      name,
    );

  let renameAssetFolderNode =
      (
        ~store=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~nodeId,
        ~name,
        (),
      ) =>
    _renameAssetNode(
      (store, dispatchFunc),
      (nodeId, AssetNodeType.Folder),
      name,
    );

  let isFolderNameDisabled = nodeId =>
    AssetTreeInspector.Method._isFolderNameDisabled(nodeId);
};

let reducer =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~nodeId,
      ~nodeType,
      ~action,
      ~state,
      (),
    ) =>
  AssetTreeInspector.reducer(
    (store, dispatchFunc),
    nodeId,
    nodeType,
    action,
    state,
  );