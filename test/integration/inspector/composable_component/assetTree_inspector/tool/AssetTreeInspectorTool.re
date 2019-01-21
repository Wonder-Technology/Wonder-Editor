module Rename = {
  let _renameAssetNode = ((uiState, dispatchFunc), nodeId, name) =>
    AssetTreeInspector.Method.renameAssetTreeNode(
      (uiState, dispatchFunc),
      nodeId,
      name,
    );

  let renameAssetTextureNode =
      (
        ~uiState=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~nodeId,
        ~name,
        (),
      ) =>
    _renameAssetNode((uiState, dispatchFunc), nodeId, name);

  let renameAssetMaterialNode =
      (
        ~uiState=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~nodeId,
        ~name,
        (),
      ) =>
    _renameAssetNode((uiState, dispatchFunc), nodeId, name);

  let renameAssetFolderNode =
      (
        ~uiState=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~nodeId,
        ~name,
        (),
      ) =>
    _renameAssetNode((uiState, dispatchFunc), nodeId, name);

  let isFolderNameDisabled = nodeId =>
    NodeAssetService.isIdEqual(
      MainEditorAssetTreeTool.getRootNodeId(StateEditorService.getState()),
      nodeId,
    );
};

let reducer =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~nodeId,
      ~action,
      ~state,
      (),
    ) =>
  AssetTreeInspector.reducer((uiState, dispatchFunc), nodeId, action, state);