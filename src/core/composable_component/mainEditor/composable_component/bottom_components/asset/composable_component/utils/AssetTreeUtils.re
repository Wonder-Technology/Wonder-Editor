open CurrentNodeDataType;

open AssetTreeNodeType;

let enterFolder = (dispatchFunc, nodeType, nodeId) => {
  StateEditorService.getState()
  |> CurrentNodeDataAssetEditorService.setCurrentNodeData({
       currentNodeId: nodeId,
       nodeType,
     })
  |> CurrentNodeParentIdAssetEditorService.setCurrentNodeParentId(nodeId)
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

let buildAssetTreeArray = editorState => [|
  editorState |> TreeRootAssetEditorService.unsafeGetAssetTreeRoot,
|];

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

let updateAssetTreeArrayData = (assetTreeArray, editorState) =>
  TreeRootAssetEditorService.setAssetTreeRoot(
    assetTreeArray |> ArrayService.unsafeGetFirst,
    editorState,
  );

let setSpecificAssetTreeNodeIsShowChildrenFromEditorState =
    (targetId, isShowChildren, editorState) =>
  editorState
  |> buildAssetTreeArray
  |> setSpecificAssetTreeNodeIsShowChildren(targetId, isShowChildren)
  |> updateAssetTreeArrayData(_, editorState);

let initRootAssetTree = (editorState, engineState) =>
  switch (TreeRootAssetEditorService.getAssetTreeRoot(editorState)) {
  | None =>
    let editorState = editorState |> IndexAssetEditorService.increaseIndex;
    let rootIndex = editorState |> IndexAssetEditorService.getIndex;

    (
      rootIndex
      |. TreeAssetEditorService.buildAssetTreeNodeByIndex(
           Folder,
           TreeAssetEditorService.getRootTreeNodeIsShowChildren(),
         ),
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
    CurrentNodeParentIdAssetEditorService.getCurrentNodeParentId(editorState)
  ) {
  | None => editorState |> TreeRootAssetEditorService.getRootTreeNodeId
  | Some(nodeId) => nodeId
  };

let insertSourceTreeNodeToTargetTreeNodeChildren =
    (targetNodeId, newTreeNode, assetTreeRoot) => {
  let rec _iterateInsertIntoAssetTree =
          (targetNodeId, newTreeNode, assetTreeArr) =>
    assetTreeArr
    |> Js.Array.map(({nodeId, children} as treeNode) =>
         TreeAssetEditorService.isIdEqual(nodeId, targetNodeId) ?
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
  |> TreeRootAssetEditorService.unsafeGetAssetTreeRoot
  |> insertSourceTreeNodeToTargetTreeNodeChildren(
       targetTreeNode,
       TreeAssetEditorService.buildAssetTreeNodeByIndex(
         nodeId,
         type_,
         TreeAssetEditorService.getTreeNodeDefaultIsShowChildren(),
       ),
     )
  |. TreeRootAssetEditorService.setAssetTreeRoot(editorState);

let rec _isRemovedTreeNodeBeTargetParent = (targetNodeId, removedTreeNode) =>
  TreeAssetEditorService.isIdEqual(targetNodeId, removedTreeNode.nodeId) ?
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
       TreeAssetEditorService.isIdEqual(child.nodeId, removedNodeId)
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
    |> TreeRootAssetEditorService.getAssetTreeRoot
    |> OptionService.unsafeGet
    |> TreeAssetEditorService.getSpecificTreeNodeById(removedNodeId)
    |> OptionService.unsafeGet;

  let removedNodeName =
    editorState
    |> AssetNodeUtils.handleSpeficFuncByAssetNodeType(
         type_,
         (
           FolderNodeMapAssetEditorService.getFolderName(removedNodeId),
           OperateTextureLogicService.getTextureBaseName(removedNodeId),
           AssetMaterialNodeMapLogicService.getMaterialBaseName(
             removedNodeId,
             engineState,
           ),
           WDBNodeMapAssetEditorService.getWDBBaseName(removedNodeId),
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
  TreeAssetEditorService.isIdEqual(targetNodeId, removedNodeId) ?
    true :
    _isRemovedTreeNodeBeTargetParent(
      targetNodeId,
      editorState
      |> TreeRootAssetEditorService.unsafeGetAssetTreeRoot
      |> TreeAssetEditorService.getSpecificTreeNodeById(removedNodeId)
      |> OptionService.unsafeGet,
    ) ?
      true :
      _isTargetTreeNodeBeRemovedParent(
        editorState
        |> TreeRootAssetEditorService.unsafeGetAssetTreeRoot
        |> TreeAssetEditorService.getSpecificTreeNodeById(targetNodeId)
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
  switch (TreeRootAssetEditorService.getAssetTreeRoot(editorState)) {
  | None =>
    let (editorState, rootIndex) = AssetIdUtils.generateAssetId(editorState);

    let editorState =
      rootIndex
      |. TreeAssetEditorService.buildAssetTreeNodeByIndex(
           Folder,
           TreeAssetEditorService.getRootTreeNodeIsShowChildren(),
         )
      |. TreeRootAssetEditorService.setAssetTreeRoot(editorState);

    let editorState =
      FolderNodeUtils.addFolderIntoNodeMap(
        rootIndex,
        parentFolderNodeId,
        pathName,
        (editorState, engineState),
      );

    (rootIndex, editorState);
  | Some(assetTreeRoot) => (
      editorState |> TreeRootAssetEditorService.getRootTreeNodeId,
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