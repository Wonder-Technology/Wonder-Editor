open AssetTreeNodeType;

let getTargetTreeNodeId = assetState =>
  switch (CurrentNodeParentIdAssetService.getCurrentNodeParentId(assetState)) {
  | None => assetState |> AssetTreeRootAssetService.getRootTreeNodeId
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
    (targetId, removedId, (assetState, _engineState)) =>
  isIdEqual(targetId, removedId) ?
    true :
    _isRemovedTreeNodeBeTargetParent(
      targetId,
      assetState
      |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot
      |> getSpecificTreeNodeById(removedId)
      |> OptionService.unsafeGet,
    ) ?
      true :
      _isTargetTreeNodeBeRemovedParent(
        assetState
        |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot
        |> getSpecificTreeNodeById(targetId)
        |> OptionService.unsafeGet,
        removedId,
      );

let deepRemoveTreeNode = removedTreeNode => {
  let rec _iterateRemovedTreeNode = nodeArr =>
    nodeArr
    |> Js.Array.forEach(({id, type_, children}) => {
         switch (type_) {
         | Folder =>
           let assetState = StateAssetService.getState();

           assetState
           |> FolderNodeMapAssetService.unsafeGetFolderNodeMap
           |> DomHelper.deleteKeyInDict(id)
           |. FolderNodeMapAssetService.setFolderNodeMap(assetState)
           |> StateAssetService.setState;

         | Texture =>
           let assetState = StateAssetService.getState();

           assetState
           |> TextureNodeMapAssetService.unsafeGetTextureNodeMap
           |> DomHelper.deleteKeyInDict(id)
           |. TextureNodeMapAssetService.setTextureNodeMap(assetState)
           |> StateAssetService.setState;
         | Json =>
           let assetState = StateAssetService.getState();

           assetState
           |> JsonNodeMapAssetService.unsafeGetJsonNodeMap
           |> DomHelper.deleteKeyInDict(id)
           |. JsonNodeMapAssetService.setJsonNodeMap(assetState)
           |> StateAssetService.setState;
         };

         _iterateRemovedTreeNode(children);
       });

  _iterateRemovedTreeNode([|removedTreeNode|]);
  StateAssetService.getState();
};

let _checkRemovedTreeNodeAndGetVal = ((newAssetTreeArr, removedTreeNode)) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          test(
            Log.buildAssertMessage(
              ~expect={j|removedTreeNode should exist|j},
              ~actual={j|not|j},
            ),
            () =>
            removedTreeNode |> Js.Option.isSome |> assertTrue
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  (
    newAssetTreeArr |> ArrayService.getFirst,
    removedTreeNode |> OptionService.unsafeGet,
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

  _iterateAssetTree(targetId, [|assetTreeRoot|], [||], None)
  |> _checkRemovedTreeNodeAndGetVal;
};

let insertSourceTreeNodeToTargetTreeNodeChildren =
    (targetId, newTreeNode, assetTreeRoot) => {
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