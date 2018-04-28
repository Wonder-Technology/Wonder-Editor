open FileType;

let convertFileJsObjectToFileInfoRecord = (fileObject) => {
  name: fileObject##name,
  type_: fileObject##_type,
  file: FileType.convertFileJsObjectToFile(fileObject)
};

let readFileByType = (reader, fileInfo: fileInfoType) =>
  switch fileInfo.type_ {
  | "application/json" => File.readAsText(reader, fileInfo.file)
  | "image/jpeg"
  | "image/png" => File.readAsDataURL(reader, fileInfo.file)
  | _ =>
    WonderLog.Log.error(
      WonderLog.Log.buildErrorMessage(
        ~title="readFileByType",
        ~description={j|the specific type:$fileInfo is not find|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|fileInfo:$fileInfo|j}
      )
    )
  };