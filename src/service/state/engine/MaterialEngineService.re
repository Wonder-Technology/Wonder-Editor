open Wonderjs;
let hasMaterialComponent = (gameObject, engineState) =>
  engineState
  |> GameObjectComponentEngineService.hasBasicMaterialComponent(gameObject)
  || engineState
  |> GameObjectComponentEngineService.hasLightMaterialComponent(gameObject);

let replaceMaterial =
    (
      (disposeSourceMaterialFunc, addTargetMaterialFunc),
      sourceMeshRenderer,
      sourceMaterial,
      targetMeshRenderer,
      targetMaterial,
      gameObject,
      state,
    ) =>
  RenderGroupEngineService.replaceRenderGroupComponents(
    (
      (sourceMeshRenderer, sourceMaterial),
      (targetMeshRenderer, targetMaterial),
    ),
    gameObject,
    (disposeSourceMaterialFunc, addTargetMaterialFunc),
    state,
  );