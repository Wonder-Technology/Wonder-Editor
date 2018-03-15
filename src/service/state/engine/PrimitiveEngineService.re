let createBox = (state) => {
  let (state, material) = BasicMaterialEngineService.create(state);
  let (state, meshRenderer) = MeshRendererEngineService.create(state);
  let (state, obj) = GameObjectEngineService.create(state);
  let (state, geometry) = GeometryEngineService.createBoxGeometry(state);
  let state =
    state
    |> GeometryEngineService.setBoxGeometryConfigData(
         geometry,
         {
           "width": Js.Nullable.return(5.),
           "height": Js.Nullable.return(5.),
           "depth": Js.Nullable.return(5.),
           "widthSegment": Js.Nullable.undefined,
           "heightSegment": Js.Nullable.undefined,
           "depthSegment": Js.Nullable.undefined
         }
       )
    |> GameObjectComponentEngineService.addMaterialComponent(obj, material)
    |> GameObjectComponentEngineService.addMeshRendererComponent(obj, meshRenderer)
    |> GameObjectComponentEngineService.addGeometryComponent(obj, geometry);
  (state, obj)
};