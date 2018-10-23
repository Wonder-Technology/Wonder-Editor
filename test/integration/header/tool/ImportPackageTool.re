/* let testImportTexture =
    (
      ~sandbox,
      ~buildAssetTreeRootFunc,
      ~testFunc,
      ~fileCallCount=ExportPackageTool.getFetchPackageContentWithoutAssetCount(),
      (),
    ) =>
  Js.Promise.(
    ExportPackageTool.getAssetJson(
      ~sandbox,
      ~buildAssetTreeRootFunc,
      ~testFunc=
        ((assetTreeData, assetJson)) => {
          StateEditorService.getState()
          |> AssetTreeEditorService.deepDisposeAssetTreeRoot
          |> StateEditorService.setState
          |> ignore;

          assetJson
          |> HeaderImportUtils._handleImportJson("Assets.json")
          |> then_(editorState =>
               testFunc(assetTreeData, editorState) |> resolve
             );
        },
      (),
    )
  ); */