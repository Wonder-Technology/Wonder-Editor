open TreeAssetType;

let rec cata =
        (
          ~tree,
          ~textureNodeFunc=(nodeId, nodeData) =>
                             TextureNodeAssetService.buildNodeByNodeData(
                               ~nodeId,
                               ~nodeData,
                             ),
          ~materialNodeFunc=(nodeId, nodeData) =>
                              MaterialNodeAssetService.buildNodeByNodeData(
                                ~nodeId,
                                ~nodeData,
                              ),
          ~scriptEventFunctionNodeFunc=(nodeId, nodeData) =>
                                         ScriptEventFunctionNodeAssetService.buildNodeByNodeData(
                                           ~nodeId,
                                           ~nodeData,
                                         ),
          ~scriptAttributeNodeFunc=(nodeId, nodeData) =>
                                     ScriptAttributeNodeAssetService.buildNodeByNodeData(
                                       ~nodeId,
                                       ~nodeData,
                                     ),
          ~wdbNodeFunc=(nodeId, nodeData) =>
                         WDBNodeAssetService.buildNodeByNodeData(
                           ~nodeId,
                           ~nodeData,
                         ),
          ~folderNodeFunc=(nodeId, nodeData, children) =>
                            FolderNodeAssetService.buildNodeByNodeData(
                              ~nodeId,
                              ~nodeData,
                              ~children,
                            ),
          (),
        )
        : 'r => {
  let recurse =
    cata(
      ~textureNodeFunc,
      ~materialNodeFunc,
      ~scriptEventFunctionNodeFunc,
      ~scriptAttributeNodeFunc,
      ~wdbNodeFunc,
      ~folderNodeFunc,
    );

  switch (tree) {
  | ScriptEventFunctionNode(nodeId, scriptEventFunctionNodeData) =>
    scriptEventFunctionNodeFunc(nodeId, scriptEventFunctionNodeData)
  | ScriptAttributeNode(nodeId, scriptAttributeNodeData) =>
    scriptAttributeNodeFunc(nodeId, scriptAttributeNodeData)
  | TextureNode(nodeId, textureNodeData) =>
    textureNodeFunc(nodeId, textureNodeData)
  | MaterialNode(nodeId, materialNodeData) =>
    materialNodeFunc(nodeId, materialNodeData)
  | WDBNode(nodeId, wdbNodeData) => wdbNodeFunc(nodeId, wdbNodeData)
  | FolderNode(nodeId, folderNodeData, children) =>
    folderNodeFunc(
      nodeId,
      folderNodeData,
      children
      |> UIStateAssetService.mapChildren(Js.Array.map, recurse(~tree=_, ())),
    )
  };
};

let rec fold =
        (
          ~folderNodeFunc,
          ~acc,
          ~tree,
          ~seqFoldFunc=WonderCommonlib.ArrayService.reduceOneParam,
          ~textureNodeFunc=(acc, _, _) => acc,
          ~materialNodeFunc=(acc, _, _) => acc,
          ~scriptEventFunctionNodeFunc=(acc, _, _) => acc,
          ~scriptAttributeNodeFunc=(acc, _, _) => acc,
          ~wdbNodeFunc=(acc, _, _) => acc,
          (),
        )
        : 'r => {
  let recurse = (acc, children) =>
    fold(
      ~acc,
      ~tree=children,
      ~seqFoldFunc,
      ~textureNodeFunc,
      ~materialNodeFunc,
      ~scriptEventFunctionNodeFunc,
      ~scriptAttributeNodeFunc,
      ~wdbNodeFunc,
      ~folderNodeFunc,
      (),
    );

  switch (tree) {
  | ScriptEventFunctionNode(nodeId, scriptEventFunctionNodeData) =>
    scriptEventFunctionNodeFunc(acc, nodeId, scriptEventFunctionNodeData)
  | ScriptAttributeNode(nodeId, scriptAttributeNodeData) =>
    scriptAttributeNodeFunc(acc, nodeId, scriptAttributeNodeData)
  | TextureNode(nodeId, textureNodeData) =>
    textureNodeFunc(acc, nodeId, textureNodeData)
  | MaterialNode(nodeId, materialNodeData) =>
    materialNodeFunc(acc, nodeId, materialNodeData)
  | WDBNode(nodeId, wdbNodeData) => wdbNodeFunc(acc, nodeId, wdbNodeData)
  | FolderNode(nodeId, folderNodeData, children) =>
    let localAccum = folderNodeFunc(acc, nodeId, folderNodeData, children);

    UIStateAssetService.fold(seqFoldFunc, recurse, localAccum, children);
  };
};

let rec foldWithParentFolderNode =
        (
          ~folderNodeFunc,
          ~acc,
          ~tree,
          ~seqFoldFunc=WonderCommonlib.ArrayService.reduceOneParam,
          ~textureNodeFunc=(_, acc, _, _) => acc,
          ~materialNodeFunc=(_, acc, _, _) => acc,
          ~scriptEventFunctionNodeFunc=(_, acc, _, _) => acc,
          ~scriptAttributeNodeFunc=(_, acc, _, _) => acc,
          ~wdbNodeFunc=(_, acc, _, _) => acc,
          ~parentFolderNode=None,
          (),
        )
        : 'r => {
  let recurse = (parentFolderNode, acc, children) =>
    foldWithParentFolderNode(
      ~acc,
      ~tree=children,
      ~textureNodeFunc,
      ~materialNodeFunc,
      ~scriptEventFunctionNodeFunc,
      ~scriptAttributeNodeFunc,
      ~wdbNodeFunc,
      ~folderNodeFunc,
      ~parentFolderNode,
      (),
    );

  switch (tree) {
  | ScriptEventFunctionNode(nodeId, scriptEventFunctionNodeData) =>
    scriptEventFunctionNodeFunc(
      parentFolderNode,
      acc,
      nodeId,
      scriptEventFunctionNodeData,
    )
  | ScriptAttributeNode(nodeId, scriptAttributeNodeData) =>
    scriptAttributeNodeFunc(
      parentFolderNode,
      acc,
      nodeId,
      scriptAttributeNodeData,
    )
  | TextureNode(nodeId, textureNodeData) =>
    textureNodeFunc(parentFolderNode, acc, nodeId, textureNodeData)
  | MaterialNode(nodeId, materialNodeData) =>
    materialNodeFunc(parentFolderNode, acc, nodeId, materialNodeData)
  | WDBNode(nodeId, wdbNodeData) =>
    wdbNodeFunc(parentFolderNode, acc, nodeId, wdbNodeData)
  | FolderNode(nodeId, folderNodeData, children) =>
    let localAccum =
      folderNodeFunc(parentFolderNode, acc, nodeId, folderNodeData, children);

    UIStateAssetService.fold(
      seqFoldFunc,
      recurse(
        Some(
          FolderNodeAssetService.buildNodeByNodeData(
            ~nodeId,
            ~nodeData=folderNodeData,
            ~children,
          ),
        ),
      ),
      localAccum,
      children,
    );
  };
};

let rec foldWithHandleBeforeAndAfterFoldChildren =
        (
          ~acc,
          ~tree,
          ~textureNodeFunc,
          ~materialNodeFunc,
          ~scriptEventFunctionNodeFunc,
          ~scriptAttributeNodeFunc,
          ~wdbNodeFunc,
          ~folderNodeFunc,
          ~handleBeforeFoldChildrenFunc,
          ~handleAfterFoldChildrenFunc,
          ~seqFoldFunc=WonderCommonlib.ArrayService.reduceOneParam,
          (),
        )
        : 'r => {
  let recurse = (acc, children) =>
    foldWithHandleBeforeAndAfterFoldChildren(
      ~acc,
      ~tree=children,
      ~textureNodeFunc,
      ~materialNodeFunc,
      ~scriptEventFunctionNodeFunc,
      ~scriptAttributeNodeFunc,
      ~wdbNodeFunc,
      ~folderNodeFunc,
      ~handleBeforeFoldChildrenFunc,
      ~handleAfterFoldChildrenFunc,
      ~seqFoldFunc,
      (),
    );

  switch (tree) {
  | ScriptEventFunctionNode(nodeId, scriptEventFunctionNodeData) =>
    scriptEventFunctionNodeFunc(acc, nodeId, scriptEventFunctionNodeData)
  | ScriptAttributeNode(nodeId, scriptAttributeNodeData) =>
    scriptAttributeNodeFunc(acc, nodeId, scriptAttributeNodeData)
  | TextureNode(nodeId, textureNodeData) =>
    textureNodeFunc(acc, nodeId, textureNodeData)
  | MaterialNode(nodeId, materialNodeData) =>
    materialNodeFunc(acc, nodeId, materialNodeData)
  | WDBNode(nodeId, wdbNodeData) => wdbNodeFunc(acc, nodeId, wdbNodeData)
  | FolderNode(nodeId, folderNodeData, children) =>
    let localAccum = folderNodeFunc(acc, nodeId, folderNodeData, children);

    handleBeforeFoldChildrenFunc(localAccum) ?
      localAccum :
      UIStateAssetService.fold(seqFoldFunc, recurse, localAccum, children)
      |> handleAfterFoldChildrenFunc(nodeId, folderNodeData, children);
  };
};

let filter =
    (
      ~tree,
      ~acc,
      ~pushNodeFunc,
      ~predTextureNodeFunc=node => false,
      ~predMaterialNodeFunc=node => false,
      ~predScriptEventFunctionNodeFunc=node => false,
      ~predScriptAttributeNodeFunc=node => false,
      ~predWDBNodeFunc=node => false,
      ~predFolderNodeFunc=node => false,
      (),
    )
    : 'r => {
  let _nodeFunc = (acc, node, predNodeFunc) =>
    predNodeFunc(node) ? pushNodeFunc(node, acc) : acc;
  let _textureNodeFunc = (acc, nodeId, nodeData) =>
    _nodeFunc(
      acc,
      TextureNodeAssetService.buildNodeByNodeData(~nodeId, ~nodeData),
      predTextureNodeFunc,
    );
  let _materialNodeFunc = (acc, nodeId, nodeData) =>
    _nodeFunc(
      acc,
      MaterialNodeAssetService.buildNodeByNodeData(~nodeId, ~nodeData),
      predMaterialNodeFunc,
    );
  let _scriptEventFunctionNodeFunc = (acc, nodeId, nodeData) =>
    _nodeFunc(
      acc,
      ScriptEventFunctionNodeAssetService.buildNodeByNodeData(
        ~nodeId,
        ~nodeData,
      ),
      predScriptEventFunctionNodeFunc,
    );
  let _scriptAttributeNodeFunc = (acc, nodeId, nodeData) =>
    _nodeFunc(
      acc,
      ScriptAttributeNodeAssetService.buildNodeByNodeData(~nodeId, ~nodeData),
      predScriptAttributeNodeFunc,
    );
  let _wdbNodeFunc = (acc, nodeId, nodeData) =>
    _nodeFunc(
      acc,
      WDBNodeAssetService.buildNodeByNodeData(~nodeId, ~nodeData),
      predWDBNodeFunc,
    );
  let _folderNodeFunc = (acc, nodeId, nodeData, children) =>
    _nodeFunc(
      acc,
      FolderNodeAssetService.buildNodeByNodeData(
        ~nodeId,
        ~nodeData,
        ~children,
      ),
      predFolderNodeFunc,
    );

  fold(
    ~acc,
    ~tree,
    ~textureNodeFunc=_textureNodeFunc,
    ~materialNodeFunc=_materialNodeFunc,
    ~scriptEventFunctionNodeFunc=_scriptEventFunctionNodeFunc,
    ~scriptAttributeNodeFunc=_scriptAttributeNodeFunc,
    ~wdbNodeFunc=_wdbNodeFunc,
    ~folderNodeFunc=_folderNodeFunc,
    (),
  );
};

let find =
    (
      ~tree,
      ~predTextureNodeFunc=node => false,
      ~predMaterialNodeFunc=node => false,
      ~predScriptEventFunctionNodeFunc=node => false,
      ~predScriptAttributeNodeFunc=node => false,
      ~predWDBNodeFunc=node => false,
      ~predFolderNodeFunc=node => false,
      (),
    )
    : 'r =>
  switch (
    filter(
      ~acc=[],
      ~pushNodeFunc=(node, acc) => [node, ...acc],
      ~tree,
      ~predTextureNodeFunc,
      ~predMaterialNodeFunc,
      ~predScriptEventFunctionNodeFunc,
      ~predScriptAttributeNodeFunc,
      ~predWDBNodeFunc,
      ~predFolderNodeFunc,
      (),
    )
  ) {
  | list when List.length(list) === 0 => None
  | list => Some(list)
  };

let findOne =
    (
      ~tree,
      ~predTextureNodeFunc=node => false,
      ~predMaterialNodeFunc=node => false,
      ~predScriptEventFunctionNodeFunc=node => false,
      ~predScriptAttributeNodeFunc=node => false,
      ~predWDBNodeFunc=node => false,
      ~predFolderNodeFunc=node => false,
      (),
    )
    : 'r =>
  find(
    ~tree,
    ~predTextureNodeFunc,
    ~predMaterialNodeFunc,
    ~predScriptEventFunctionNodeFunc,
    ~predScriptAttributeNodeFunc,
    ~predWDBNodeFunc,
    ~predFolderNodeFunc,
    (),
  )
  |> Js.Option.map((. list) => list |> List.hd);

let rec map =
        (
          ~tree,
          ~folderNodeFunc,
          ~textureNodeFunc=(_, nodeData) => nodeData,
          ~materialNodeFunc=(_, nodeData) => nodeData,
          ~scriptEventFunctionNodeFunc=(_, nodeData) => nodeData,
          ~scriptAttributeNodeFunc=(_, nodeData) => nodeData,
          ~wdbNodeFunc=(_, nodeData) => nodeData,
          (),
        )
        : 'r => {
  let recurse =
    map(
      ~textureNodeFunc,
      ~materialNodeFunc,
      ~scriptEventFunctionNodeFunc,
      ~scriptAttributeNodeFunc,
      ~wdbNodeFunc,
      ~folderNodeFunc,
      (),
    );

  switch (tree) {
  | ScriptEventFunctionNode(nodeId, scriptEventFunctionNodeData) =>
    ScriptEventFunctionNode(
      nodeId,
      scriptEventFunctionNodeFunc(nodeId, scriptEventFunctionNodeData),
    )
  | ScriptAttributeNode(nodeId, scriptAttributeNodeData) =>
    ScriptAttributeNode(
      nodeId,
      scriptAttributeNodeFunc(nodeId, scriptAttributeNodeData),
    )
  | TextureNode(nodeId, textureNodeData) =>
    TextureNode(nodeId, textureNodeFunc(nodeId, textureNodeData))
  | MaterialNode(nodeId, materialNodeData) =>
    MaterialNode(nodeId, materialNodeFunc(nodeId, materialNodeData))
  | WDBNode(nodeId, wdbNodeData) =>
    WDBNode(nodeId, wdbNodeFunc(nodeId, wdbNodeData))
  | FolderNode(nodeId, folderNodeData, children) =>
    let (changeStateType, nodeData) = folderNodeFunc(nodeId, folderNodeData);

    FolderNode(
      nodeId,
      nodeData,
      UIStateAssetService.buildByChangeStateType(changeStateType, children)
      |> UIStateAssetService.mapChildren(Js.Array.map, recurse(~tree=_)),
    );
  };
};