open ExtendParseType;

let createExtendMap = () => {
  let extendMap = WonderCommonlib.HashMapSystem.createEmpty();
  extendRecord.funcExtend
  |> Js.Array.map((func: funcType) => parseFuncTypeToJsObj(func))
  |> Js.Array.forEach(
       (func) =>
         WonderCommonlib.HashMapSystem.set(func##name, Obj.magic(func##value), extendMap) |> ignore
     );
  extendMap
};