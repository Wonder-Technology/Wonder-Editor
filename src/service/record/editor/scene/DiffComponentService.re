open DiffType;

let getEditEngineComponent = (type_, diffMap) =>
  switch (type_) {
  | GameObject =>
    WonderCommonlib.HashMapService.unsafeGet("gameObject", diffMap)
  | Transform =>
    WonderCommonlib.HashMapService.unsafeGet("transform", diffMap)
  | Material => WonderCommonlib.HashMapService.unsafeGet("material", diffMap)
  | Texture => WonderCommonlib.HashMapService.unsafeGet("texture", diffMap)
  };