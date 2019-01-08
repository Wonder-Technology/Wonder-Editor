let addFolderNodesToTreeByPath = (path, (editorState, engineState)) => {
  let (newTree, newIndex, parentFolderNode) =
    OperateTreeAssetService.addFolderNodesToTreeByPath(
      path,
      NodeNameAssetLogicService.isNodeEqualByName(~engineState),
      TreeAssetEditorService.unsafeGetTree(editorState),
      IndexAssetEditorService.getNodeIndex(editorState),
    );

  (
    editorState
    |> IndexAssetEditorService.setNodeIndex(newIndex)
    |> TreeAssetEditorService.setTree(newTree),
    parentFolderNode,
  );
};

let getNodeNameById = (nodeId, tree, engineState) =>
  OperateTreeAssetService.findNodeById(nodeId, tree)
  |> Js.Option.map((. node) =>
       NodeNameAssetLogicService.getNodeName(node, engineState)
     );

let _includeTargetChild = (folderNode, targetChild, isNodeEqualFunc) =>
  OperateTreeAssetService.findTargetChild(
    folderNode,
    targetChild,
    isNodeEqualFunc,
  )
  |> Js.Option.isSome;

let _isTargetNodeHasSameNameChild = (sourceNode, targetNode, engineState) =>
  _includeTargetChild(
    targetNode,
    sourceNode,
    NodeNameAssetLogicService.isNodeEqualByName(~engineState),
  );

let _canFindOne =
    (
      predTextureNodeFunc,
      predMaterialNodeFunc,
      predWDBNodeFunc,
      predFolderNodeFunc,
      tree,
    ) =>
  IterateTreeAssetService.filter(
    ~acc=[],
    ~pushNodeFunc=(node, acc) => [node, ...acc],
    ~tree,
    ~predTextureNodeFunc,
    ~predMaterialNodeFunc,
    ~predWDBNodeFunc,
    ~predFolderNodeFunc,
    (),
  )
  |> List.length > 0;

let _isSourceNodeBeOneOfAllParentsOfTargetNode = (sourceNode, targetNode) =>
  FolderNodeAssetService.isFolderNode(sourceNode) ?
    {
      let _nodeFunc = node =>
        NodeAssetService.isNodeEqualById(~sourceNode=node, ~targetNode);

      _canFindOne(_nodeFunc, _nodeFunc, _nodeFunc, _nodeFunc, sourceNode);
    } :
    false;

let _isTargetNodeBeSourceNodeParent = (sourceNode, targetNode) =>
  FolderNodeAssetService.isFolderNode(targetNode) ?
    _includeTargetChild(
      targetNode,
      sourceNode,
      NodeAssetService.isNodeEqualById,
    ) :
    false;

let checkNodeRelation =
    (sourceNodeId, targetNodeId, (editorState, engineState))
    : Result.RelationResult.t => {
  let sourceNode =
    OperateTreeAssetEditorService.unsafeFindNodeById(
      sourceNodeId,
      editorState,
    );
  let targetNode =
    OperateTreeAssetEditorService.unsafeFindNodeById(
      targetNodeId,
      editorState,
    );

  ! FolderNodeAssetService.isFolderNode(targetNode) ?
    Fail("target node should be folder" |. Some) :
    NodeAssetService.isNodeEqualById(~sourceNode, ~targetNode) ?
      Fail("source and target node shouldn't be the same" |. Some) :
      _isSourceNodeBeOneOfAllParentsOfTargetNode(sourceNode, targetNode) ?
        Fail(
          "source node shouldn't be one of all parents of the target node"
          |. Some,
        ) :
        _isTargetNodeBeSourceNodeParent(sourceNode, targetNode) ?
          Fail(
            "target node shouldn't be the parent of the source node" |. Some,
          ) :
          _isTargetNodeHasSameNameChild(sourceNode, targetNode, engineState) ?
            Fail(
              "target node shouldn't has the child with the same name of the source node"
              |. Some,
            ) :
            Success();
};

let isNodeChildHasTargetName = (targetName, node, engineState) =>
  FolderNodeAssetService.getChildrenNodes(node)
  |> Js.Array.find(child =>
       NodeNameAssetLogicService.isTargetNameNode(
         ~node=child,
         ~name=targetName,
         ~engineState,
       )
     )
  |> Js.Option.isSome;

let _buildUniqueName = name =>
  switch ([%re {|/(.+)[\s](\d+)$/|}] |> Js.Re.exec(name)) {
  | None => name ++ " 1"

  | Some(result) =>
    let resultArr = Js.Re.matches(result);
    let postfix = resultArr[2] |> int_of_string |> succ |> string_of_int;

    resultArr[1] ++ " " ++ postfix;
  };

let rec getUniqueNodeName = (name, parentFolderNode, engineState) =>
  isNodeChildHasTargetName(name, parentFolderNode, engineState) ?
    getUniqueNodeName(
      _buildUniqueName(name),
      parentFolderNode,
      engineState,
    ) :
    name;