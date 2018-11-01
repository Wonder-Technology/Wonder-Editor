let getMaterialComponent =
    (~nodeId, ~editorState=StateEditorService.getState(), ()) => {
  let {materialComponent}: AssetNodeType.materialResultType =
    StateEditorService.getState()
    |> AssetMaterialNodeMapEditorService.unsafeGetResult(nodeId);

  materialComponent;
};

let hasMaterialComponent = (material, materialType, editorState) =>
  AssetMaterialNodeMapEditorService.getValidValues(editorState)
  |> Js.Array.find(
       ({materialComponent, type_}: AssetNodeType.materialResultType) =>
       materialComponent === material && materialType === type_
     )
  |> Js.Option.isSome;

let findNodeIdByMaterialComponent = (material, materialType, editorState) =>
  switch (
    AssetMaterialNodeMapEditorService.getResults(editorState)
    |> Js.Array.find(
         (
           (
             nodeId,
             {materialComponent, type_}: AssetNodeType.materialResultType,
           ),
         ) =>
         materialComponent === material && materialType === type_
       )
  ) {
  | None => None
  | Some((nodeId, _)) => Some(nodeId)
  };