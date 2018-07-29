open DiffType;

let getEditEngineComponent = (type_, diffMap) =>
  switch (type_) {
  | GameObject =>
    WonderCommonlib.HashMapService.unsafeGet("gameObject", diffMap)
  | Transform =>
    WonderCommonlib.HashMapService.unsafeGet("transform", diffMap)
  | MeshRenderer =>
    WonderCommonlib.HashMapService.unsafeGet("meshRenderer", diffMap)
  | BasicMaterial =>
    WonderCommonlib.HashMapService.unsafeGet("basicMaterial", diffMap)
  | LightMaterial =>
    WonderCommonlib.HashMapService.unsafeGet("lightMaterial", diffMap)
  | DirectionLight =>
    WonderCommonlib.HashMapService.unsafeGet("directionLight", diffMap)
  | ArcballCameraController =>
    WonderCommonlib.HashMapService.unsafeGet(
      "arcballCameraController",
      diffMap,
    )

  | Texture => WonderCommonlib.HashMapService.unsafeGet("texture", diffMap)
  };