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
    (parentFolderNode, nodeName, engineState): Result.RelationResult.t =>
  switch (parentFolderNode) {
  | None => Result.RelationResult.success()
  | Some(parentFolderNode) =>
    OperateTreeAssetLogicService.isNodeChildHasTargetName(
      nodeName,
      parentFolderNode,
      engineState,
    ) ?
      Result.RelationResult.fail(
        LanguageUtils.getMessageLanguageDataByType(
          "asset-rename-node",
          LanguageEditorService.unsafeGetType
          |> StateLogicService.getEditorState,
        )
        ->Some,
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

let _renameMaterialNode =
    (
      (targetNodeId, name),
      parentFolderNode,
      (tree, engineState),
      {materialComponent, type_}: NodeAssetType.materialNodeData,
    ) => {
  let (result, engineState) =
    _isNameEqualDefaultMaterialName(type_, name) ?
      (
        Result.RelationResult.fail(
          LanguageUtils.getMessageLanguageDataByType(
            "asset-rename-material",
            LanguageEditorService.unsafeGetType
            |> StateLogicService.getEditorState,
          )
          ->Some,
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
};

let _materialNodeFunc =
    (
      (targetNodeId, name),
      parentFolderNode,
      (result, tree, engineState),
      nodeId,
      nodeData,
    ) =>
  result
  |> Result.RelationResult.isSuccess
  && NodeAssetService.isIdEqual(nodeId, targetNodeId) ?
    _renameMaterialNode(
      (targetNodeId, name),
      parentFolderNode,
      (tree, engineState),
      nodeData,
    ) :
    (result, tree, engineState);

let _scriptEventFunctionNodeFunc =
    (
      (targetNodeId, name),
      parentFolderNode,
      (result, tree, engineState),
      nodeId,
      nodeData,
    ) =>
  result
  |> Result.RelationResult.isSuccess
  && NodeAssetService.isIdEqual(nodeId, targetNodeId) ?
    {
      let (result, newTree) =
        switch (
          _checkParentNode(parentFolderNode, name, engineState)
          |> Result.RelationResult.handleSuccess(() =>
               ScriptEventFunctionNodeNameAssetService.isTreeScriptEventFunctionNodesHasTargetName(
                 name,
                 tree,
               ) ?
                 Result.RelationResult.fail(
                   LanguageUtils.getMessageLanguageDataByType(
                     "asset-rename-scriptEventFunction",
                     LanguageEditorService.unsafeGetType
                     |> StateLogicService.getEditorState,
                   )
                   ->Some,
                 ) :
                 Result.RelationResult.success()
             )
        ) {
        | Success () as result => (
            result,
            OperateTreeAssetService.updateNode(
              nodeId,
              ScriptEventFunctionNodeNameAssetService.rename(
                ~name,
                ~nodeData,
              ),
              ScriptEventFunctionNodeAssetService.buildNodeByNodeData,
              tree,
            ),
          )
        | Fail(msg) as result => (result, tree)
        };

      (result, newTree, engineState);
    } :
    (result, tree, engineState);

let _scriptAttributeNodeFunc =
    (
      (targetNodeId, newName),
      parentFolderNode,
      (result, tree, engineState),
      nodeId,
      nodeData,
    ) =>
  result
  |> Result.RelationResult.isSuccess
  && NodeAssetService.isIdEqual(nodeId, targetNodeId) ?
    switch (
      _checkParentNode(parentFolderNode, newName, engineState)
      |> Result.RelationResult.handleSuccess(() =>
           ScriptAttributeNodeNameAssetService.isTreeScriptAttributeNodesHasTargetName(
             newName,
             tree,
           ) ?
             Result.RelationResult.fail(
               LanguageUtils.getMessageLanguageDataByType(
                 "asset-rename-scriptAttribute",
                 LanguageEditorService.unsafeGetType
                 |> StateLogicService.getEditorState,
               )
               ->Some,
             ) :
             Result.RelationResult.success()
         )
    ) {
    | Success () as result =>
      let oldName =
        ScriptAttributeNodeAssetService.getNodeNameByData(nodeData);
      let attribute =
        ScriptAttributeNodeAssetService.getAttributeByData(nodeData);

      (
        result,
        OperateTreeAssetService.updateNode(
          nodeId,
          ScriptAttributeNodeNameAssetService.rename(
            ~name=newName,
            ~nodeData,
          ),
          ScriptAttributeNodeAssetService.buildNodeByNodeData,
          tree,
        ),
        engineState
        |> ScriptEngineService.replaceAttributeInAllScriptComponents(
             (oldName, newName),
             attribute,
           ),
      );
    | Fail(msg) as result => (result, tree, engineState)
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

let _assetBundleNodeFunc =
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
                AssetBundleNodeAssetService.rename(~name, ~nodeData),
                AssetBundleNodeAssetService.buildNodeByNodeData,
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
    (result, tree, engineState);

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
      ~scriptEventFunctionNodeFunc=
        _scriptEventFunctionNodeFunc((targetNodeId, name)),
      ~scriptAttributeNodeFunc=_scriptAttributeNodeFunc((targetNodeId, name)),
      ~wdbNodeFunc=_wdbNodeFunc((targetNodeId, name)),
      ~assetBundleNodeFunc=_assetBundleNodeFunc((targetNodeId, name)),
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