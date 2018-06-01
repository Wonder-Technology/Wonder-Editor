open AssetTreeNodeType;

let getTargetTreeNodeId = (currentNodeParentId, editorState) =>
  switch currentNodeParentId {
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
        |> Js.Array.reduce(
             ((resultNode, id), child) =>
               switch resultNode {
               | Some(_) => (resultNode, id)
               | None => (getSpecificTreeNodeById(id, child), id)
               },
             (None, id)
           );
      resultNode
    };

let rec _isRemovedTreeNodeBeTargetParent = (targetId, removedTreeNode) =>
  isIdEqual(targetId, removedTreeNode.id) ?
    true :
    removedTreeNode.children
    |> Js.Array.reduce(
         (result, child) => result ? true : _isRemovedTreeNodeBeTargetParent(targetId, child),
         false
       );

let _isTargetTreeNodeBeRemovedParent = (targetTreeNode, removedId) =>
  targetTreeNode.children
  |> Js.Array.filter((child) => isIdEqual(child.id, removedId))
  |> Js.Array.length
  |> ((len) => len >= 1 ? true : false);

let isTreeNodeRelationError = (targetId, removedId, (editorState, _engineState)) =>
  isIdEqual(targetId, removedId) ?
    true :
    _isRemovedTreeNodeBeTargetParent(
      targetId,
      editorState
      |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
      |> getSpecificTreeNodeById(removedId)
      |> OptionService.unsafeGet
    ) ?
      true :
      _isTargetTreeNodeBeRemovedParent(
        editorState
        |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
        |> getSpecificTreeNodeById(targetId)
        |> OptionService.unsafeGet,
        removedId
      );

let deepRemoveTreeNodeChildren = (removedTreeNode, nodeMap) => {
  /* TODO refactor to:

     let rec _iterateRemovedTreeNode = (id, children, nodeMap) =>
          chidlren
          |> WonderCommonlib.ArrayService.reduceOneParam(
               [@bs]
               (
                 (nodeMap, {id, children}) =>
                   _iterateRemovedTreeNode(id, children, DomHelper.deleteKeyInDict(id, nodeMap))
               ),
               nodeMap
             );
        _iterateRemovedTreeNode(removedTreeNode.id, removedTreeNode.children, nodeMap) */
  let rec _iterateRemovedTreeNode = (id, children) => {
    DomHelper.deleteKeyInDict(id, nodeMap) |> ignore;
    children |> Js.Array.forEach(({id, children}) => _iterateRemovedTreeNode(id, children))
  };
  _iterateRemovedTreeNode(removedTreeNode.id, removedTreeNode.children)
};

/* TODO all: array reduce use WonderCommonlib.ArrayService->reduceOneParam */
/* TODO all: array forEach use WonderCommonlib.ArrayService->forEach */
let removeSpecificTreeNodeFromAssetTree = (targetId, assetTreeRoot) => {
  let rec _iterateAssetTree = (targetId, assetTree, newAssetTree, removedTreeNode) =>
    /* TODO all: rename all array to  xxxArr
       (
         e.g. assetTree ->assetTreeArr, newAssetTree -> newAssetTreeArr
       )
       */
    assetTree
    |> Js.Array.reduce(
         ((newAssetTree, removedTreeNode), {id, children} as treeNode) =>
           isIdEqual(id, targetId) ?
             (newAssetTree, Some(treeNode)) :
             {
               let (newAssetTreeChildrenArray, removedTreeNode) =
                 _iterateAssetTree(targetId, children, [||], removedTreeNode);
               (
                 newAssetTree
                 |> ArrayService.push({...treeNode, children: newAssetTreeChildrenArray}),
                 removedTreeNode
               )
             },
         (newAssetTree, removedTreeNode)
       );
  switch (_iterateAssetTree(targetId, [|assetTreeRoot|], [||], None)) {
  | (_, None) =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="removeSpecificTreeNodeFromAssetTree",
        ~description={j|
     the removed treenode $targetId is not exist |j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  | (newAssetTree, Some(removedTreeNode)) => (
      newAssetTree |> ArrayService.getFirst,
      removedTreeNode
    )
  }
};

let insertNewTreeNodeToTargetTreeNode = (targetId, newTreeNode, assetTreeRoot) => {
  let rec _iterateInsertAssetTree = (targetId, newTreeNode, assetTree) =>
    assetTree
    |> Js.Array.map(
         ({id, children} as treeNode) =>
           isIdEqual(id, targetId) ?
             {...treeNode, children: children |> Js.Array.copy |> ArrayService.push(newTreeNode)} :
             {...treeNode, children: _iterateInsertAssetTree(targetId, newTreeNode, children)}
       );
  _iterateInsertAssetTree(targetId, newTreeNode, [|assetTreeRoot|])
  |> ((assetTreeArr) => assetTreeArr |> ArrayService.getFirst)
};
