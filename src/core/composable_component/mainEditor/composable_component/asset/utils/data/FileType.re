type file;

external convertFileJsObjectToFile : Js.t({..}) => file = "%identity";

type fileInfoType = {
  name: string,
  type_: string,
  file
};

type fileResultType = {
  name: string,
  type_: string,
  result:string 
};