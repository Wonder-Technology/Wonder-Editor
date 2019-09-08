let removeTextureContent = (textureContentIndexOpt, editorState) =>
  switch (textureContentIndexOpt) {
  | None => editorState
  | Some(textureContentIndex) =>
    editorState
    |> IMGUICustomImageTextureContentMapAssetEditorService.removeContent(
         textureContentIndex,
       )
  };