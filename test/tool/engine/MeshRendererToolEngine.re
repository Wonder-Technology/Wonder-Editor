open Wonderjs;

let getBasicMaterialRenderArray = (state: StateDataMainType.state) =>
  RenderArrayMeshRendererService.getBasicMaterialRenderArray(
    state.meshRendererRecord,
  );

let getLightMaterialRenderArray = (state: StateDataMainType.state) =>
  RenderArrayMeshRendererService.getLightMaterialRenderArray(
    state.meshRendererRecord,
  );

let getAllRenderArrayCount = () => (
  getBasicMaterialRenderArray
  |> StateLogicService.getEngineStateToGetData
  |> Js.Array.length,
  getLightMaterialRenderArray
  |> StateLogicService.getEngineStateToGetData
  |> Js.Array.length,
);