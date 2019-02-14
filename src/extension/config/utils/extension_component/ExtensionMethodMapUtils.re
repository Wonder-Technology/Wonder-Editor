open ExtensionParseType;

let createExtensionMap = (methodExtension) =>
  methodExtension
  |> Js.Array.map((func: funcType) => parseFuncTypeToJsObj(func))
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. map, func) =>
         map |> WonderCommonlib.MutableHashMapService.set(func##name, Obj.magic(func##value)),
       WonderCommonlib.MutableHashMapService.createEmpty()
     );