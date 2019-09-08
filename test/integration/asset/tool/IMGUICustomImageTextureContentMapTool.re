let hasContent =
    (~textureContentIndex, ~editorState=StateEditorService.getState(), ()) =>
  IMGUICustomImageTextureContentMapAssetEditorService.getContent(
    textureContentIndex,
    editorState,
  )
  |> Js.Option.isSome;