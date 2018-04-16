/* TODO move extension_component/ to system/extension_component/ ? */
open ExtensionParseType;

let createExtensionMap = (methodExtension) =>
  methodExtension
  |> Js.Array.map((func: funcType) => parseFuncTypeToJsObj(func))
  |> Js.Array.reduce(
       (map, func) => map |> WonderCommonlib.HashMapService.set(func##name, Obj.magic(func##value)),
       WonderCommonlib.HashMapService.createEmpty()
     );