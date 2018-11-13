open AssetNodeType;

open FileType;

let getUploadFileType = name => {
  let (_, extname) = FileNameService.getBaseNameAndExtName(name);

  switch (extname) {
  | ".wdb" => LoadWDB
  | ".glb" => LoadGLB
  | ".jpg"
  | ".png" => LoadImage
  | ".wpk" => LoadWPK
  | _ =>
    ConsoleUtils.error(
      LogUtils.buildErrorMessage(
        ~description={j|the loaded asset type is error|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
    |> StateLogicService.getEditorState;

    LoadError;
  };
};

let handleSpecificFuncByTypeSync =
    (type_, (handleImageFunc, handleWDBFunc, handleGLBFunc, handleWPKFunc)) =>
  switch (type_) {
  | LoadImage => handleImageFunc()
  | LoadWDB => handleWDBFunc()
  | LoadGLB => handleGLBFunc()
  | LoadWPK => handleWPKFunc()
  | LoadError => ()
  };

let readFileByTypeSync = (reader, fileInfo: fileInfoType) =>
  handleSpecificFuncByTypeSync(
    getUploadFileType(fileInfo.name),
    (
      () => FileReader.readAsDataURL(reader, fileInfo.file),
      () => FileReader.readAsArrayBuffer(reader, fileInfo.file),
      () => FileReader.readAsArrayBuffer(reader, fileInfo.file),
      () => FileReader.readAsArrayBuffer(reader, fileInfo.file),
    ),
  );