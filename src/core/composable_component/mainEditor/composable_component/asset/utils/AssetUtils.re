open AssetTreeNodeType;

let increaseIndex = (editorState) => {
  let nextIndex = AssetEditorService.getIndex(editorState) + 1;
  (nextIndex, editorState |> AssetEditorService.setIndex(nextIndex))
};

let getRootTreeNode = (editorState) =>
  editorState |> AssetEditorService.unsafeGetAssetTree |> ArrayService.getFirst;

let getRootTreeNodeId = (editorState) =>
  switch (editorState |> AssetEditorService.getAssetTree) {
  | None => 0
  | Some(assetTree) =>
    assetTree |> ArrayService.getFirst |> ((treeNode: assetTreeNodeType) => treeNode.id)
  };

let getTargetTreeNodeId = (editorState) =>
  switch (editorState |> AssetEditorService.getCurrentTreeNode) {
  | None => editorState |> getRootTreeNodeId
  | Some(id) => id
  };

let isIdEqual = (id, targetId) => id === targetId;

let isTargetIdEqualRootId = (editorState) =>
  isIdEqual(editorState |> getTargetTreeNodeId, editorState |> getRootTreeNodeId);

let rec getSpecificTreeNodeById = (id, node) =>
  isIdEqual(id, node.id) ?
    Some(node) :
    node.children
    |> Js.Array.reduce(
         (resultNode, child) =>
           switch resultNode {
           | Some(_) => resultNode
           | None => getSpecificTreeNodeById(id, child)
           },
         None
       );

/* let rec isTreeNodeRelationError = (targetId, removedTreeNode) =>
   isIdEqual(targetId, removedTreeNode.id) ?
     true :
     targetTreeNode.children
     |> Js.Array.reduce(
          (result, child) => result ? true : isTreeNodeRelationError(targetId, child),
          false
        ); */
let isTreeNodeRelationError = (targetId, removedId, (editorState, engineState)) => {
  let rec _iterateTreeNode = (targetId, removedTreeNode) =>
    isIdEqual(targetId, removedTreeNode.id) ?
      true :
      removedTreeNode.children
      |> Js.Array.reduce(
           (result, child) => result ? true : _iterateTreeNode(targetId, child),
           false
         );
  _iterateTreeNode(
    targetId,
    StateEditorService.getState()
    |> getRootTreeNode
    |> getSpecificTreeNodeById(removedId)
    |> Js.Option.getExn
  )
};

let _getTreeNodeName = (index) =>
  index === (getRootTreeNodeId |> StateLogicService.getEditorState) ? "Asset" : "newFolder";

let buildAssetTreeNodeByIndex = (index) => {
  id: index,
  name: _getTreeNodeName(index),
  imgArray: [||],
  jsonArray: [||],
  children: [||]
};

let buildAssetTree = (editorState) =>
  switch (AssetEditorService.getAssetTree(editorState)) {
  | None => [|editorState |> AssetEditorService.getIndex |> buildAssetTreeNodeByIndex|]
  | Some(assetTree) => assetTree
  };

let removeSpecificTreeNodeFromAssetTree = (targetId, assetTree) => {
  let rec _iterateAssetTree = (targetId, assetTree, newAssetTree, removedTreeNode) =>
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
  switch (_iterateAssetTree(targetId, assetTree, [||], None)) {
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
  | (newAssetTree, Some(removedTreeNode)) => (newAssetTree, removedTreeNode)
  }
};

let rec insertNewTreeNodeToTargetTreeNode = (targetId, newTreeNode, assetTree) =>
  assetTree
  |> Js.Array.map(
       ({id, children} as treeNode) =>
         isIdEqual(id, targetId) ?
           {...treeNode, children: children |> Js.Array.copy |> ArrayService.push(newTreeNode)} :
           {
             ...treeNode,
             children: insertNewTreeNodeToTargetTreeNode(targetId, newTreeNode, children)
           }
     );

let rec removeFileFromTargetTreeNode = (targetId, fileId, type_, assetTree) =>
  assetTree
  |> Js.Array.map(
       ({id, children, imgArray, jsonArray} as treeNode) =>
         isIdEqual(id, targetId) ?
           switch type_ {
           | FileType.Json => {
               ...treeNode,
               jsonArray: jsonArray |> Js.Array.copy |> Js.Array.filter((id) => id !== fileId)
             }
           | FileType.Image => {
               ...treeNode,
               imgArray: imgArray |> Js.Array.copy |> Js.Array.filter((id) => id !== fileId)
             }
           } :
           {...treeNode, children: removeFileFromTargetTreeNode(targetId, fileId, type_, children)}
     );

let rec addFileIntoTargetTreeNode = (targetId, fileId, type_, assetTree) =>
  assetTree
  |> Js.Array.map(
       ({id, children, imgArray, jsonArray} as treeNode) =>
         isIdEqual(id, targetId) ?
           switch type_ {
           | FileType.Json => {
               ...treeNode,
               jsonArray: jsonArray |> Js.Array.copy |> ArrayService.push(fileId)
             }
           | FileType.Image => {
               ...treeNode,
               imgArray: imgArray |> Js.Array.copy |> ArrayService.push(fileId)
             }
           } :
           {...treeNode, children: addFileIntoTargetTreeNode(targetId, fileId, type_, children)}
     );

let rec renameSpecificTreeNode = (targetId, newName, assetTree) =>
  assetTree
  |> Js.Array.map(
       ({id, name, children} as treeNode) =>
         isIdEqual(id, targetId) ?
           {...treeNode, name: newName} :
           {...treeNode, children: renameSpecificTreeNode(targetId, newName, children)}
     );