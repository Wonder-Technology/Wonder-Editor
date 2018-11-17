type file;

external convertFileJsObjectToFile : Js.t({..}) => file = "%identity";

external convertFileToJsZipBlob : file => WonderBsJszip.Blob.t = "%identity";

type fileInfoType = {
  name: string,
  type_: string,
  file,
};