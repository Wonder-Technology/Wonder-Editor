open NodeAssetType;

let _getTree = (func, editorState) =>
  TreeAssetEditorService.unsafeGetTree(editorState) |> func;

let _getTreeWithLabel = (func, editorState) =>
  func(~tree=TreeAssetEditorService.unsafeGetTree(editorState));

let _getAndSetTree = (func, editorState) =>
  TreeAssetEditorService.unsafeGetTree(editorState)
  |> func
  |> TreeAssetEditorService.setTree(_, editorState);

let findNodeById = (targetNodeId, editorState) =>
  _getTree(OperateTreeAssetService.findNodeById(targetNodeId), editorState);

let unsafeFindNodeById = (targetNodeId, editorState) =>
  _getTree(
    OperateTreeAssetService.unsafeFindNodeById(targetNodeId),
    editorState,
  );

let isNodeExistById = (targetNodeId, editorState) =>
  findNodeById(targetNodeId, editorState) |> Js.Option.isSome;

let findMaterialNode = (targetMaterialComponent, targetType_, editorState) => {
  let predNodeFunc = materialNode => {
    let {materialComponent, type_} =
      MaterialNodeAssetService.getNodeData(materialNode);

    materialComponent === targetMaterialComponent && type_ === targetType_;
  };

  editorState
  |> _getTreeWithLabel(
       IterateTreeAssetService.findOne(
         ~predMaterialNodeFunc=predNodeFunc,
         (),
       ),
     );
};

let findAllTextureNodes = editorState =>
  editorState
  |> _getTreeWithLabel(
       IterateTreeAssetService.find(
         ~predTextureNodeFunc=node => true,
         ~predMaterialNodeFunc=node => false,
         ~predWDBNodeFunc=node => false,
         ~predFolderNodeFunc=node => false,
         (),
       ),
     );

let insertNode = (targetNodeId, newTreeNode, editorState) =>
  _getAndSetTree(
    OperateTreeAssetService.insertNode(targetNodeId, newTreeNode),
    editorState,
  );

let setNodeIsShowChildren = (targetNodeId, isShowChildren, editorState) =>
  _getAndSetTree(
    OperateTreeAssetService.setNodeIsShowChildren(
      targetNodeId,
      isShowChildren,
    ),
    editorState,
  );

let removeNode = (targetNode, editorState) => {
  let newTree =
    TreeAssetEditorService.unsafeGetTree(editorState)
    |> OperateTreeAssetService.removeNode(targetNode);

  TreeAssetEditorService.setTree(newTree, editorState);
};

let removeNodeById = (targetNodeId, editorState) => {
  let (newTree, removedNode) =
    TreeAssetEditorService.unsafeGetTree(editorState)
    |> OperateTreeAssetService.removeNodeById(targetNodeId);

  (newTree |> TreeAssetEditorService.setTree, removedNode);
};

let findNodeParent = (targetNode, editorState) =>
  IterateTreeAssetService.findOne(
    ~tree=TreeAssetEditorService.unsafeGetTree(editorState),
    ~predFolderNodeFunc=
      node =>
        FolderNodeAssetService.findChild(node, targetNode) |> Js.Option.isSome,
    (),
  );

let findNodeParentId = (targetNode, editorState) =>
  findNodeParent(targetNode, editorState)
  |> Js.Option.map((. node) => NodeAssetService.getNodeId(~node));

let getCurrentNode = editorState =>
  CurrentNodeAssetEditorService.getCurrentNodeId(editorState)
  |> Js.Option.map((. nodeId) => unsafeFindNodeById(nodeId, editorState));

let unsafeGetSelectedFolderNodeInAssetTree = editorState =>
  TreeAssetEditorService.getSelectedFolderNodeIdInAssetTree(editorState)
  |> unsafeFindNodeById(_, editorState);