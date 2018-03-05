let createBox = (state) => {
  let (state, material) = MainEditorBasicMaterialAdaptor.create(state);
  let (state, meshRenderer) = MainEditorMeshRendererAdaptor.create(state);
  let (state, obj) = MainEditorGameObjectAdaptor.create(state);
  let (state, geometry) = MainEditorBoxGeometryAdaptor.create(state);
  let state =
    state
    |> MainEditorBoxGeometryAdaptor.setConfigData(
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
    |> MainEditorGameObjectAdaptor.addMaterialComponent(obj, material)
    |> MainEditorGameObjectAdaptor.addMeshRendererComponent(obj, meshRenderer)
    |> MainEditorGameObjectAdaptor.addGeometryComponent(obj, geometry);
  (state, obj)
};