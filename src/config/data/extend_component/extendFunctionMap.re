open ExtendParseType;

let createExtendMap = (funcExtend) => {
  let extendMap = WonderCommonlib.HashMapSystem.createEmpty();
  funcExtend
  |> Js.Array.map((func: funcType) => parseFuncTypeToJsObj(func))
  |> Js.Array.forEach(
       (func) =>
         WonderCommonlib.HashMapSystem.set(func##name, Obj.magic(func##value), extendMap) |> ignore
     );
  extendMap
};