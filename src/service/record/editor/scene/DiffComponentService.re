let getEditEngineComponent = (type_, diffMap) =>
  switch type_ {
  | DiffType.GameObject => WonderCommonlib.HashMapService.unsafeGet("gameObject", diffMap)
  | DiffType.Transform => WonderCommonlib.HashMapService.unsafeGet("transform", diffMap)
  | DiffType.Material => WonderCommonlib.HashMapService.unsafeGet("material", diffMap)
  };