open SelectType;

open MainEditorMaterialType;

let getMaterialOptions = () => [|
  {key: BasicMaterial |> convertMaterialTypeToInt, value: "basic_material"},
  {key: LightMaterial |> convertMaterialTypeToInt, value: "light_material"},
|];

let getMaterialTypeByGameObject = (gameObject, engineState) =>
  switch (
    GameObjectComponentEngineService.hasBasicMaterialComponent(
      gameObject,
      engineState,
    ),
    GameObjectComponentEngineService.hasLightMaterialComponent(
      gameObject,
      engineState,
    ),
  ) {
  | (true, false) => BasicMaterial
  | (false, true) => LightMaterial
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getMaterialTypeByGameObject",
        ~description=
          {j|gameObject:$gameObject should has material component|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let handleSpecificFuncByMaterialType =
    (materialType, (handleBasicMaterialFunc, handleLightMaterialFunc)) =>
  switch (materialType) {
  | BasicMaterial => handleBasicMaterialFunc()

  | LightMaterial => handleLightMaterialFunc()
  };

let getMaterialNameByMaterialType =
    (materialType, materialComponent, engineState) =>
  switch (materialType) {
  | BasicMaterial =>
    BasicMaterialEngineService.unsafeGetBasicMaterialName(
      materialComponent,
      engineState,
    )

  | LightMaterial =>
    LightMaterialEngineService.unsafeGetLightMaterialName(
      materialComponent,
      engineState,
    )
  };

let renameMaterialByMaterialType =
    (newName, materialType, materialComponent, engineState) =>
  switch (materialType) {
  | BasicMaterial =>
    BasicMaterialEngineService.setBasicMaterialName(
      materialComponent,
      newName,
      engineState,
    )

  | LightMaterial =>
    LightMaterialEngineService.setLightMaterialName(
      materialComponent,
      newName,
      engineState,
    )
  };