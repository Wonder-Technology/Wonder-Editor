open AssetTreeNodeType;

let getWidge = () => EditorType.Asset;

let isWidge = startWidge =>
  switch (startWidge) {
  | None => false
  | Some(startWidge) => startWidge === getWidge()
  };

let getTargetTreeNodeId = editorState =>
  switch (AssetCurrentNodeParentIdEditorService.getCurrentNodeParentId(editorState)) {
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

let deepRemoveTreeNode = removedTreeNode => {
  let rec _iterateRemovedTreeNode = nodeArr =>
    nodeArr
    |> Js.Array.forEach(({id, type_, children}) => {
         switch (type_) {
         | Folder =>
           let editorState = StateEditorService.getState();

           editorState
           |> AssetFolderNodeMapEditorService.getFolderNodeMap
           |> SparseMapService.copy
           |> DomHelper.deleteKeyInDict(id)
           |. AssetFolderNodeMapEditorService.setFolderNodeMap(editorState)
           |> StateEditorService.setState;

         | Texture =>
           let editorState = StateEditorService.getState();

           editorState
           |> AssetTextureNodeMapEditorService.getTextureNodeMap
           |> SparseMapService.copy
           |> DomHelper.deleteKeyInDict(id)
           |. AssetTextureNodeMapEditorService.setTextureNodeMap(editorState)
           |> StateEditorService.setState;
         | Json =>
           let editorState = StateEditorService.getState();

           editorState
           |> AssetJsonNodeMapEditorService.getJsonNodeMap
           |> SparseMapService.copy
           |> DomHelper.deleteKeyInDict(id)
           |. AssetJsonNodeMapEditorService.setJsonNodeMap(editorState)
           |> StateEditorService.setState;
         };

         _iterateRemovedTreeNode(children);
       });

  _iterateRemovedTreeNode([|removedTreeNode|]);
  StateEditorService.getState();
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