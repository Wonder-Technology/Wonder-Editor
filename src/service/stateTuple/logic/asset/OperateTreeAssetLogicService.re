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

let getNodeNameById = (nodeId, (editorState, engineState)) =>
  OperateTreeAssetEditorService.findNodeById(nodeId, editorState)
  |> Js.Option.map((. node) =>
       NodeNameAssetLogicService.getNodeName(node, engineState)
     );

let unsafeGetNodeNameById = (nodeId, (editorState, engineState)) =>
  getNodeNameById(nodeId, (editorState, engineState))
  |> OptionService.unsafeGet;

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
      predCubemapNodeFunc,
      predMaterialNodeFunc,
      predWDBNodeFunc,
      predScriptEventFunctionNodeFunc,
      predScriptAttributeNodeFunc,
      predAssetBundleNodeFunc,
      predFolderNodeFunc,
      tree,
    ) =>
  IterateTreeAssetService.filter(
    ~acc=[],
    ~pushNodeFunc=(node, acc) => [node, ...acc],
    ~tree,
    ~predTextureNodeFunc,
    ~predCubemapNodeFunc,
    ~predMaterialNodeFunc,
    ~predWDBNodeFunc,
    ~predScriptEventFunctionNodeFunc,
    ~predScriptAttributeNodeFunc,
    ~predAssetBundleNodeFunc,
    ~predFolderNodeFunc,
    (),
  )
  |> List.length > 0;

let _isSourceNodeBeOneOfAllParentsOfTargetNode = (sourceNode, targetNode) =>
  FolderNodeAssetService.isNode(sourceNode) ?
    {
      let _nodeFunc = node =>
        NodeAssetService.isNodeEqualById(~sourceNode=node, ~targetNode);

      _canFindOne(
        _nodeFunc,
        _nodeFunc,
        _nodeFunc,
        _nodeFunc,
        _nodeFunc,
        _nodeFunc,
        _nodeFunc,
        _nodeFunc,
        sourceNode,
      );
    } :
    false;

let _isTargetNodeBeSourceNodeParent = (sourceNode, targetNode) =>
  FolderNodeAssetService.isNode(targetNode) ?
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

  !FolderNodeAssetService.isNode(targetNode) ?
    Fail("target node should be folder"->Some) :
    NodeAssetService.isNodeEqualById(~sourceNode, ~targetNode) ?
      Fail("source and target node shouldn't be the same"->Some) :
      _isSourceNodeBeOneOfAllParentsOfTargetNode(sourceNode, targetNode) ?
        Fail(
          "source node shouldn't be one of all parents of the target node"
          ->Some,
        ) :
        _isTargetNodeBeSourceNodeParent(sourceNode, targetNode) ?
          Fail(
            "target node shouldn't be the parent of the source node"->Some,
          ) :
          _isTargetNodeHasSameNameChild(sourceNode, targetNode, engineState) ?
            Fail(
              "target node shouldn't has the child with the same name of the source node"
              ->Some,
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
  | None => {j|$(name) 1|j}
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

let rec getUniqueScriptEventFunctionNodeName =
        (name, parentFolderNode, (editorState, engineState)) =>
  isNodeChildHasTargetName(name, parentFolderNode, engineState)
  || ScriptEventFunctionNodeAssetEditorService.isTreeScriptEventFunctionNodesHasTargetName(
       name,
       editorState,
     ) ?
    getUniqueScriptEventFunctionNodeName(
      _buildUniqueName(name),
      parentFolderNode,
      (editorState, engineState),
    ) :
    name;

let rec getUniqueScriptAttributeNodeName =
        (name, parentFolderNode, (editorState, engineState)) =>
  isNodeChildHasTargetName(name, parentFolderNode, engineState)
  || ScriptAttributeNodeAssetEditorService.isTreeScriptAttributeNodesHasTargetName(
       name,
       editorState,
     ) ?
    getUniqueScriptAttributeNodeName(
      _buildUniqueName(name),
      parentFolderNode,
      (editorState, engineState),
    ) :
    name;

let rec getUniqueScriptAttributeFieldName = (name, attribute) =>
  ScriptAttributeEngineService.hasScriptAttributeField(name, attribute) ?
    getUniqueScriptAttributeFieldName(_buildUniqueName(name), attribute) :
    name;

let rec getUniqueIMGUIExecFuncDataNodeName =
        (name, parentFolderNode, (editorState, engineState)) =>
  isNodeChildHasTargetName(name, parentFolderNode, engineState)
  || IMGUIExecFuncDataNodeAssetEditorService.isTreeIMGUIExecFuncDataNodesHasTargetName(
       name,
       editorState,
     ) ?
    getUniqueIMGUIExecFuncDataNodeName(
      _buildUniqueName(name),
      parentFolderNode,
      (editorState, engineState),
    ) :
    name;

let rec getUniqueIMGUISkinNodeName =
        (name, parentFolderNode, (editorState, engineState)) =>
  isNodeChildHasTargetName(name, parentFolderNode, engineState)
  || IMGUISkinNodeAssetEditorService.isTreeIMGUISkinNodesHasTargetName(
       name,
       editorState,
     ) ?
    getUniqueIMGUISkinNodeName(
      _buildUniqueName(name),
      parentFolderNode,
      (editorState, engineState),
    ) :
    name;

let rec getUniqueIMGUICustomControlNodeName =
        (name, parentFolderNode, (editorState, engineState)) =>
  isNodeChildHasTargetName(name, parentFolderNode, engineState)
  || IMGUICustomControlNodeAssetEditorService.isTreeIMGUICustomControlNodesHasTargetName(
       name,
       editorState,
     ) ?
    getUniqueIMGUICustomControlNodeName(
      _buildUniqueName(name),
      parentFolderNode,
      (editorState, engineState),
    ) :
    name;

let findNodeByName = (targetNodeName, (editorState, engineState)) => {
  let predNodeFunc = node =>
    NodeNameAssetLogicService.isTargetNameNode(
      ~node,
      ~name=targetNodeName,
      ~engineState,
    );

  IterateTreeAssetService.findOne(
    ~tree=TreeAssetEditorService.unsafeGetTree(editorState),
    ~predScriptEventFunctionNodeFunc=predNodeFunc,
    ~predScriptAttributeNodeFunc=predNodeFunc,
    ~predTextureNodeFunc=predNodeFunc,
    ~predCubemapNodeFunc=predNodeFunc,
    ~predMaterialNodeFunc=predNodeFunc,
    ~predWDBNodeFunc=predNodeFunc,
    ~predAssetBundleNodeFunc=predNodeFunc,
    ~predFolderNodeFunc=predNodeFunc,
    (),
  );
};

let findNodeIdByName = (targetNodeName, (editorState, engineState)) =>
  findNodeByName(targetNodeName, (editorState, engineState))
  |> Js.Option.map((. node) => NodeAssetService.getNodeId(~node));

let findNodesByName = (targetNodeName, (editorState, engineState)) => {
  let predNodeFunc = node =>
    NodeNameAssetLogicService.isTargetNameNode(
      ~node,
      ~name=targetNodeName,
      ~engineState,
    );

  IterateTreeAssetService.find(
    ~tree=TreeAssetEditorService.unsafeGetTree(editorState),
    ~predScriptEventFunctionNodeFunc=predNodeFunc,
    ~predScriptAttributeNodeFunc=predNodeFunc,
    ~predTextureNodeFunc=predNodeFunc,
    ~predCubemapNodeFunc=predNodeFunc,
    ~predMaterialNodeFunc=predNodeFunc,
    ~predWDBNodeFunc=predNodeFunc,
    ~predAssetBundleNodeFunc=predNodeFunc,
    ~predFolderNodeFunc=predNodeFunc,
    (),
  );
};

let findNodeIdsByName = (targetNodeName, (editorState, engineState)) =>
  findNodesByName(targetNodeName, (editorState, engineState))
  |> Js.Option.map((. nodes) =>
       nodes |> List.map(node => NodeAssetService.getNodeId(~node))
     );