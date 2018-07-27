open Wonderjs;
let _getNotNeedComponent = () => (-100);

let hasLightComponent = (gameObject, engineState) =>
  engineState
  |> GameObjectComponentEngineService.hasDirectionLightComponent(gameObject)
  || engineState
  |> GameObjectComponentEngineService.hasPointLightComponent(gameObject);

let getLightComponent = (_gameObject, _engineState) => _getNotNeedComponent();

/* let replaceMaterial =
     (
       (disposeSourceMaterialFunc, addTargetMaterialFunc),
       sourceMaterial,
       targetMaterial,
       gameObject,
       state,
     ) =>
   MaterialAPI.replaceMaterial(
     (sourceMaterial, targetMaterial),
     gameObject,
     (disposeSourceMaterialFunc, addTargetMaterialFunc),
     state,
   ); */