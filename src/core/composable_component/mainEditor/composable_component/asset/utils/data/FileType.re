type file;

external convertFileJsObjectToFile : Js.t({..}) => file = "%identity";

type fileInfoType = {
  name: string,
  type_: string,
  file
};