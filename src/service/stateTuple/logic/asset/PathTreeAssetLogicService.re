let getNodePath = (targetNode, (editorState, engineState)) => {
  let targetNodeId = NodeAssetService.getNodeId(~node=targetNode);

  let _handleLeafNodeFunc = ((isFindNode, pathArr), nodeId, node) =>
    isFindNode ?
      (true, pathArr) :
      NodeAssetService.isIdEqual(nodeId, targetNodeId) ?
        (true, pathArr) : (false, pathArr);
  let _handleFolderNodeFunc = ((isFindNode, pathArr), nodeId, node) =>
    isFindNode ?
      (true, pathArr) :
      NodeAssetService.isIdEqual(nodeId, targetNodeId) ?
        (true, pathArr |> ArrayService.push(node)) : (false, pathArr);
  let _textureNodeFunc =
      (acc, nodeId, {textureComponent}: NodeAssetType.textureNodeData) =>
    _handleLeafNodeFunc(
      acc,
      nodeId,
      NodeNameAssetLogicService.getTextureNodeName(
        ~texture=textureComponent,
        ~engineState,
      ),
    );
  let _materialNodeFunc =
      (
        acc,
        nodeId,
        {materialComponent, type_}: NodeAssetType.materialNodeData,
      ) =>
    _handleLeafNodeFunc(
      acc,
      nodeId,
      NodeNameAssetLogicService.getMaterialNodeName(
        ~material=materialComponent,
        ~type_,
        ~engineState,
      ),
    );
  let _wdbNodeFunc = (acc, nodeId, nodeData) =>
    _handleLeafNodeFunc(
      acc,
      nodeId,
      NodeNameAssetLogicService.getWDBNodeName(
        WDBNodeAssetService.buildNodeByNodeData(~nodeId, ~nodeData),
      ),
    );
  let _folderNodeFunc = (acc, nodeId, nodeData, children) =>
    _handleFolderNodeFunc(
      acc,
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

  let (_, pathArr) =
    IterateTreeAssetService.foldWithHandleBeforeAndAfterFoldChildren(
      ~acc=(false, [||]),
      ~tree=TreeAssetEditorService.unsafeGetTree(editorState),
      ~textureNodeFunc=_textureNodeFunc,
      ~materialNodeFunc=_materialNodeFunc,
      ~wdbNodeFunc=_wdbNodeFunc,
      ~folderNodeFunc=_folderNodeFunc,
      ~handleBeforeFoldChildrenFunc=_handleBeforeFoldChildrenFunc,
      ~handleAfterFoldChildrenFunc=_handleAfterFoldChildrenFunc,
      (),
    );

  pathArr |> Js.Array.reverseInPlace |> Js.Array.joinWith("/");
};