open CurrentNodeDataType;

open AssetTreeNodeType;

let enterFolder = (dispatchFunc, nodeType, nodeId) => {
  StateEditorService.getState()
  |> AssetCurrentNodeDataEditorService.setCurrentNodeData({
       currentNodeId: nodeId,
       nodeType,
     })
  |> AssetCurrentNodeParentIdEditorService.setCurrentNodeParentId(nodeId)
  |> StateEditorService.setState
  |> ignore;

  StateEditorService.getState()
  |> SceneEditorService.clearCurrentSceneTreeNode
  |> CurrentSelectSourceEditorService.setCurrentSelectSource(
       EditorType.Asset,
     )
  |> StateEditorService.setState
  |> ignore;

  dispatchFunc(AppStore.UpdateAction(Update([|All|]))) |> ignore;
};

let rec setSpecificAssetTreeNodeIsShowChildren =
        (targetId, isShowChildren, assetTreeArray) =>
  assetTreeArray
  |> Js.Array.map(
       ({nodeId, children} as treeNode: AssetTreeNodeType.assetTreeNodeType) =>
       nodeId === targetId ?
         {...treeNode, isShowChildren} :
         {
           ...treeNode,
           children:
             setSpecificAssetTreeNodeIsShowChildren(
               targetId,
               isShowChildren,
               children,
             ),
         }
     );

let initRootAssetTree = (editorState, engineState) =>
  switch (AssetTreeRootEditorService.getAssetTreeRoot(editorState)) {
  | None =>
    let editorState = editorState |> AssetIndexEditorService.increaseIndex;
    let rootIndex = editorState |> AssetIndexEditorService.getIndex;

    (
      rootIndex |. AssetTreeEditorService.buildAssetTreeNodeByIndex(Folder),
      (editorState, engineState)
      |> FolderNodeUtils.addFolderIntoNodeMap(
           rootIndex,
           None,
           FolderNodeUtils.getAssetTreeRootName(),
         ),
    );
  | Some(assetTreeRoot) => (assetTreeRoot, editorState)
  };

let getTargetTreeNodeId = editorState =>
  switch (
    AssetCurrentNodeParentIdEditorService.getCurrentNodeParentId(editorState)
  ) {
  | None => editorState |> AssetTreeRootEditorService.getRootTreeNodeId
  | Some(nodeId) => nodeId
  };

let insertSourceTreeNodeToTargetTreeNodeChildren =
    (targetNodeId, newTreeNode, assetTreeRoot) => {
  let rec _iterateInsertIntoAssetTree =
          (targetNodeId, newTreeNode, assetTreeArr) =>
    assetTreeArr
    |> Js.Array.map(({nodeId, children} as treeNode) =>
         AssetTreeEditorService.isIdEqual(nodeId, targetNodeId) ?
           {
             ...treeNode,
             children:
               children |> Js.Array.copy |> ArrayService.push(newTreeNode),
           } :
           {
             ...treeNode,
             children:
               _iterateInsertIntoAssetTree(
                 targetNodeId,
                 newTreeNode,
                 children,
               ),
           }
       );

  _iterateInsertIntoAssetTree(targetNodeId, newTreeNode, [|assetTreeRoot|])
  |> (assetTreeArr => assetTreeArr |> ArrayService.unsafeGetFirst);
};

let createNodeAndAddToTargetNodeChildren =
    (targetTreeNode, nodeId, type_, editorState) =>
  editorState
  |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
  |> insertSourceTreeNodeToTargetTreeNodeChildren(
       targetTreeNode,
       AssetTreeEditorService.buildAssetTreeNodeByIndex(nodeId, type_),
     )
  |. AssetTreeRootEditorService.setAssetTreeRoot(editorState);

let rec _isRemovedTreeNodeBeTargetParent = (targetNodeId, removedTreeNode) =>
  AssetTreeEditorService.isIdEqual(targetNodeId, removedTreeNode.nodeId) ?
    true :
    removedTreeNode.children
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. result, child) =>
           result ?
             true : _isRemovedTreeNodeBeTargetParent(targetNodeId, child),
         false,
       );

let _isTargetTreeNodeBeRemovedParent = (targetTreeNode, removedNodeId) =>
  targetTreeNode.children
  |> Js.Array.filter(child =>
       AssetTreeEditorService.isIdEqual(child.nodeId, removedNodeId)
     )
  |> Js.Array.length >= 1 ?
    true : false;

let checkAssetNodeName =
    (
      (sourceNodeId, sourceName),
      targetNodeId,
      type_,
      (successFunc, failFunc),
      (editorState, engineState),
    ) =>
  IterateAssetTreeAssetEditorService.getChildrenNameAndIdArr(
    targetNodeId,
    type_,
    (editorState, engineState),
  )
  |> Js.Array.filter(((name, nodeId)) => nodeId !== sourceNodeId)
  |> Js.Array.map(((name, nodeId)) => name)
  |> Js.Array.includes(sourceName) ?
    successFunc((editorState, engineState)) :
    failFunc((editorState, engineState));

let _isTargetTreeNodeHasSameNameChild =
    (targetNodeId, removedNodeId, (editorState, engineState)) => {
  let {type_}: assetTreeNodeType =
    editorState
    |> AssetTreeRootEditorService.getAssetTreeRoot
    |> OptionService.unsafeGet
    |> AssetTreeEditorService.getSpecificTreeNodeById(removedNodeId)
    |> OptionService.unsafeGet;

  let removedNodeName =
    editorState
    |> AssetNodeUtils.handleSpeficFuncByAssetNodeType(
         type_,
         (
           AssetFolderNodeMapEditorService.getFolderName(removedNodeId),
           OperateTextureLogicService.getTextureBaseName(removedNodeId),
           AssetMaterialNodeMapLogicService.getMaterialBaseName(
             removedNodeId,
             engineState,
           ),
           AssetWDBNodeMapEditorService.getWDBBaseName(removedNodeId),
         ),
       );

  checkAssetNodeName(
    (removedNodeId, removedNodeName),
    targetNodeId,
    type_,
    (
      ((editorState, engineState)) => true,
      ((editorState, engineState)) => false,
    ),
    (editorState, engineState),
  );
};

let isTreeNodeRelationError =
    (targetNodeId, removedNodeId, (editorState, engineState)) =>
  AssetTreeEditorService.isIdEqual(targetNodeId, removedNodeId) ?
    true :
    _isRemovedTreeNodeBeTargetParent(
      targetNodeId,
      editorState
      |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
      |> AssetTreeEditorService.getSpecificTreeNodeById(removedNodeId)
      |> OptionService.unsafeGet,
    ) ?
      true :
      _isTargetTreeNodeBeRemovedParent(
        editorState
        |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
        |> AssetTreeEditorService.getSpecificTreeNodeById(targetNodeId)
        |> OptionService.unsafeGet,
        removedNodeId,
      )
      || _isTargetTreeNodeHasSameNameChild(
           targetNodeId,
           removedNodeId,
           (editorState, engineState),
         );

let rebuildRootAssetTree =
    (parentFolderNodeId, pathName, (editorState, engineState)) =>
  switch (AssetTreeRootEditorService.getAssetTreeRoot(editorState)) {
  | None =>
    let (editorState, rootIndex) = AssetIdUtils.generateAssetId(editorState);

    let editorState =
      rootIndex
      |. AssetTreeEditorService.buildAssetTreeNodeByIndex(Folder)
      |. AssetTreeRootEditorService.setAssetTreeRoot(editorState);

    let editorState =
      FolderNodeUtils.addFolderIntoNodeMap(
        rootIndex,
        parentFolderNodeId,
        pathName,
        (editorState, engineState),
      );

    (rootIndex, editorState);
  | Some(assetTreeRoot) => (
      editorState |> AssetTreeRootEditorService.getRootTreeNodeId,
      editorState,
    )
  };

let rebuildFolder =
    (parentFolderNodeId, pathName, (editorState, engineState)) => {
  let resultArr =
    IterateAssetTreeAssetEditorService.getChildrenNameAndIdArr(
      parentFolderNodeId |> OptionService.unsafeGet,
      Folder,
      (editorState, engineState),
    )
    |> Js.Array.filter(((nodeName, nodeId)) => pathName === nodeName);

  resultArr |> Js.Array.length === 0 ?
    {
      let (editorState, newIndex) = AssetIdUtils.generateAssetId(editorState);

      let editorState =
        FolderNodeUtils.addFolderIntoNodeMap(
          newIndex,
          parentFolderNodeId,
          pathName,
          (editorState, engineState),
        );

      let editorState =
        editorState
        |> createNodeAndAddToTargetNodeChildren(
             parentFolderNodeId |> OptionService.unsafeGet,
             newIndex,
             Folder,
           );

      (newIndex, editorState);
    } :
    {
      let (nodeName, nodeId) = resultArr |> ArrayService.unsafeGetFirst;

      (nodeId, editorState);
    };
};