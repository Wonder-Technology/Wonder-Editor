open Wonderjs;

let getBasicMaterialRenderArray = (state: StateDataMainType.state) =>
  RenderArrayMeshRendererService.getBasicMaterialRenderArray(
    RecordMeshRendererMainService.getRecord(state),
  );

let getLightMaterialRenderArray = (state: StateDataMainType.state) =>
  RenderArrayMeshRendererService.getLightMaterialRenderArray(
    RecordMeshRendererMainService.getRecord(state),
  );

let getAllRenderArrayCount = () => (
  getBasicMaterialRenderArray
  |> StateLogicService.getEngineStateToGetData
  |> Js.Array.length,
  getLightMaterialRenderArray
  |> StateLogicService.getEngineStateToGetData
  |> Js.Array.length,
);