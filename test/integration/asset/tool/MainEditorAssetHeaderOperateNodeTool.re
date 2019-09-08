let removeNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~nodeId,
      (),
    ) => {
  MainEditorAssetNodeTool.setCurrentNodeId(nodeId);

  MainEditorAssetHeader.Method.removeAssetNode(
    (uiState, dispatchFunc),
    (),
    (),
  );
};

let removeTextureNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~textureNodeId,
      (),
    ) =>
  removeNode(~dispatchFunc, ~uiState, ~nodeId=textureNodeId, ());

let removeMaterialNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~materialNodeId,
      (),
    ) =>
  removeNode(~dispatchFunc, ~uiState, ~nodeId=materialNodeId, ());

let removeScriptEventFunctionNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~scriptEventFunctionNodeId,
      (),
    ) =>
  removeNode(~dispatchFunc, ~uiState, ~nodeId=scriptEventFunctionNodeId, ());

let removeScriptAttributeNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~scriptAttributeNodeId,
      (),
    ) =>
  removeNode(~dispatchFunc, ~uiState, ~nodeId=scriptAttributeNodeId, ());

let removeAssetBundleNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~assetBundleNodeId,
      (),
    ) =>
  removeNode(~dispatchFunc, ~uiState, ~nodeId=assetBundleNodeId, ());

let removeFolderNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~folderNodeId,
      (),
    ) =>
  removeNode(~dispatchFunc, ~uiState, ~nodeId=folderNodeId, ());

let removeWDBNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~wdbNodeId,
      (),
    ) =>
  removeNode(~dispatchFunc, ~uiState, ~nodeId=wdbNodeId, ());

let removeCubemapNode =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~cubemapNodeId,
      (),
    ) =>
  removeNode(~dispatchFunc, ~uiState, ~nodeId=cubemapNodeId, ());

let addFolder =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorAssetHeader.Method.addFolder((uiState, dispatchFunc), (), ());

let addMaterial =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorAssetHeader.Method.addMaterial((uiState, dispatchFunc), (), ());

let addScriptEventFunction =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorAssetHeader.Method.addScriptEventFunction(
    (uiState, dispatchFunc),
    (),
    (),
  );

let addScriptAttribute =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorAssetHeader.Method.addScriptAttribute(
    (uiState, dispatchFunc),
    (),
    (),
  );

let addCubemap =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorAssetHeader.Method.addCubemap((uiState, dispatchFunc), (), ());

let addIMGUIExecFuncData =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorAssetHeader.Method.addIMGUIExecFuncData(
    (uiState, dispatchFunc),
    (),
    (),
  );

let addIMGUICustomControl =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorAssetHeader.Method.addIMGUICustomControl(
    (uiState, dispatchFunc),
    (),
    (),
  );

let addIMGUISkin =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorAssetHeader.Method.addIMGUISkin((uiState, dispatchFunc), (), ());

let addFnt =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorAssetHeader.Method.addFnt((uiState, dispatchFunc), (), ());