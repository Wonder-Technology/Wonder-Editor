let getEditEngineComponent = (type_, runComponent) => {
  let editComponent =
    StateEditorService.getState()
    |> SceneEditorService.unsafeGetDiffMap
    |> DiffComponentService.getEditEngineComponent(type_);
  editComponent + runComponent
};