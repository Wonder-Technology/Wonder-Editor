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

      (Result.RelationResult.success(), parentNode, tree, engineState);
    } :
    (result, parentNode, tree, engineState);

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

      (result, parentNode, tree, engineState);
    } :
    (result, parentNode, tree, engineState);

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
      let updatedNodeData = WDBNodeAssetService.rename(~name, ~nodeData);

      (
        _checkParentNode(
          parentNode,
          updatedNodeData,
          engineState,
          WDBNodeAssetService.getNodeName,
        ),
        parentNode,
        OperateTreeAssetService.updateNode(
          nodeId,
          updatedNodeData,
          WDBNodeAssetService.buildNodeByNodeData,
          tree,
        ),
        engineState,
      );
    } :
    (result, parentNode, tree, engineState);

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
      let updatedNodeData = FolderNodeAssetService.rename(~name, ~nodeData);

      let node =
        FolderNodeAssetService.buildNodeByNodeData(
          ~nodeId,
          ~nodeData=updatedNodeData,
          ~children,
        );

      (
        _checkParentNode(
          parentNode,
          updatedNodeData,
          engineState,
          FolderNodeAssetService.getNodeName,
        ),
        node |. Some,
        OperateTreeAssetService.updateNode(
          nodeId,
          updatedNodeData,
          FolderNodeAssetService.buildNodeByNodeData(~children),
          tree,
        ),
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

      (result, node |. Some, tree, engineState);
    };

let renameNode =
    (targetNodeId, name, (editorState, engineState))
    : Result.SameDataResult.t(
        (EditorType.editorState, Wonderjs.StateDataMainType.state),
      ) => {
  let tree = TreeAssetEditorService.unsafeGetTree(editorState);
  let parentNode = None;

  let (result, _, updatedTree, engineState) =
    IterateTreeAssetService.fold(
      ~acc=(Result.RelationResult.success(), parentNode, tree, engineState),
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