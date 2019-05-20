let filter =
    (
      ~editorState,
      ~acc,
      ~pushNodeFunc,
      ~predTextureNodeFunc=node => false,
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
    ~predMaterialNodeFunc,
    ~predScriptEventFunctionNodeFunc,
    ~predScriptAttributeNodeFunc,
    ~predWDBNodeFunc,
    ~predAssetBundleNodeFunc,
    ~predFolderNodeFunc,
    (),
  );