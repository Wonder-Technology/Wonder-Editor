open DiffType;

let getEditEngineComponent = (type_, diffMap) =>
  switch (type_) {
  | GameObject =>
    WonderCommonlib.HashMapService.unsafeGet("gameObject", diffMap)
  | Transform =>
    WonderCommonlib.HashMapService.unsafeGet("transform", diffMap)
  | BasicMaterial =>
    WonderCommonlib.HashMapService.unsafeGet("basicMaterial", diffMap)
  | LightMaterial =>
    WonderCommonlib.HashMapService.unsafeGet("lightMaterial", diffMap)
  | Texture => WonderCommonlib.HashMapService.unsafeGet("texture", diffMap)
  };