open NodeAssetType;

open FileType;

let getUploadAssetType = name => {
  let extname = FileNameService.getExtName(name);

  switch (extname) {
  | ".wdb" => LoadWDB
  | ".glb" => LoadGLB
  | ".jpg"
  | ".jpeg"
  | ".png" => LoadTexture
  | ".rab"
  | ".sab"
  | ".wab" => LoadAssetBundle
  | ".zip" => LoadZip
  | _ =>
    LoadError(
      LogUtils.buildErrorMessage(
        ~description=
          LanguageUtils.getMessageLanguageDataByType(
            "load-asset-file-error",
            LanguageEditorService.unsafeGetType
            |> StateLogicService.getEditorState,
          ),
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };
};

let _handleAssetSpecificFuncByTypeSync =
    (
      type_,
      (
        handleTextureFunc,
        handleWDBFunc,
        handleAssetBundleFunc,
        handleGLBFunc,
        handleZipFunc,
      ),
    ) =>
  switch (type_) {
  | LoadTexture => handleTextureFunc()
  | LoadWDB => handleWDBFunc()
  | LoadAssetBundle => handleAssetBundleFunc()
  | LoadGLB => handleGLBFunc()
  | LoadZip => handleZipFunc()
  };

let readAssetByTypeSync = (reader, fileInfo: fileInfoType) =>
  _handleAssetSpecificFuncByTypeSync(
    getUploadAssetType(fileInfo.name),
    (
      () => FileReader.readAsDataURL(reader, fileInfo.file),
      () => FileReader.readAsArrayBuffer(reader, fileInfo.file),
      () => FileReader.readAsArrayBuffer(reader, fileInfo.file),
      () => FileReader.readAsArrayBuffer(reader, fileInfo.file),
      () => FileReader.readAsArrayBuffer(reader, fileInfo.file),
    ),
  );