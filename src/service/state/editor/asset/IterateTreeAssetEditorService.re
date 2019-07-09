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
    ~predFolderNodeFunc,
    (),
  );