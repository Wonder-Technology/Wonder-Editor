open TreeAssetType;

open NodeAssetType;

let setNodeIsShowChildren = (targetNodeId, isShowChildren, tree) => {
  let _folderNodeFunc = (nodeId, nodeData) =>
    NodeAssetService.isIdEqual(nodeId, targetNodeId) ?
      (
        isShowChildren ?
          UIStateAssetType.ChangeToShow : UIStateAssetType.ChangeToHide,
        nodeData,
      ) :
      (UIStateAssetType.NotChange, nodeData);

  IterateTreeAssetService.map(~folderNodeFunc=_folderNodeFunc, ~tree, ());
};

let findNodeById = (targetNodeId, tree) => {
  let predNodeFunc = node =>
    NodeAssetService.isIdEqual(
      NodeAssetService.getNodeId(~node),
      targetNodeId,
    );

  IterateTreeAssetService.findOne(
    ~tree,
    ~predTextureNodeFunc=predNodeFunc,
    ~predCubemapNodeFunc=predNodeFunc,
    ~predMaterialNodeFunc=predNodeFunc,
    ~predScriptEventFunctionNodeFunc=predNodeFunc,
    ~predScriptAttributeNodeFunc=predNodeFunc,
    ~predWDBNodeFunc=predNodeFunc,
    ~predAssetBundleNodeFunc=predNodeFunc,
    ~predFolderNodeFunc=predNodeFunc,
    (),
  );
};

let unsafeFindNodeById = (targetNodeId, tree) =>
  findNodeById(targetNodeId, tree) |> OptionService.unsafeGet;

let insertNode = (targetNodeId, newTreeNode, tree) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|new tree node not exist in tree|j},
                ~actual={j|exist|j},
              ),
              () =>
              findNodeById(
                NodeAssetService.getNodeId(~node=newTreeNode),
                tree,
              )
              |> Js.Option.isNone
              |> assertTrue
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  let _folderNodeFunc = (nodeId, nodeData, children) =>
    FolderNodeAssetService.buildNodeByNodeData(
      ~nodeId,
      ~nodeData,
      ~children=
        NodeAssetService.isIdEqual(nodeId, targetNodeId) ?
          children
          |> UIStateAssetService.map(children =>
               children |> Js.Array.copy |> ArrayService.push(newTreeNode)
             ) :
          children,
    );

  IterateTreeAssetService.cata(~tree, ~folderNodeFunc=_folderNodeFunc, ());
};

let findTargetChild = (folderNode, targetChild, isNodeEqualFunc) =>
  FolderNodeAssetService.getChildrenNodes(folderNode)
  |> Js.Array.find(child =>
       isNodeEqualFunc(~sourceNode=child, ~targetNode=targetChild)
     );

let removeNode = (targetNode, tree) => {
  let targetNodeId = NodeAssetService.getNodeId(~node=targetNode);

  let _folderNodeFunc = (nodeId, nodeData, children) =>
    FolderNodeAssetService.buildNodeByNodeData(
      ~nodeId,
      ~nodeData,
      ~children=
        children |> FolderNodeAssetService.filterChildrenById(targetNodeId),
    );

  IterateTreeAssetService.cata(~tree, ~folderNodeFunc=_folderNodeFunc, ());
};

let removeNodeById = (targetNodeId, tree) => {
  let _folderNodeFunc = (nodeId, nodeData, children) =>
    FolderNodeAssetService.buildNodeByNodeData(
      ~nodeId,
      ~nodeData,
      ~children=
        children |> FolderNodeAssetService.filterChildrenById(targetNodeId),
    );

  let removedNode = unsafeFindNodeById(targetNodeId, tree);

  (
    IterateTreeAssetService.cata(~tree, ~folderNodeFunc=_folderNodeFunc, ()),
    removedNode,
  );
};

let replaceNode = (targetNodeId, newTreeNode, tree) => {
  let _nodeFunc = (nodeId, nodeData, buildNodeByNodeDataFunc) =>
    nodeId === targetNodeId ?
      newTreeNode : buildNodeByNodeDataFunc(~nodeId, ~nodeData);
  let _textureNodeFunc = (nodeId, nodeData) =>
    _nodeFunc(nodeId, nodeData, TextureNodeAssetService.buildNodeByNodeData);
  let _cubemapNodeFunc = (nodeId, nodeData) =>
    _nodeFunc(nodeId, nodeData, CubemapNodeAssetService.buildNodeByNodeData);
  let _materialNodeFunc = (nodeId, nodeData) =>
    _nodeFunc(nodeId, nodeData, MaterialNodeAssetService.buildNodeByNodeData);
  let _scriptEventFunctionNodeFunc = (nodeId, nodeData) =>
    _nodeFunc(
      nodeId,
      nodeData,
      ScriptEventFunctionNodeAssetService.buildNodeByNodeData,
    );
  let _scriptAttributeNodeFunc = (nodeId, nodeData) =>
    _nodeFunc(
      nodeId,
      nodeData,
      ScriptAttributeNodeAssetService.buildNodeByNodeData,
    );
  let _wdbNodeFunc = (nodeId, nodeData) =>
    _nodeFunc(nodeId, nodeData, WDBNodeAssetService.buildNodeByNodeData);
  let _assetBundleNodeFunc = (nodeId, nodeData) =>
    _nodeFunc(
      nodeId,
      nodeData,
      AssetBundleNodeAssetService.buildNodeByNodeData,
    );
  let _folderNodeFunc = (nodeId, nodeData, children) =>
    _nodeFunc(
      nodeId,
      nodeData,
      FolderNodeAssetService.buildNodeByNodeData(~children),
    );

  IterateTreeAssetService.cata(
    ~tree,
    ~textureNodeFunc=_textureNodeFunc,
    ~cubemapNodeFunc=_cubemapNodeFunc,
    ~materialNodeFunc=_materialNodeFunc,
    ~scriptEventFunctionNodeFunc=_scriptEventFunctionNodeFunc,
    ~scriptAttributeNodeFunc=_scriptAttributeNodeFunc,
    ~wdbNodeFunc=_wdbNodeFunc,
    ~assetBundleNodeFunc=_assetBundleNodeFunc,
    ~folderNodeFunc=_folderNodeFunc,
    (),
  );
};

let updateNode = (nodeId, nodeData, buildNodeByNodeDataFunc, tree) =>
  tree |> replaceNode(nodeId, buildNodeByNodeDataFunc(~nodeId, ~nodeData));

let _getFolderPathArr = folderPath =>
  folderPath
  |> FileNameService.removePathPostfix
  |> Js.String.split("/")
  |> WonderLog.Contract.ensureCheck(
       pathArr =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|contain root node|j},
                   ~actual={j|not|j},
                 ),
                 () => {
                   pathArr |> Js.Array.length >= 1;
                   pathArr[0] ==^ RootTreeAssetService.getAssetTreeRootName();
                 },
               )
             )
           )
         ),
       StateEditorService.getStateIsDebug(),
     );

let _buildTreeByFolderPath = (folderPathArr, index) => {
  let (rootNodeId, rootNode, newIndex) =
    RootTreeAssetService.buildRootNode(
      RootTreeAssetService.getAssetTreeRootName(),
      index,
    );

  let (_, tree, newIndex) =
    folderPathArr
    |> Js.Array.sliceFrom(1)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (parentFolderNodeId, tree, newIndex), folderNodeName) => {
           let (newIndex, id) = IdAssetService.generateNodeId(newIndex);

           (
             id,
             FolderNodeAssetService.buildNode(
               ~nodeId=id,
               ~name=folderNodeName,
               (),
             )
             |> insertNode(parentFolderNodeId, _, tree),
             newIndex,
           );
         },
         (rootNodeId, rootNode, newIndex),
       );

  (tree, newIndex);
};

let _mergeTreeByFolderNodeName =
    (isNodeEqualByName, tree1, onlyFolderNodeTree) => {
  let _folderNodeFunc =
      ((parentFolderNodeInNewTree, newTree), nodeId, nodeData, children) =>
    switch (parentFolderNodeInNewTree) {
    | None => (RootTreeAssetService.getRootNode(newTree)->Some, newTree)
    | Some(parentFolderNodeInNewTree) =>
      let node =
        FolderNodeAssetService.buildNodeByNodeData(
          ~nodeId,
          ~nodeData,
          ~children,
        );

      let targetChildFolderNodeInNewTree =
        findTargetChild(parentFolderNodeInNewTree, node, isNodeEqualByName);

      switch (targetChildFolderNodeInNewTree) {
      | Some(targetChildFolderNodeInNewTree) => (
          Some(targetChildFolderNodeInNewTree),
          newTree,
        )
      | None => (
          node->Some,
          insertNode(
            NodeAssetService.getNodeId(~node=parentFolderNodeInNewTree),
            node,
            newTree,
          ),
        )
      };
    };

  /* let (parentFolderNodeInNewTree, newTree) = */
  IterateTreeAssetService.fold(
    ~acc=(None, tree1),
    ~tree=onlyFolderNodeTree,
    ~folderNodeFunc=_folderNodeFunc,
    (),
  );
  /* newTree; */
};

let _unsafeFindFolderNodeByName = (targetFolderNodeName, tree) =>
  IterateTreeAssetService.findOne(
    ~tree,
    ~predFolderNodeFunc=
      node =>
        FolderNodeAssetService.getNodeName(
          FolderNodeAssetService.getNodeData(node),
        )
        === targetFolderNodeName,
    (),
  )
  |> OptionService.unsafeGet;

let addFolderNodesToTreeByPath = (path, isNodeEqualByName, tree, index) => {
  let pathArr = path |> _getFolderPathArr;
  let (newTree, newIndex) = _buildTreeByFolderPath(pathArr, index);
  let (parentFolderNodeInNewTree, newTree) =
    _mergeTreeByFolderNodeName(isNodeEqualByName, tree, newTree);

  (newTree, newIndex, parentFolderNodeInNewTree |> OptionService.unsafeGet);
};