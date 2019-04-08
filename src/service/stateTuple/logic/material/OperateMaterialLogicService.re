open MaterialDataAssetType;

let getNewMaterilaName = () => "New Material";

let getDefaultName = () => "NoName Material";

let _getName = (material, engineState, getMaterialNameFunc) =>
  switch (getMaterialNameFunc(material, engineState)) {
  | None => getDefaultName()
  | Some(name) => name
  };

let getName = (~material, ~type_, ~engineState) =>
  switch (type_) {
  | BasicMaterial =>
    _getName(
      material,
      engineState,
      BasicMaterialEngineService.getBasicMaterialName,
    )
  | LightMaterial =>
    _getName(
      material,
      engineState,
      LightMaterialEngineService.getLightMaterialName,
    )
  };

let setName = (~material, ~type_, ~name, ~engineState) =>
  switch (type_) {
  | BasicMaterial =>
    BasicMaterialEngineService.setBasicMaterialName(
      name,
      material,
      engineState,
    )
  | LightMaterial =>
    LightMaterialEngineService.setLightMaterialName(
      name,
      material,
      engineState,
    )
  };