open SelectType;

open MainEditorMaterialType;

open AssetMaterialDataType;

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

/* let getMaterialNameByMaterialType =
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
   }; */
let getNewMaterilaAssetName = () => "NewMaterial";

let getMaterilaDefaultName = () => getNewMaterilaAssetName();

let getName = (material, materialType, engineState) =>
  switch (materialType) {
  | BasicMaterial =>
    switch (
      BasicMaterialEngineService.getBasicMaterialName(material, engineState)
    ) {
    | None => getMaterilaDefaultName()
    | Some(name) => name
    }
  | LightMaterial =>
    switch (
      LightMaterialEngineService.getLightMaterialName(material, engineState)
    ) {
    | None => getMaterilaDefaultName()
    | Some(name) => name
    }
  };

let setName = (material, materialType, name, engineState) =>
  switch (materialType) {
  | BasicMaterial =>
    BasicMaterialEngineService.setBasicMaterialName(
      material,
      name,
      engineState,
    )
  | LightMaterial =>
    LightMaterialEngineService.setLightMaterialName(
      material,
      name,
      engineState,
    )
  };

let getMaterialCompnentByType = (gameObject, materialType, engineState) =>
  switch (materialType) {
  | BasicMaterial =>
    GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
      gameObject,
      engineState,
    )
  | LightMaterial =>
    GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
      gameObject,
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