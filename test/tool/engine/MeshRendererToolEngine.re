open Wonderjs;

let getBasicMaterialRenderGameObjectArray = (state: StateDataMainType.state) =>
  RenderArrayMeshRendererService.getBasicMaterialRenderGameObjectArray(
    RecordMeshRendererMainService.getRecord(state),
  );

let getLightMaterialRenderGameObjectArray = (state: StateDataMainType.state) =>
  RenderArrayMeshRendererService.getLightMaterialRenderGameObjectArray(
    RecordMeshRendererMainService.getRecord(state),
  );

let getAllRenderArrayCount = () => (
  getBasicMaterialRenderGameObjectArray
  |> StateLogicService.getEngineStateToGetData
  |> Js.Array.length,
  getLightMaterialRenderGameObjectArray
  |> StateLogicService.getEngineStateToGetData
  |> Js.Array.length,
);