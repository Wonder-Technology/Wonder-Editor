open TreeAssetType;

let rec cata =
        (
          ~tree,
          ~textureNodeFunc=(nodeId, nodeData) =>
                             TextureNodeAssetService.buildNodeByNodeData(
                               ~nodeId,
                               ~nodeData,
                             ),
          ~cubemapNodeFunc=(nodeId, nodeData) =>
                             CubemapNodeAssetService.buildNodeByNodeData(
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
          ~assetBundleNodeFunc=(nodeId, nodeData) =>
                                 AssetBundleNodeAssetService.buildNodeByNodeData(
                                   ~nodeId,
                                   ~nodeData,
                                 ),
          ~imguiExecFuncDataNodeFunc=(nodeId, nodeData) =>
                                       IMGUIExecFuncDataNodeAssetService.buildNodeByNodeData(
                                         ~nodeId,
                                         ~nodeData,
                                       ),
          ~imguiSkinNodeFunc=(nodeId, nodeData) =>
                               IMGUISkinNodeAssetService.buildNodeByNodeData(
                                 ~nodeId,
                                 ~nodeData,
                               ),
          ~imguiCustomControlNodeFunc=(nodeId, nodeData) =>
                                        IMGUICustomControlNodeAssetService.buildNodeByNodeData(
                                          ~nodeId,
                                          ~nodeData,
                                        ),
          ~fntNodeFunc=(nodeId, nodeData) =>
                         FntNodeAssetService.buildNodeByNodeData(
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
      ~cubemapNodeFunc,
      ~materialNodeFunc,
      ~scriptEventFunctionNodeFunc,
      ~scriptAttributeNodeFunc,
      ~wdbNodeFunc,
      ~assetBundleNodeFunc,
      ~imguiExecFuncDataNodeFunc,
      ~imguiSkinNodeFunc,
      ~imguiCustomControlNodeFunc,
      ~fntNodeFunc,
      ~folderNodeFunc,
    );

  switch (tree) {
  | ScriptEventFunctionNode(nodeId, scriptEventFunctionNodeData) =>
    scriptEventFunctionNodeFunc(nodeId, scriptEventFunctionNodeData)
  | ScriptAttributeNode(nodeId, scriptAttributeNodeData) =>
    scriptAttributeNodeFunc(nodeId, scriptAttributeNodeData)
  | TextureNode(nodeId, textureNodeData) =>
    textureNodeFunc(nodeId, textureNodeData)
  | CubemapNode(nodeId, cubemapNodeData) =>
    cubemapNodeFunc(nodeId, cubemapNodeData)
  | MaterialNode(nodeId, materialNodeData) =>
    materialNodeFunc(nodeId, materialNodeData)
  | WDBNode(nodeId, wdbNodeData) => wdbNodeFunc(nodeId, wdbNodeData)
  | AssetBundleNode(nodeId, assetBundleNodeData) =>
    assetBundleNodeFunc(nodeId, assetBundleNodeData)
  | IMGUIExecFuncDataNode(nodeId, imguiExecFuncDataNodeData) =>
    imguiExecFuncDataNodeFunc(nodeId, imguiExecFuncDataNodeData)
  | IMGUISkinNode(nodeId, imguiSkinNodeData) =>
    imguiSkinNodeFunc(nodeId, imguiSkinNodeData)
  | IMGUICustomControlNode(nodeId, imguiCustomControlNodeData) =>
    imguiCustomControlNodeFunc(nodeId, imguiCustomControlNodeData)
  | FntNode(nodeId, fntNodeData) => fntNodeFunc(nodeId, fntNodeData)
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
          ~cubemapNodeFunc=(acc, _, _) => acc,
          ~materialNodeFunc=(acc, _, _) => acc,
          ~scriptEventFunctionNodeFunc=(acc, _, _) => acc,
          ~scriptAttributeNodeFunc=(acc, _, _) => acc,
          ~wdbNodeFunc=(acc, _, _) => acc,
          ~assetBundleNodeFunc=(acc, _, _) => acc,
          ~imguiExecFuncDataNodeFunc=(acc, _, _) => acc,
          ~imguiSkinNodeFunc=(acc, _, _) => acc,
          ~imguiCustomControlNodeFunc=(acc, _, _) => acc,
          ~fntNodeFunc=(acc, _, _) => acc,
          (),
        )
        : 'r => {
  let recurse = (acc, child) =>
    fold(
      ~acc,
      ~tree=child,
      ~seqFoldFunc,
      ~textureNodeFunc,
      ~cubemapNodeFunc,
      ~materialNodeFunc,
      ~scriptEventFunctionNodeFunc,
      ~scriptAttributeNodeFunc,
      ~wdbNodeFunc,
      ~assetBundleNodeFunc,
      ~imguiExecFuncDataNodeFunc,
      ~imguiSkinNodeFunc,
      ~imguiCustomControlNodeFunc,
      ~fntNodeFunc,
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
  | CubemapNode(nodeId, cubemapNodeData) =>
    cubemapNodeFunc(acc, nodeId, cubemapNodeData)
  | MaterialNode(nodeId, materialNodeData) =>
    materialNodeFunc(acc, nodeId, materialNodeData)
  | WDBNode(nodeId, wdbNodeData) => wdbNodeFunc(acc, nodeId, wdbNodeData)
  | AssetBundleNode(nodeId, assetBundleNodeData) =>
    assetBundleNodeFunc(acc, nodeId, assetBundleNodeData)
  | IMGUIExecFuncDataNode(nodeId, imguiExecFuncDataNodeData) =>
    imguiExecFuncDataNodeFunc(acc, nodeId, imguiExecFuncDataNodeData)
  | IMGUISkinNode(nodeId, imguiSkinNodeData) =>
    imguiSkinNodeFunc(acc, nodeId, imguiSkinNodeData)
  | IMGUICustomControlNode(nodeId, imguiCustomControlNodeData) =>
    imguiCustomControlNodeFunc(acc, nodeId, imguiCustomControlNodeData)
  | FntNode(nodeId, fntNodeData) => fntNodeFunc(acc, nodeId, fntNodeData)
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
          ~cubemapNodeFunc=(_, acc, _, _) => acc,
          ~materialNodeFunc=(_, acc, _, _) => acc,
          ~scriptEventFunctionNodeFunc=(_, acc, _, _) => acc,
          ~scriptAttributeNodeFunc=(_, acc, _, _) => acc,
          ~wdbNodeFunc=(_, acc, _, _) => acc,
          ~assetBundleNodeFunc=(_, acc, _, _) => acc,
          ~imguiExecFuncDataNodeFunc=(_, acc, _, _) => acc,
          ~imguiSkinNodeFunc=(_, acc, _, _) => acc,
          ~imguiCustomControlNodeFunc=(_, acc, _, _) => acc,
          ~fntNodeFunc=(_, acc, _, _) => acc,
          ~parentFolderNode=None,
          (),
        )
        : 'r => {
  let recurse = (parentFolderNode, acc, child) =>
    foldWithParentFolderNode(
      ~acc,
      ~tree=child,
      ~textureNodeFunc,
      ~cubemapNodeFunc,
      ~materialNodeFunc,
      ~scriptEventFunctionNodeFunc,
      ~scriptAttributeNodeFunc,
      ~wdbNodeFunc,
      ~assetBundleNodeFunc,
      ~imguiExecFuncDataNodeFunc,
      ~imguiSkinNodeFunc,
      ~imguiCustomControlNodeFunc,
      ~fntNodeFunc,
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
  | CubemapNode(nodeId, cubemapNodeData) =>
    cubemapNodeFunc(parentFolderNode, acc, nodeId, cubemapNodeData)
  | MaterialNode(nodeId, materialNodeData) =>
    materialNodeFunc(parentFolderNode, acc, nodeId, materialNodeData)
  | WDBNode(nodeId, wdbNodeData) =>
    wdbNodeFunc(parentFolderNode, acc, nodeId, wdbNodeData)
  | AssetBundleNode(nodeId, assetBundleNodeData) =>
    assetBundleNodeFunc(parentFolderNode, acc, nodeId, assetBundleNodeData)
  | IMGUIExecFuncDataNode(nodeId, imguiExecFuncDataNodeData) =>
    imguiExecFuncDataNodeFunc(
      parentFolderNode,
      acc,
      nodeId,
      imguiExecFuncDataNodeData,
    )
  | IMGUISkinNode(nodeId, imguiSkinNodeData) =>
    imguiSkinNodeFunc(parentFolderNode, acc, nodeId, imguiSkinNodeData)
  | IMGUICustomControlNode(nodeId, imguiCustomControlNodeData) =>
    imguiCustomControlNodeFunc(
      parentFolderNode,
      acc,
      nodeId,
      imguiCustomControlNodeData,
    )
  | FntNode(nodeId, fntNodeData) =>
    fntNodeFunc(parentFolderNode, acc, nodeId, fntNodeData)
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

let rec foldWithParentFolderNodeWithoutRootNode =
        (
          ~folderNodeFunc,
          ~acc,
          ~tree,
          ~seqFoldFunc=WonderCommonlib.ArrayService.reduceOneParam,
          ~textureNodeFunc=(_, acc, _, _) => acc,
          ~cubemapNodeFunc=(_, acc, _, _) => acc,
          ~materialNodeFunc=(_, acc, _, _) => acc,
          ~scriptEventFunctionNodeFunc=(_, acc, _, _) => acc,
          ~scriptAttributeNodeFunc=(_, acc, _, _) => acc,
          ~wdbNodeFunc=(_, acc, _, _) => acc,
          ~assetBundleNodeFunc=(_, acc, _, _) => acc,
          ~imguiExecFuncDataNodeFunc=(_, acc, _, _) => acc,
          ~imguiSkinNodeFunc=(_, acc, _, _) => acc,
          ~imguiCustomControlNodeFunc=(_, acc, _, _) => acc,
          ~fntNodeFunc=(_, acc, _, _) => acc,
          ~parentFolderNode=RootTreeAssetService.getRootNode(tree),
          (),
        )
        : 'r => {
  let recurse = (parentFolderNode, acc, child) =>
    foldWithParentFolderNodeWithoutRootNode(
      ~acc,
      ~tree=child,
      ~textureNodeFunc,
      ~cubemapNodeFunc,
      ~materialNodeFunc,
      ~scriptEventFunctionNodeFunc,
      ~scriptAttributeNodeFunc,
      ~wdbNodeFunc,
      ~assetBundleNodeFunc,
      ~imguiExecFuncDataNodeFunc,
      ~imguiSkinNodeFunc,
      ~imguiCustomControlNodeFunc,
      ~fntNodeFunc,
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
  | CubemapNode(nodeId, cubemapNodeData) =>
    cubemapNodeFunc(parentFolderNode, acc, nodeId, cubemapNodeData)
  | MaterialNode(nodeId, materialNodeData) =>
    materialNodeFunc(parentFolderNode, acc, nodeId, materialNodeData)
  | WDBNode(nodeId, wdbNodeData) =>
    wdbNodeFunc(parentFolderNode, acc, nodeId, wdbNodeData)
  | AssetBundleNode(nodeId, assetBundleNodeData) =>
    assetBundleNodeFunc(parentFolderNode, acc, nodeId, assetBundleNodeData)
  | IMGUIExecFuncDataNode(nodeId, imguiExecFuncDataNodeData) =>
    imguiExecFuncDataNodeFunc(
      parentFolderNode,
      acc,
      nodeId,
      imguiExecFuncDataNodeData,
    )
  | IMGUISkinNode(nodeId, imguiSkinNodeData) =>
    imguiSkinNodeFunc(parentFolderNode, acc, nodeId, imguiSkinNodeData)
  | IMGUICustomControlNode(nodeId, imguiCustomControlNodeData) =>
    imguiCustomControlNodeFunc(
      parentFolderNode,
      acc,
      nodeId,
      imguiCustomControlNodeData,
    )
  | FntNode(nodeId, fntNodeData) =>
    fntNodeFunc(parentFolderNode, acc, nodeId, fntNodeData)
  | FolderNode(nodeId, folderNodeData, children) =>
    let localAccum =
      FolderNodeAssetService.getNodeNameByData(folderNodeData)
      === RootTreeAssetService.getAssetTreeRootName() ?
        acc :
        folderNodeFunc(
          parentFolderNode,
          acc,
          nodeId,
          folderNodeData,
          children,
        );

    UIStateAssetService.fold(
      seqFoldFunc,
      recurse(
        FolderNodeAssetService.buildNodeByNodeData(
          ~nodeId,
          ~nodeData=folderNodeData,
          ~children,
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
          ~cubemapNodeFunc,
          ~materialNodeFunc,
          ~scriptEventFunctionNodeFunc,
          ~scriptAttributeNodeFunc,
          ~wdbNodeFunc,
          ~assetBundleNodeFunc,
          ~imguiExecFuncDataNodeFunc,
          ~imguiSkinNodeFunc,
          ~imguiCustomControlNodeFunc,
          ~fntNodeFunc,
          ~folderNodeFunc,
          ~handleBeforeFoldChildrenFunc,
          ~handleAfterFoldChildrenFunc,
          ~seqFoldFunc=WonderCommonlib.ArrayService.reduceOneParam,
          (),
        )
        : 'r => {
  let recurse = (acc, child) =>
    foldWithHandleBeforeAndAfterFoldChildren(
      ~acc,
      ~tree=child,
      ~textureNodeFunc,
      ~cubemapNodeFunc,
      ~materialNodeFunc,
      ~scriptEventFunctionNodeFunc,
      ~scriptAttributeNodeFunc,
      ~wdbNodeFunc,
      ~assetBundleNodeFunc,
      ~imguiExecFuncDataNodeFunc,
      ~imguiSkinNodeFunc,
      ~imguiCustomControlNodeFunc,
      ~fntNodeFunc,
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
  | CubemapNode(nodeId, cubemapNodeData) =>
    cubemapNodeFunc(acc, nodeId, cubemapNodeData)
  | MaterialNode(nodeId, materialNodeData) =>
    materialNodeFunc(acc, nodeId, materialNodeData)
  | WDBNode(nodeId, wdbNodeData) => wdbNodeFunc(acc, nodeId, wdbNodeData)
  | AssetBundleNode(nodeId, assetBundleNodeData) =>
    assetBundleNodeFunc(acc, nodeId, assetBundleNodeData)
  | IMGUIExecFuncDataNode(nodeId, imguiExecFuncDataNodeData) =>
    imguiExecFuncDataNodeFunc(acc, nodeId, imguiExecFuncDataNodeData)
  | IMGUISkinNode(nodeId, imguiSkinNodeData) =>
    imguiSkinNodeFunc(acc, nodeId, imguiSkinNodeData)
  | IMGUICustomControlNode(nodeId, imguiCustomControlNodeData) =>
    imguiCustomControlNodeFunc(acc, nodeId, imguiCustomControlNodeData)
  | FntNode(nodeId, fntNodeData) => fntNodeFunc(acc, nodeId, fntNodeData)
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
      ~predCubemapNodeFunc=node => false,
      ~predMaterialNodeFunc=node => false,
      ~predScriptEventFunctionNodeFunc=node => false,
      ~predScriptAttributeNodeFunc=node => false,
      ~predWDBNodeFunc=node => false,
      ~predAssetBundleNodeFunc=node => false,
      ~predIMGUIExecFuncDataNodeFunc=node => false,
      ~predIMGUISkinNodeFunc=node => false,
      ~predIMGUICustomControlNodeFunc=node => false,
      ~predFntNodeFunc=node => false,
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
  let _cubemapNodeFunc = (acc, nodeId, nodeData) =>
    _nodeFunc(
      acc,
      CubemapNodeAssetService.buildNodeByNodeData(~nodeId, ~nodeData),
      predCubemapNodeFunc,
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
  let _assetBundleNodeFunc = (acc, nodeId, nodeData) =>
    _nodeFunc(
      acc,
      AssetBundleNodeAssetService.buildNodeByNodeData(~nodeId, ~nodeData),
      predAssetBundleNodeFunc,
    );
  let _imguiExecFuncDataNodeFunc = (acc, nodeId, nodeData) =>
    _nodeFunc(
      acc,
      IMGUIExecFuncDataNodeAssetService.buildNodeByNodeData(
        ~nodeId,
        ~nodeData,
      ),
      predIMGUIExecFuncDataNodeFunc,
    );
  let _imguiSkinNodeFunc = (acc, nodeId, nodeData) =>
    _nodeFunc(
      acc,
      IMGUISkinNodeAssetService.buildNodeByNodeData(~nodeId, ~nodeData),
      predIMGUISkinNodeFunc,
    );
  let _imguiCustomControlNodeFunc = (acc, nodeId, nodeData) =>
    _nodeFunc(
      acc,
      IMGUICustomControlNodeAssetService.buildNodeByNodeData(
        ~nodeId,
        ~nodeData,
      ),
      predIMGUICustomControlNodeFunc,
    );
  let _fntNodeFunc = (acc, nodeId, nodeData) =>
    _nodeFunc(
      acc,
      FntNodeAssetService.buildNodeByNodeData(~nodeId, ~nodeData),
      predFntNodeFunc,
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
    ~cubemapNodeFunc=_cubemapNodeFunc,
    ~materialNodeFunc=_materialNodeFunc,
    ~scriptEventFunctionNodeFunc=_scriptEventFunctionNodeFunc,
    ~scriptAttributeNodeFunc=_scriptAttributeNodeFunc,
    ~wdbNodeFunc=_wdbNodeFunc,
    ~assetBundleNodeFunc=_assetBundleNodeFunc,
    ~imguiExecFuncDataNodeFunc=_imguiExecFuncDataNodeFunc,
    ~imguiSkinNodeFunc=_imguiSkinNodeFunc,
    ~imguiCustomControlNodeFunc=_imguiCustomControlNodeFunc,
    ~fntNodeFunc=_fntNodeFunc,
    ~folderNodeFunc=_folderNodeFunc,
    (),
  );
};

let find =
    (
      ~tree,
      ~predTextureNodeFunc=node => false,
      ~predCubemapNodeFunc=node => false,
      ~predMaterialNodeFunc=node => false,
      ~predScriptEventFunctionNodeFunc=node => false,
      ~predScriptAttributeNodeFunc=node => false,
      ~predWDBNodeFunc=node => false,
      ~predAssetBundleNodeFunc=node => false,
      ~predIMGUIExecFuncDataNodeFunc=node => false,
      ~predIMGUISkinNodeFunc=node => false,
      ~predIMGUICustomControlNodeFunc=node => false,
      ~predFntNodeFunc=node => false,
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
      ~predCubemapNodeFunc,
      ~predMaterialNodeFunc,
      ~predScriptEventFunctionNodeFunc,
      ~predScriptAttributeNodeFunc,
      ~predWDBNodeFunc,
      ~predAssetBundleNodeFunc,
      ~predIMGUIExecFuncDataNodeFunc,
      ~predIMGUISkinNodeFunc,
      ~predIMGUICustomControlNodeFunc,
      ~predFntNodeFunc,
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
      ~predCubemapNodeFunc=node => false,
      ~predMaterialNodeFunc=node => false,
      ~predScriptEventFunctionNodeFunc=node => false,
      ~predScriptAttributeNodeFunc=node => false,
      ~predWDBNodeFunc=node => false,
      ~predAssetBundleNodeFunc=node => false,
      ~predIMGUIExecFuncDataNodeFunc=node => false,
      ~predIMGUISkinNodeFunc=node => false,
      ~predIMGUICustomControlNodeFunc=node => false,
      ~predFntNodeFunc=node => false,
      ~predFolderNodeFunc=node => false,
      (),
    )
    : 'r =>
  find(
    ~tree,
    ~predTextureNodeFunc,
    ~predCubemapNodeFunc,
    ~predMaterialNodeFunc,
    ~predScriptEventFunctionNodeFunc,
    ~predScriptAttributeNodeFunc,
    ~predWDBNodeFunc,
    ~predAssetBundleNodeFunc,
    ~predIMGUIExecFuncDataNodeFunc,
    ~predIMGUISkinNodeFunc,
    ~predIMGUICustomControlNodeFunc,
    ~predFntNodeFunc,
    ~predFolderNodeFunc,
    (),
  )
  |> Js.Option.map((. list) => list |> List.hd);

let rec map =
        (
          ~tree,
          ~folderNodeFunc=(_, nodeData) => (
                            UIStateAssetType.NotChange,
                            nodeData,
                          ),
          ~textureNodeFunc=(_, nodeData) => nodeData,
          ~cubemapNodeFunc=(_, nodeData) => nodeData,
          ~materialNodeFunc=(_, nodeData) => nodeData,
          ~scriptEventFunctionNodeFunc=(_, nodeData) => nodeData,
          ~scriptAttributeNodeFunc=(_, nodeData) => nodeData,
          ~wdbNodeFunc=(_, nodeData) => nodeData,
          ~assetBundleNodeFunc=(_, nodeData) => nodeData,
          ~imguiExecFuncDataNodeFunc=(_, nodeData) => nodeData,
          ~imguiSkinNodeFunc=(_, nodeData) => nodeData,
          ~imguiCustomControlNodeFunc=(_, nodeData) => nodeData,
          ~fntNodeFunc=(_, nodeData) => nodeData,
          (),
        )
        : 'r => {
  let recurse =
    map(
      ~textureNodeFunc,
      ~cubemapNodeFunc,
      ~materialNodeFunc,
      ~scriptEventFunctionNodeFunc,
      ~scriptAttributeNodeFunc,
      ~wdbNodeFunc,
      ~assetBundleNodeFunc,
      ~imguiExecFuncDataNodeFunc,
      ~imguiSkinNodeFunc,
      ~imguiCustomControlNodeFunc,
      ~fntNodeFunc,
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
  | CubemapNode(nodeId, cubemapNodeData) =>
    CubemapNode(nodeId, cubemapNodeFunc(nodeId, cubemapNodeData))
  | MaterialNode(nodeId, materialNodeData) =>
    MaterialNode(nodeId, materialNodeFunc(nodeId, materialNodeData))
  | WDBNode(nodeId, wdbNodeData) =>
    WDBNode(nodeId, wdbNodeFunc(nodeId, wdbNodeData))
  | AssetBundleNode(nodeId, assetBundleNodeData) =>
    AssetBundleNode(nodeId, assetBundleNodeFunc(nodeId, assetBundleNodeData))
  | IMGUIExecFuncDataNode(nodeId, imguiExecFuncDataNodeData) =>
    IMGUIExecFuncDataNode(
      nodeId,
      imguiExecFuncDataNodeFunc(nodeId, imguiExecFuncDataNodeData),
    )
  | IMGUISkinNode(nodeId, imguiSkinNodeData) =>
    IMGUISkinNode(nodeId, imguiSkinNodeFunc(nodeId, imguiSkinNodeData))
  | IMGUICustomControlNode(nodeId, imguiCustomControlNodeData) =>
    IMGUICustomControlNode(
      nodeId,
      imguiCustomControlNodeFunc(nodeId, imguiCustomControlNodeData),
    )
  | FntNode(nodeId, fntNodeData) =>
    FntNode(nodeId, fntNodeFunc(nodeId, fntNodeData))
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