type file;

external convertFileJsObjectToFile : Js.t({..}) => file = "%identity";

type assetTreeFileType =
  | Folder
  | Image
  | Json;

type fileInfoType = {
  name: string,
  type_: string,
  file
};

type fileResultType = {
  name: string,
  type_: assetTreeFileType,
  result: string
};