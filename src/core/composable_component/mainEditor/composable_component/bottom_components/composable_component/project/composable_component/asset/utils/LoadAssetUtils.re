open AssetNodeType;

open FileType;

let getUploadFileType = name => {
  let (_, extname) = FileNameService.getBaseNameAndExtName(name);

  switch (extname) {
  | ".wdb" => LoadWDB
  | ".jpg"
  | ".png" => LoadImage
  | ".wpk" => LoadWPK
  | _ =>
    ConsoleUtils.error(
      WonderLog.Log.buildErrorMessage(
        ~title="",
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
    (type_, (handleImageFunc, handleWDBFunc, handleWPKFunc)) =>
  switch (type_) {
  | LoadImage => handleImageFunc()
  | LoadWDB => handleWDBFunc()
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
    ),
  );