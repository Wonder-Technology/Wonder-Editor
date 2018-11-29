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

let rec _isSourceTreeNodeBeTargetParent = (targetNodeId, sourceTreeNode) =>
  TreeAssetEditorService.isIdEqual(targetNodeId, sourceTreeNode.nodeId) ?
    true :
    sourceTreeNode.children
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. result, child) =>
           result ?
             true : _isSourceTreeNodeBeTargetParent(targetNodeId, child),
         false,
       );

let _isTargetTreeNodeBeSourceParent = (targetTreeNode, sourceNodeId) =>
  targetTreeNode.children
  |> Js.Array.filter(child =>
       TreeAssetEditorService.isIdEqual(child.nodeId, sourceNodeId)
     )
  |> Js.Array.length >= 1 ?
    true : false;

let checkAssetNodeName =
    (
      (sourceNodeId, sourceName),
      targetNodeId,
      type_,
      (failFunc, successFunc),
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
    failFunc((editorState, engineState)) :
    successFunc((editorState, engineState));

let _isTargetTreeNodeHasSameNameChild =
    (isWarn, targetNodeId, sourceNodeId, (editorState, engineState)) => {
  let {type_}: AssetTreeNodeType.assetTreeNodeType =
    TreeAssetEditorService.getAssetNodeFromRoot(sourceNodeId, editorState);

  let sourceNodeName =
    editorState
    |> AssetNodeUtils.handleSpeficFuncByAssetNodeType(
         type_,
         (
           FolderNodeMapAssetEditorService.getFolderName(sourceNodeId),
           OperateTextureLogicService.getTextureBaseName(sourceNodeId),
           MaterialNodeMapAssetLogicService.getMaterialBaseName(
             sourceNodeId,
             engineState,
           ),
           WDBNodeMapAssetEditorService.getWDBBaseName(sourceNodeId),
         ),
       );

  checkAssetNodeName(
    (sourceNodeId, sourceNodeName),
    targetNodeId,
    type_,
    (
      ((editorState, engineState)) => {
        isWarn ?
          ConsoleUtils.warn(
            "the asset can't has the same name !",
            editorState,
          ) :
          ();

        true;
      },
      ((editorState, engineState)) => false,
    ),
    (editorState, engineState),
  );
};

let isTreeNodeRelationError =
    (isWarn, targetNodeId, sourceNodeId, (editorState, engineState)) =>
  TreeAssetEditorService.isIdEqual(targetNodeId, sourceNodeId) ?
    true :
    _isSourceTreeNodeBeTargetParent(
      targetNodeId,
      editorState
      |> TreeRootAssetEditorService.unsafeGetAssetTreeRoot
      |> TreeAssetEditorService.getSpecificTreeNodeById(sourceNodeId)
      |> OptionService.unsafeGet,
    ) ?
      true :
      _isTargetTreeNodeBeSourceParent(
        editorState
        |> TreeRootAssetEditorService.unsafeGetAssetTreeRoot
        |> TreeAssetEditorService.getSpecificTreeNodeById(targetNodeId)
        |> OptionService.unsafeGet,
        sourceNodeId,
      )
      || _isTargetTreeNodeHasSameNameChild(
           isWarn,
           targetNodeId,
           sourceNodeId,
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