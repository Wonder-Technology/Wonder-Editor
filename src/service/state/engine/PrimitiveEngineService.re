let createBox = (state) => {
  let (state, material) = BasicMaterialEngineService.create(state);
  let (state, meshRenderer) = MeshRendererEngineService.create(state);
  let (state, obj) = GameObjectEngineService.create(state);
  let (state, geometry) = GeometryEngineService.createBoxGeometry(state);
  let state =
    state
    |> GameObjectComponentEngineService.addBasicMaterialComponent(obj, material)
    |> GameObjectComponentEngineService.addMeshRendererComponent(obj, meshRenderer)
    |> GameObjectComponentEngineService.addBoxGeometryComponent(obj, geometry);
  (state, obj)
};