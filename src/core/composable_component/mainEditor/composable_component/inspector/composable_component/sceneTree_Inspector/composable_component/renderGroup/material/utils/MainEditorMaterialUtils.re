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
      LogUtils.buildFatalMessage(
        
        ~description=
          {j|gameObject:$gameObject should has material component|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let handleSpecificFuncByMaterialType =
    (type_, (handleBasicMaterialFunc, handleLightMaterialFunc)) =>
  switch (type_) {
  | BasicMaterial => handleBasicMaterialFunc()

  | LightMaterial => handleLightMaterialFunc()
  };

let createMaterialByType = (type_, engineState) =>
  switch (type_) {
  | BasicMaterial => BasicMaterialEngineService.create(engineState)

  | LightMaterial => LightMaterialEngineService.create(engineState)
  };

let getNewMaterilaName = () => "New Material";

let getNoNameMaterialName = () => "NoName Material";

let getName = (material, type_, engineState) =>
  switch (type_) {
  | BasicMaterial =>
    switch (
      BasicMaterialEngineService.getBasicMaterialName(material, engineState)
    ) {
    | None => getNoNameMaterialName()
    | Some(name) => name
    }
  | LightMaterial =>
    switch (
      LightMaterialEngineService.getLightMaterialName(material, engineState)
    ) {
    | None => getNoNameMaterialName()
    | Some(name) => name
    }
  };

let setName = (material, type_, name, engineState) =>
  switch (type_) {
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

let getMaterialComponentByType = (gameObject, type_, engineState) =>
  switch (type_) {
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
    (newName, type_, materialComponent, engineState) =>
  switch (type_) {
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

let getGameObjectsByType = (material, type_, engineState) =>
  switch (type_) {
  | BasicMaterial =>
    BasicMaterialEngineService.getBasicMaterialGameObjects(
      material,
      engineState,
    )
  | LightMaterial =>
    LightMaterialEngineService.getLightMaterialGameObjects(
      material,
      engineState,
    )
  };

let unsafeGetGameObjectsByType = (material, type_, engineState) =>
  getGameObjectsByType(material, type_, engineState)
  |> OptionService.unsafeGet;