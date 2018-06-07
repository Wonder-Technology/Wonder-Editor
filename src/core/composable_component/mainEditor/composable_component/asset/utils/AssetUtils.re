open AssetTreeNodeType;

let getTargetTreeNodeId = editorState =>
  switch (
    AssetCurrentNodeParentIdEditorService.getCurrentNodeParentId
    |> StateLogicService.getEditorState
  ) {
  | None => editorState |> AssetTreeRootEditorService.getRootTreeNodeId
  | Some(id) => id
  };

let isIdEqual = (id, targetId) => id === targetId;

let rec getSpecificTreeNodeById = (id, node) =>
  isIdEqual(id, node.id) ?
    Some(node) :
    {
      let (resultNode, _) =
        node.children
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (. (resultNode, id), child) =>
               switch (resultNode) {
               | Some(_) => (resultNode, id)
               | None => (getSpecificTreeNodeById(id, child), id)
               },
             (None, id),
           );
      resultNode;
    };

let rec _isRemovedTreeNodeBeTargetParent = (targetId, removedTreeNode) =>
  isIdEqual(targetId, removedTreeNode.id) ?
    true :
    removedTreeNode.children
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. result, child) =>
           result ? true : _isRemovedTreeNodeBeTargetParent(targetId, child),
         false,
       );

let _isTargetTreeNodeBeRemovedParent = (targetTreeNode, removedId) =>
  targetTreeNode.children
  |> Js.Array.filter(child => isIdEqual(child.id, removedId))
  |> Js.Array.length
  |> (len => len >= 1 ? true : false);

let isTreeNodeRelationError =
    (targetId, removedId, (editorState, _engineState)) =>
  isIdEqual(targetId, removedId) ?
    true :
    _isRemovedTreeNodeBeTargetParent(
      targetId,
      editorState
      |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
      |> getSpecificTreeNodeById(removedId)
      |> OptionService.unsafeGet,
    ) ?
      true :
      _isTargetTreeNodeBeRemovedParent(
        editorState
        |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
        |> getSpecificTreeNodeById(targetId)
        |> OptionService.unsafeGet,
        removedId,
      );

let deepRemoveTreeNode = (removedTreeNode, nodeMap) => {
  let rec _iterateRemovedTreeNode = (nodeArr, nodeMap) =>
    nodeArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. nodeMap, {id, children}) =>
           _iterateRemovedTreeNode(
             children,
             DomHelper.deleteKeyInDict(id, nodeMap),
           ),
         nodeMap,
       );

  _iterateRemovedTreeNode(
    [|removedTreeNode|],
    nodeMap |> SparseMapService.copy,
  );
};

let removeSpecificTreeNode = (targetId, assetTreeRoot) => {
  let rec _iterateAssetTree =
          (targetId, assetTreeArr, newAssetTree, removedTreeNode) =>
    assetTreeArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (newAssetTree, removedTreeNode), {id, children} as treeNode) =>
           isIdEqual(id, targetId) ?
             (newAssetTree, Some(treeNode)) :
             {
               let (newAssetTreeChildrenArray, removedTreeNode) =
                 _iterateAssetTree(targetId, children, [||], removedTreeNode);
               (
                 newAssetTree
                 |> ArrayService.push({
                      ...treeNode,
                      children: newAssetTreeChildrenArray,
                    }),
                 removedTreeNode,
               );
             },
         (newAssetTree, removedTreeNode),
       );

  switch (_iterateAssetTree(targetId, [|assetTreeRoot|], [||], None)) {
  | (_, None) =>
    /* TODO move to ensure check */
    /* TODO fix message to: the removed treenode(id: $targetId) is not exist|j}, */
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="removeSpecificTreeNode",
        ~description={j|the removed treenode $targetId is not exist|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  | (newAssetTree, Some(removedTreeNode)) => (
      newAssetTree |> ArrayService.getFirst,
      removedTreeNode,
    )
  };
};

/* TODO rename to insertSourceTreeNodeToTargetTreeNodeChildren

   /* let insertSourceTreeNodeToTargetTreeNodeChildren = (targetId, newTreeNode, assetTreeRoot) => { */
   */
let insertSourceTreeNodeToTargetTreeNodeChildren = (targetId, newTreeNode, assetTreeRoot) => {
  let rec _iterateInsertAssetTree = (targetId, newTreeNode, assetTreeArr) =>
    assetTreeArr
    |> Js.Array.map(({id, children} as treeNode) =>
         isIdEqual(id, targetId) ?
           {
             ...treeNode,
             children:
               children |> Js.Array.copy |> ArrayService.push(newTreeNode),
           } :
           {
             ...treeNode,
             children:
               _iterateInsertAssetTree(targetId, newTreeNode, children),
           }
       );
  _iterateInsertAssetTree(targetId, newTreeNode, [|assetTreeRoot|])
  |> (assetTreeArr => assetTreeArr |> ArrayService.getFirst);
};