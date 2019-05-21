let unsafeGetSelectTreeNodeIdFromFolderTreeMap =
    (assetTreeNode, folderTreeMap) =>
  folderTreeMap
  |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
       NodeAssetService.getNodeId(~node=assetTreeNode),
     );

let _setToFolderTreeMap = (assetTreeNode, selectTreeNode, folderTreeMap) =>
  folderTreeMap
  |> WonderCommonlib.ImmutableSparseMapService.set(
       NodeAssetService.getNodeId(~node=assetTreeNode),
       NodeSelectTreeService.getNodeId(selectTreeNode),
     );

let handleFoldAssetNode =
    (
      parentFolderNode,
      (currentSelectTreeNodeId, folderTreeMap, selectTree),
      (assetNode, type_, value),
      engineState,
    ) => {
  let newNodeId = IdSelectTreeService.generateNodeId(currentSelectTreeNodeId);

  let selectTree =
    selectTree
    |> OperateTreeSelectTreeService.insertNode(
         unsafeGetSelectTreeNodeIdFromFolderTreeMap(
           parentFolderNode,
           folderTreeMap,
         ),
         ValueNodeSelectTreeService.buildNode(
           ~nodeId=newNodeId,
           ~name=
             NodeNameAssetLogicService.getNodeName(assetNode, engineState),
           ~isSelect=false,
           ~type_,
           ~value,
         ),
       );

  (newNodeId, folderTreeMap, selectTree);
};

let handleFoldFolderAssetNode =
    (
      parentFolderNode,
      (currentSelectTreeNodeId, folderTreeMap, selectTree),
      nodeId,
      nodeData,
      children,
    ) => {
  let newNodeId = IdSelectTreeService.generateNodeId(currentSelectTreeNodeId);

  let newSelectTreeFolderNode =
    FolderNodeSelectTreeService.buildNode(
      ~nodeId=newNodeId,
      ~name=FolderNodeAssetService.getNodeName(nodeData),
      ~isSelect=false,
      ~children=[||],
      (),
    );

  let selectTree =
    selectTree
    |> OperateTreeSelectTreeService.insertNode(
         unsafeGetSelectTreeNodeIdFromFolderTreeMap(
           parentFolderNode,
           folderTreeMap,
         ),
         newSelectTreeFolderNode,
       );

  (
    newNodeId,
    folderTreeMap
    |> _setToFolderTreeMap(
         FolderNodeAssetService.buildNodeByNodeData(
           ~nodeId,
           ~nodeData,
           ~children,
         ),
         newSelectTreeFolderNode,
       ),
    selectTree,
  );
};

let buildInitAccData = editorState => {
  let initNodeId = 0;
  let rootNode =
    FolderNodeSelectTreeService.buildNode(
      ~nodeId=initNodeId,
      ~name=RootTreeAssetService.getAssetTreeRootName(),
      ~isSelect=false,
      ~children=[||],
      (),
    );
  let selectTree = rootNode;

  (
    initNodeId,
    _setToFolderTreeMap(
      RootTreeAssetEditorService.getRootNode(editorState),
      rootNode,
      WonderCommonlib.ImmutableSparseMapService.createEmpty(),
    ),
    selectTree,
  );
};

let buildSelectTreeForAssetBundle =
    (convertAssetPathToAssetBundlePathFunc, (editorState, engineState)) => {
  let (_, _, selectTree) =
    IterateTreeAssetService.foldWithParentFolderNodeWithoutRootNode(
      ~acc=buildInitAccData(editorState),
      ~tree=TreeAssetEditorService.unsafeGetTree(editorState),
      ~folderNodeFunc=handleFoldFolderAssetNode,
      ~textureNodeFunc=(parentFolderNode, acc, nodeId, nodeData) => acc,
      ~assetBundleNodeFunc=
        (
          parentFolderNode,
          (currentSelectTreeNodeId, folderTreeMap, selectTree),
          nodeId,
          nodeData,
        ) => {
          /* TODO feat: exclude wab?  */
          let assetNode =
            AssetBundleNodeAssetService.buildNodeByNodeData(
              ~nodeId,
              ~nodeData,
            );

          let assetNodeData =
            assetNode |> AssetBundleNodeAssetService.getNodeData;

          handleFoldAssetNode(
            parentFolderNode,
            (currentSelectTreeNodeId, folderTreeMap, selectTree),
            (
              assetNode,
              "assetBundle",
              (
                {
                  assetBundle:
                    AssetBundleNodeAssetService.getAssetBundle(assetNode),
                  path:
                    convertAssetPathToAssetBundlePathFunc(
                      assetNodeData,
                      PathTreeAssetLogicService.getNodePath(
                        assetNode,
                        (editorState, engineState),
                      ),
                    ),
                  type_: AssetBundleNodeAssetService.getType(assetNode),
                }: HeaderAssetBundleType.assetBundleData
              )
              |> HeaderAssetBundleType.convertAssetBundleDataToValue,
            ),
            engineState,
          );
        },
      ~materialNodeFunc=(parentFolderNode, acc, nodeId, nodeData) => acc,
      ~scriptEventFunctionNodeFunc=
        (parentFolderNode, acc, nodeId, nodeData) => acc,
      ~scriptAttributeNodeFunc=
        (parentFolderNode, acc, nodeId, nodeData) => acc,
      ~wdbNodeFunc=(parentFolderNode, acc, nodeId, nodeData) => acc,
      (),
    );

  selectTree;
};

let setSelectForSelectTree = (tree, isSelect, node) => {
  open SelectTreeType;

  let rec _toggle = (isSelect, node, tree) =>
    switch (node) {
    | FolderNode(nodeId, nodeData, children) =>
      let tree =
        FolderNodeSelectTreeUILocalService.setNodeData(
          nodeId,
          FolderNodeSelectTreeService.setIsSelect(isSelect, nodeData),
          children,
          tree,
        );

      children
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. tree, node) => _toggle(isSelect, node, tree),
           tree,
         );
    | ValueNode(nodeId, nodeData) =>
      ValueNodeSelectTreeUILocalService.setNodeData(
        nodeId,
        ValueNodeSelectTreeService.setIsSelect(isSelect, nodeData),
        tree,
      )
    };

  switch (node) {
  | FolderNode(_, nodeData, _) => _toggle(isSelect, node, tree)
  | ValueNode(nodeId, nodeData) =>
    ValueNodeSelectTreeUILocalService.setNodeData(
      nodeId,
      ValueNodeSelectTreeService.setIsSelect(isSelect, nodeData),
      tree,
    )
  };
};