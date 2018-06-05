open ExtensionParseType;

let createExtensionMap = (methodExtension) =>
  methodExtension
  |> Js.Array.map((func: funcType) => parseFuncTypeToJsObj(func))
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. map, func) =>
         map |> WonderCommonlib.HashMapService.set(func##name, Obj.magic(func##value)),
       WonderCommonlib.HashMapService.createEmpty()
     );