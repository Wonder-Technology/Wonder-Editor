let createBox = (state) => {
  let (state, material) = BasicMaterialLogicService.create(state);
  let (state, meshRenderer) = MeshRendererLogicSingleService.create(state);
  let (state, obj) = GameObjectLogicService.create(state);
  let (state, geometry) = GeometryLogicService.createBoxGeometry(state);
  let state =
    state
    |> GeometryLogicService.setBoxGeometryConfigData(
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
    |> GameObjectLogicService.addMaterialComponent(obj, material)
    |> GameObjectLogicService.addMeshRendererComponent(obj, meshRenderer)
    |> GameObjectLogicService.addGeometryComponent(obj, geometry);
  (state, obj)
};