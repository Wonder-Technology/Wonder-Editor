let _getNotNeedComponent = () => 0;

let hasMaterialComponent = (gameObject, engineState) =>
  engineState
  |> GameObjectComponentEngineService.hasBasicMaterialComponent(gameObject)
  || engineState
  |> GameObjectComponentEngineService.hasLightMaterialComponent(gameObject);

let getMaterialComponent = (gameObject, engineState) =>
  _getNotNeedComponent();