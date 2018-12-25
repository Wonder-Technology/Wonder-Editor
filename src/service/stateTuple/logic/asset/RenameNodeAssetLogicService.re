let _renameTextureNode =
    (name, {textureComponent}: NodeAssetType.textureNodeData, engineState) =>
  OperateTextureLogicService.setName(
    ~texture=textureComponent,
    ~name,
    ~engineState,
  );

let _isNameEqualDefaultMaterialName = (type_, name) => {
  open MaterialDataAssetType;

  let defaultName =
    switch (type_) {
    | BasicMaterial =>
      PrepareDefaultComponentLogicService.getDefaultBasicMaterialName()
    | LightMaterial =>
      PrepareDefaultComponentLogicService.getDefaultLightMaterialName()
    };

  name === defaultName;
};

let _renameMaterialNode =
    (
      name,
      {materialComponent, type_}: NodeAssetType.materialNodeData,
      engineState,
    )
    : (Result.RelationResult.t, Wonderjs.StateDataMainType.state) =>
  _isNameEqualDefaultMaterialName(type_, name) ?
    (
      Result.RelationResult.fail(
        {j|material name:$name shouldn't equal default material name|j} |. Some,
      ),
      engineState,
    ) :
    (
      Result.RelationResult.success(),
      OperateMaterialLogicService.setName(
        ~material=materialComponent,
        ~type_,
        ~name,
        ~engineState,
      ),
    );

let _checkParentNode =
    (parentNode, updatedData, engineState, getNodeNameFunc)
    : Result.RelationResult.t =>
  switch (parentNode) {
  | None => Result.RelationResult.success()
  | Some(parentNode) =>
    OperateTreeAssetLogicService.isNodeChildHasTargetName(
      getNodeNameFunc(updatedData),
      parentNode,
      engineState,
    ) ?
      Result.RelationResult.fail(
        "parent node shouldn't has the child with the same name" |. Some,
      ) :
      Result.RelationResult.success()
  };

let _buildNewTree = (parentNode, node, tree) =>
  switch (parentNode) {
  | None => tree
  | Some(parentNode) =>
    tree
    |> OperateTreeAssetService.insertNode(
         NodeAssetService.getNodeId(~node=parentNode),
         node,
       )
  };

let _textureNodeFunc =
    (
      (targetNodeId, name),
      (result, parentNode, tree, engineState),
      nodeId,
      nodeData,
    ) =>
  result
  |> Result.RelationResult.isSuccess
  && NodeAssetService.isIdEqual(nodeId, targetNodeId) ?
    {
      let engineState = _renameTextureNode(name, nodeData, engineState);

      let node =
        TextureNodeAssetService.buildNodeByNodeData(~nodeId, ~nodeData);

      (
        Result.RelationResult.success(),
        parentNode,
        _buildNewTree(parentNode, node, tree),
        engineState,
      );
    } :
    {
      let node =
        TextureNodeAssetService.buildNodeByNodeData(~nodeId, ~nodeData);

      (
        result,
        parentNode,
        _buildNewTree(parentNode, node, tree),
        engineState,
      );
    };

let _materialNodeFunc =
    (
      (targetNodeId, name),
      (result, parentNode, tree, engineState),
      nodeId,
      nodeData,
    ) =>
  result
  |> Result.RelationResult.isSuccess
  && NodeAssetService.isIdEqual(nodeId, targetNodeId) ?
    {
      let (result, engineState) =
        _renameMaterialNode(name, nodeData, engineState);

      let node =
        MaterialNodeAssetService.buildNodeByNodeData(~nodeId, ~nodeData);

      (
        result,
        parentNode,
        _buildNewTree(parentNode, node, tree),
        engineState,
      );
    } :
    {
      let node =
        MaterialNodeAssetService.buildNodeByNodeData(~nodeId, ~nodeData);

      (
        result,
        parentNode,
        _buildNewTree(parentNode, node, tree),
        engineState,
      );
    };

let _wdbNodeFunc =
    (
      (targetNodeId, name),
      (result, parentNode, tree, engineState),
      nodeId,
      nodeData,
    ) =>
  result
  |> Result.RelationResult.isSuccess
  && NodeAssetService.isIdEqual(nodeId, targetNodeId) ?
    {
      let updatedData = WDBNodeAssetService.rename(~name, ~nodeData);

      let node =
        WDBNodeAssetService.buildNodeByNodeData(
          ~nodeId,
          ~nodeData=updatedData,
        );

      (
        _checkParentNode(
          parentNode,
          updatedData,
          engineState,
          WDBNodeAssetService.getNodeName,
        ),
        parentNode,
        _buildNewTree(parentNode, node, tree),
        engineState,
      );
    } :
    {
      let node = WDBNodeAssetService.buildNodeByNodeData(~nodeId, ~nodeData);

      (
        result,
        parentNode,
        _buildNewTree(parentNode, node, tree),
        engineState,
      );
    };

let _folderNodeFunc =
    (
      (targetNodeId, name),
      (result, parentNode, tree, engineState),
      nodeId,
      nodeData,
      children,
    ) =>
  result
  |> Result.RelationResult.isSuccess
  && NodeAssetService.isIdEqual(nodeId, targetNodeId) ?
    {
      let updatedData = FolderNodeAssetService.rename(~name, ~nodeData);

      let node =
        FolderNodeAssetService.buildNodeByNodeData(
          ~nodeId,
          ~nodeData=updatedData,
          ~children,
        );

      (
        _checkParentNode(
          parentNode,
          updatedData,
          engineState,
          FolderNodeAssetService.getNodeName,
        ),
        node |. Some,
        _buildNewTree(parentNode, node, tree),
        engineState,
      );
    } :
    {
      let node =
        FolderNodeAssetService.buildNodeByNodeData(
          ~nodeId,
          ~nodeData,
          ~children,
        );

      (
        result,
        node |. Some,
        _buildNewTree(parentNode, node, tree),
        engineState,
      );
    };

/* TODO test */
let renameNode =
    (targetNodeId, name, (editorState, engineState))
    : Result.SameDataResult.t(
        (EditorType.editorState, Wonderjs.StateDataMainType.state),
      ) => {
  let tree = TreeAssetEditorService.unsafeGetTree(editorState);
  let newTree =
    RootTreeAssetService.getRootNode(tree)
    |> FolderNodeAssetService.clearChildren;
  let parentNode = None;
  let (result, _, updatedTree, engineState) =
    IterateTreeAssetService.fold(
      ~acc=(
        Result.RelationResult.success(),
        parentNode,
        newTree,
        engineState,
      ),
      ~textureNodeFunc=_textureNodeFunc((targetNodeId, name)),
      ~materialNodeFunc=_materialNodeFunc((targetNodeId, name)),
      ~wdbNodeFunc=_wdbNodeFunc((targetNodeId, name)),
      ~folderNodeFunc=_folderNodeFunc((targetNodeId, name)),
      ~tree,
      (),
    );

  switch (result) {
  | Success () =>
    Result.SameDataResult.success((
      updatedTree |> TreeAssetEditorService.setTree(_, editorState),
      engineState,
    ))
  | Fail(msg) =>
    Result.SameDataResult.fail((
      msg |> OptionService.unsafeGet,
      (tree |> TreeAssetEditorService.setTree(_, editorState), engineState),
    ))
  };
};