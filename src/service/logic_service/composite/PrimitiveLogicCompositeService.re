let createBox = (state) => {
  let (state, material) = BasicMaterialLogicSingleService.create(state);
  let (state, meshRenderer) = MeshRendererLogicSingleService.create(state);
  let (state, obj) = GameObjectLogicSingleService.create(state);
  let (state, geometry) = GeometryLogicSingleService.createBoxGeometry(state);
  let state =
    state
    |> GeometryLogicSingleService.setBoxGeometryConfigData(
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
    |> GameObjectLogicSingleService.addMaterialComponent(obj, material)
    |> GameObjectLogicSingleService.addMeshRendererComponent(obj, meshRenderer)
    |> GameObjectLogicSingleService.addGeometryComponent(obj, geometry);
  (state, obj)
};