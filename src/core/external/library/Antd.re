module Message = {
  type messageType;

  [@bs.module "antd/lib/message/index"]
  external message : messageType = "default";

  external convertToJsObj : messageType => Js.t({..}) = "%identity";
};