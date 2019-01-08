let filter =
    (
      ~editorState,
      ~acc,
      ~pushNodeFunc,
      ~predTextureNodeFunc=node => false,
      ~predMaterialNodeFunc=node => false,
      ~predWDBNodeFunc=node => false,
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
    ~predWDBNodeFunc,
    ~predFolderNodeFunc,
    (),
  );