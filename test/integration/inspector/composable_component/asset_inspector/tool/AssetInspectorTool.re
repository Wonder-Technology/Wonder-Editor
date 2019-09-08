module Rename = {
  let renameAssetNode = ((uiState, dispatchFunc), nodeId, name) =>
    AssetInspector.Method.renameAssetTreeNode(
      (uiState, dispatchFunc),
      nodeId,
      name,
    );

  let renameAssetCubemapNode =
      (
        ~uiState=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~nodeId,
        ~name,
        (),
      ) =>
    renameAssetNode((uiState, dispatchFunc), nodeId, name);

  let renameAssetScriptAttributeNode =
      (
        ~uiState=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~nodeId,
        ~name,
        (),
      ) =>
    renameAssetNode((uiState, dispatchFunc), nodeId, name);

  let renameAssetScriptEventFunctionNode =
      (
        ~uiState=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~nodeId,
        ~name,
        (),
      ) =>
    renameAssetNode((uiState, dispatchFunc), nodeId, name);

  let renameAssetTextureNode =
      (
        ~uiState=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~nodeId,
        ~name,
        (),
      ) =>
    renameAssetNode((uiState, dispatchFunc), nodeId, name);

  let renameAssetMaterialNode =
      (
        ~uiState=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~nodeId,
        ~name,
        (),
      ) =>
    renameAssetNode((uiState, dispatchFunc), nodeId, name);

  let renameAssetWDBNode =
      (
        ~uiState=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~nodeId,
        ~name,
        (),
      ) =>
    renameAssetNode((uiState, dispatchFunc), nodeId, name);

  let renameAssetAssetBundleNode =
      (
        ~uiState=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~nodeId,
        ~name,
        (),
      ) =>
    renameAssetNode((uiState, dispatchFunc), nodeId, name);

  let renameAssetFolderNode =
      (
        ~uiState=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~nodeId,
        ~name,
        (),
      ) =>
    renameAssetNode((uiState, dispatchFunc), nodeId, name);

  let renameAssetIMGUIExecFuncDataNode =
      (
        ~uiState=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~nodeId,
        ~name,
        (),
      ) =>
    renameAssetNode((uiState, dispatchFunc), nodeId, name);

  let renameAssetIMGUICustomControlNode =
      (
        ~uiState=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~nodeId,
        ~name,
        (),
      ) =>
    renameAssetNode((uiState, dispatchFunc), nodeId, name);

  let renameAssetIMGUISkinNode =
      (
        ~uiState=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~nodeId,
        ~name,
        (),
      ) =>
    renameAssetNode((uiState, dispatchFunc), nodeId, name);

  let renameAssetFntNode =
      (
        ~uiState=TestTool.buildEmptyAppState(),
        ~dispatchFunc=TestTool.getDispatch(),
        ~nodeId,
        ~name,
        (),
      ) =>
    renameAssetNode((uiState, dispatchFunc), nodeId, name);

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
  AssetInspector.reducer((uiState, dispatchFunc), nodeId, action, state);