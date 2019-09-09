let filter =
    (
      ~editorState,
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
    : 'r =>
  IterateTreeAssetService.filter(
    ~acc,
    ~pushNodeFunc,
    ~tree=TreeAssetEditorService.unsafeGetTree(editorState),
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
  );

let map =
    (
      ~editorState,
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
    : 'r =>
  IterateTreeAssetService.map(
    ~tree=TreeAssetEditorService.unsafeGetTree(editorState),
    ~folderNodeFunc,
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
    (),
  )
  |> TreeAssetEditorService.setTree(_, editorState);