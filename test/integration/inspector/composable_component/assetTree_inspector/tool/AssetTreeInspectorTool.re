module Rename = {
  let _renameAssetNode = ((store, dispatchFunc), nodeId, name) =>
    AssetTreeInspector.Method.renameAssetTreeNode(
      (store, dispatchFunc),
      nodeId,
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
    _renameAssetNode((store, dispatchFunc), nodeId, name);

  let renameAssetMaterialNode =
      (
        ~store=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~nodeId,
        ~name,
        (),
      ) =>
    _renameAssetNode((store, dispatchFunc), nodeId, name);

  let renameAssetFolderNode =
      (
        ~store=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~nodeId,
        ~name,
        (),
      ) =>
    _renameAssetNode((store, dispatchFunc), nodeId, name);

  let isFolderNameDisabled = nodeId =>
    NodeAssetService.isIdEqual(
      MainEditorAssetTreeTool.getRootNodeId(StateEditorService.getState()),
      nodeId,
    );
};

let reducer =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~nodeId,
      ~action,
      ~state,
      (),
    ) =>
  AssetTreeInspector.reducer((store, dispatchFunc), nodeId, action, state);