open ExtensionParseType;

let createExtensionMap = (methodExtension) =>
  methodExtension
  |> Js.Array.map((func: funcType) => parseFuncTypeToJsObj(func))
  |> Js.Array.reduce(
       (map, func) => map |> WonderCommonlib.HashMapSystem.set(func##name, Obj.magic(func##value)),
       WonderCommonlib.HashMapSystem.createEmpty()
     );