open AssetTreeNodeType;

open AssetNodeType;

let getRootTreeNodeIsShowChildren = () => true;

let getTreeNodeDefaultIsShowChildren = () => false;

let buildAssetTreeNodeByIndex = (index, type_, isShowChildren) => {
  nodeId: index,
  type_,
  children: [||],
  isShowChildren,
};

let isIdEqual = (nodeId, targetNodeId) => nodeId === targetNodeId;

let rec getSpecificTreeNodeById = (nodeId, targetTreeNode) =>
  isIdEqual(nodeId, targetTreeNode.nodeId) ?
    Some(targetTreeNode) :
    {
      let (resultNode, _) =
        targetTreeNode.children
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (. (resultNode, nodeId), child) =>
               switch (resultNode) {
               | Some(_) => (resultNode, nodeId)
               | None => (getSpecificTreeNodeById(nodeId, child), nodeId)
               },
             (None, nodeId),
           );
      resultNode;
    };