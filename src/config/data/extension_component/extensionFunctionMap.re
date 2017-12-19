open ExtensionParseType;

let createExtensionMap = (funcExtension) => {
  let extensionMap = WonderCommonlib.HashMapSystem.createEmpty();
  funcExtension
  |> Js.Array.map((func: funcType) => parseFuncTypeToJsObj(func))
  |> Js.Array.forEach(
       (func) =>
         WonderCommonlib.HashMapSystem.set(func##name, Obj.magic(func##value), extensionMap) |> ignore
     );
  extensionMap
};