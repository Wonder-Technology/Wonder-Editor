let _handleLeafNodeFunc = ((isFindNode, pathArr), targetNodeId, nodeId, node) =>
  isFindNode ?
    (true, pathArr) :
    NodeAssetService.isIdEqual(nodeId, targetNodeId) ?
      (true, pathArr) : (false, pathArr);

let _handleFolderNodeFunc =
    ((isFindNode, pathArr), targetNodeId, nodeId, node) =>
  isFindNode ?
    (true, pathArr) :
    NodeAssetService.isIdEqual(nodeId, targetNodeId) ?
      (true, pathArr |> ArrayService.push(node)) : (false, pathArr);

let _textureNodeFunc =
    (
      targetNodeId,
      engineState,
      acc,
      nodeId,
      {textureComponent}: NodeAssetType.textureNodeData,
    ) =>
  _handleLeafNodeFunc(
    acc,
    targetNodeId,
    nodeId,
    NodeNameAssetLogicService.getTextureNodeName(
      ~texture=textureComponent,
      ~engineState,
    ),
  );

let _cubemapNodeFunc =
    (
      targetNodeId,
      engineState,
      acc: (bool, 'a),
      nodeId,
      {textureComponent}: NodeAssetType.cubemapNodeData,
    ) =>
  _handleLeafNodeFunc(
    acc,
    targetNodeId,
    nodeId,
    NodeNameAssetLogicService.getCubemapNodeName(
      ~texture=textureComponent,
      ~engineState,
    ),
  );

let _materialNodeFunc =
    (
      targetNodeId,
      engineState,
      acc,
      nodeId,
      {materialComponent, type_}: NodeAssetType.materialNodeData,
    ) =>
  _handleLeafNodeFunc(
    acc,
    targetNodeId,
    nodeId,
    NodeNameAssetLogicService.getMaterialNodeName(
      ~material=materialComponent,
      ~type_,
      ~engineState,
    ),
  );

let _scriptEventFunctionNodeFunc =
    (
      targetNodeId,
      acc,
      nodeId,
      {name}: NodeAssetType.scriptEventFunctionNodeData,
    ) =>
  _handleLeafNodeFunc(acc, targetNodeId, nodeId, name);

let _scriptAttributeNodeFunc =
    (
      targetNodeId,
      acc,
      nodeId,
      {name}: NodeAssetType.scriptAttributeNodeData,
    ) =>
  _handleLeafNodeFunc(acc, targetNodeId, nodeId, name);

let _wdbNodeFunc = (targetNodeId, acc, nodeId, nodeData) =>
  _handleLeafNodeFunc(
    acc,
    targetNodeId,
    nodeId,
    NodeNameAssetLogicService.getWDBNodeName(
      WDBNodeAssetService.buildNodeByNodeData(~nodeId, ~nodeData),
    ),
  );

let _assetBundleNodeFunc =
    (targetNodeId, acc, nodeId, {name}: NodeAssetType.assetBundleNodeData) =>
  _handleLeafNodeFunc(acc, targetNodeId, nodeId, name);

let _imguiExecFuncDataNodeFunc =
    (
      targetNodeId,
      acc,
      nodeId,
      {name}: NodeAssetType.imguiExecFuncDataNodeData,
    ) =>
  _handleLeafNodeFunc(acc, targetNodeId, nodeId, name);

let _imguiSkinNodeFunc =
    (targetNodeId, acc, nodeId, {name}: NodeAssetType.imguiSkinNodeData) =>
  _handleLeafNodeFunc(acc, targetNodeId, nodeId, name);

let _imguiCustomControlNodeFunc =
    (
      targetNodeId,
      acc,
      nodeId,
      {name}: NodeAssetType.imguiCustomControlNodeData,
    ) =>
  _handleLeafNodeFunc(acc, targetNodeId, nodeId, name);

let _textNodeFunc =
    (targetNodeId, acc, nodeId, {name}: NodeAssetType.textNodeData) =>
  _handleLeafNodeFunc(acc, targetNodeId, nodeId, name);

let _jsonNodeFunc =
    (targetNodeId, acc, nodeId, {name}: NodeAssetType.jsonNodeData) =>
  _handleLeafNodeFunc(acc, targetNodeId, nodeId, name);

let _folderNodeFunc = (targetNodeId, acc, nodeId, nodeData, children) =>
  _handleFolderNodeFunc(
    acc,
    targetNodeId,
    nodeId,
    NodeNameAssetLogicService.getFolderNodeName(
      FolderNodeAssetService.buildNodeByNodeData(
        ~nodeId,
        ~nodeData,
        ~children,
      ),
    ),
  );

let _handleBeforeFoldChildrenFunc = ((isFindNode, _)) => isFindNode;

let _handleAfterFoldChildrenFunc =
    (nodeId, folderNodeData, children, (isFindNode, pathArr)) =>
  isFindNode ?
    (
      true,
      pathArr
      |> ArrayService.push(
           NodeNameAssetLogicService.getFolderNodeName(
             FolderNodeAssetService.buildNodeByNodeData(
               ~nodeId,
               ~nodeData=folderNodeData,
               ~children,
             ),
           ),
         ),
    ) :
    (false, pathArr);

let getNodePath = (targetNode, (editorState, engineState)) => {
  let targetNodeId = NodeAssetService.getNodeId(~node=targetNode);

  let (_, pathArr) =
    IterateTreeAssetService.foldWithHandleBeforeAndAfterFoldChildren(
      ~acc=(false, [||]),
      ~tree=TreeAssetEditorService.unsafeGetTree(editorState),
      ~textureNodeFunc=_textureNodeFunc(targetNodeId, engineState),
      ~cubemapNodeFunc=_cubemapNodeFunc(targetNodeId, engineState),
      ~materialNodeFunc=_materialNodeFunc(targetNodeId, engineState),
      ~scriptEventFunctionNodeFunc=_scriptEventFunctionNodeFunc(targetNodeId),
      ~scriptAttributeNodeFunc=_scriptAttributeNodeFunc(targetNodeId),
      ~wdbNodeFunc=_wdbNodeFunc(targetNodeId),
      ~assetBundleNodeFunc=_assetBundleNodeFunc(targetNodeId),
      ~imguiExecFuncDataNodeFunc=_imguiExecFuncDataNodeFunc(targetNodeId),
      ~imguiSkinNodeFunc=_imguiSkinNodeFunc(targetNodeId),
      ~imguiCustomControlNodeFunc=_imguiCustomControlNodeFunc(targetNodeId),
      ~textNodeFunc=_textNodeFunc(targetNodeId),
      ~jsonNodeFunc=_jsonNodeFunc(targetNodeId),
      ~folderNodeFunc=_folderNodeFunc(targetNodeId),
      ~handleBeforeFoldChildrenFunc=_handleBeforeFoldChildrenFunc,
      ~handleAfterFoldChildrenFunc=_handleAfterFoldChildrenFunc,
      (),
    );

  pathArr |> Js.Array.reverseInPlace |> Js.Array.joinWith("/");
};