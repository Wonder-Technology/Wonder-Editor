let createBox = state => {
  let (state, material) = LightMaterialEngineService.create(state);
  let (state, meshRenderer) = MeshRendererEngineService.create(state);
  let (state, obj) = GameObjectEngineService.create(state);
  let (state, geometry) = GeometryEngineService.createBoxGeometry(state);

/* inspectorRecord -> componentType for editor */
/* add component into sparseMap at there */

  let state =
    state
    |> GameObjectEngineService.setGameObjectName("cube", obj)
    |> GameObjectComponentEngineService.addLightMaterialComponent(
         obj,
         material,
       )
    |> GameObjectComponentEngineService.addMeshRendererComponent(
         obj,
         meshRenderer,
       )
    |> GameObjectComponentEngineService.addBoxGeometryComponent(obj, geometry);

  (state, obj);
};

let createDirectionLight = state => {
  let (state, obj) = GameObjectEngineService.create(state);
  let (state, directionLight) = DirectionLightEngineService.create(state);

  let state =
    state
    |> GameObjectEngineService.setGameObjectName("Direction Light", obj)
    |> GameObjectComponentEngineService.addDirectionLightComponent(
         obj,
         directionLight,
       );

  (state, obj);
};