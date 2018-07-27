open Wonderjs;
let _getNotNeedComponent = () => (-100);

let hasMaterialComponent = (gameObject, engineState) =>
  engineState
  |> GameObjectComponentEngineService.hasBasicMaterialComponent(gameObject)
  || engineState
  |> GameObjectComponentEngineService.hasLightMaterialComponent(gameObject);

let getMaterialComponent = (_gameObject, _engineState) =>
  _getNotNeedComponent();

let replaceMaterial =
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
  );