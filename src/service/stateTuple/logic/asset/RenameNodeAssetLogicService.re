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

let _checkParentNode =
    (parentFolderNode, nodeName, engineState)
    : Result.RelationResult.t =>
  switch (parentFolderNode) {
  | None => Result.RelationResult.success()
  | Some(parentFolderNode) =>
    OperateTreeAssetLogicService.isNodeChildHasTargetName(
      nodeName,
      parentFolderNode,
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
      parentFolderNode,
      (result, tree, engineState),
      nodeId,
      {textureComponent}: NodeAssetType.textureNodeData,
    ) =>
  result
  |> Result.RelationResult.isSuccess
  && NodeAssetService.isIdEqual(nodeId, targetNodeId) ?
    {
      let (result, engineState) =
        switch (_checkParentNode(parentFolderNode, name, engineState)) {
        | Success () as result => (
            result,
            OperateTextureLogicService.setName(
              ~texture=textureComponent,
              ~name,
              ~engineState,
            ),
          )
        | Fail(msg) as result => (result, engineState)
        };

      (result, tree, engineState);
    } :
    (result, tree, engineState);

let _materialNodeFunc =
    (
      (targetNodeId, name),
      parentFolderNode,
      (result, tree, engineState),
      nodeId,
      {materialComponent, type_}: NodeAssetType.materialNodeData,
    ) =>
  result
  |> Result.RelationResult.isSuccess
  && NodeAssetService.isIdEqual(nodeId, targetNodeId) ?
    {
      let (result, engineState) =
        _isNameEqualDefaultMaterialName(type_, name) ?
          (
            Result.RelationResult.fail(
              {j|material name:$name shouldn't equal default material name|j}
              |. Some,
            ),
            engineState,
          ) :
          (
            switch (_checkParentNode(parentFolderNode, name, engineState)) {
            | Success () as result => (
                result,
                OperateMaterialLogicService.setName(
                  ~material=materialComponent,
                  ~type_,
                  ~name,
                  ~engineState,
                ),
              )

            | Fail(msg) as result => (result, engineState)
            }
          );

      (result, tree, engineState);
    } :
    (result, tree, engineState);

let _wdbNodeFunc =
    (
      (targetNodeId, name),
      parentFolderNode,
      (result, tree, engineState),
      nodeId,
      nodeData,
    ) => {
  let (result, newTree, engineState) =
    result
    |> Result.RelationResult.isSuccess
    && NodeAssetService.isIdEqual(nodeId, targetNodeId) ?
      {
        let (result, newTree) =
          switch (_checkParentNode(parentFolderNode, name, engineState)) {
          | Success () as result => (
              result,
              OperateTreeAssetService.updateNode(
                nodeId,
                WDBNodeAssetService.rename(~name, ~nodeData),
                WDBNodeAssetService.buildNodeByNodeData,
                tree,
              ),
            )

          | Fail(msg) as result => (result, tree)
          };

        (result, newTree, engineState);
      } :
      (result, tree, engineState);

  (result, newTree, engineState);
};

let _folderNodeFunc =
    (
      (targetNodeId, name),
      parentFolderNode,
      (result, tree, engineState),
      nodeId,
      nodeData,
      children,
    ) =>
  result
  |> Result.RelationResult.isSuccess
  && NodeAssetService.isIdEqual(nodeId, targetNodeId) ?
    {
      let (result, newTree) =
        switch (_checkParentNode(parentFolderNode, name, engineState)) {
        | Success () as result => (
            result,
            OperateTreeAssetService.updateNode(
              nodeId,
              FolderNodeAssetService.rename(~name, ~nodeData),
              FolderNodeAssetService.buildNodeByNodeData(~children),
              tree,
            ),
          )

        | Fail(msg) as result => (result, tree)
        };

      (result, newTree, engineState);
    } :
    {
      let node =
        FolderNodeAssetService.buildNodeByNodeData(
          ~nodeId,
          ~nodeData,
          ~children,
        );

      (result, tree, engineState);
    };

let renameNode =
    (targetNodeId, name, (editorState, engineState))
    : Result.SameDataResult.t(
        (EditorType.editorState, Wonderjs.StateDataMainType.state),
      ) => {
  let tree = TreeAssetEditorService.unsafeGetTree(editorState);

  let (result, updatedTree, engineState) =
    IterateTreeAssetService.foldWithParentFolderNode(
      ~acc=(Result.RelationResult.success(), tree, engineState),
      ~textureNodeFunc=_textureNodeFunc((targetNodeId, name)),
      ~materialNodeFunc=_materialNodeFunc((targetNodeId, name)),
      ~wdbNodeFunc=_wdbNodeFunc((targetNodeId, name)),
      ~folderNodeFunc=_folderNodeFunc((targetNodeId, name)),
      ~parentFolderNode=None,
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