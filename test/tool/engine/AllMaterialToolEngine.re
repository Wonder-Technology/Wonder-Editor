open Wonderjs;

open MainStateDataType;

let setPrecision = (precision, state) => {
  ...state,
  gpuDetectRecord: {...state.gpuDetectRecord, precision: Some(precision)}
};

let preparePrecision = (state) => setPrecision(GPUDetectType.HIGHP, state);

let pregetGLSLData = (state) =>
  state |> preparePrecision |> PregetGLSLDataJob.execJob(Obj.magic(1));

let prepareForInit = () => {
  StateLogicService.getEditEngineState()
  |> pregetGLSLData
  |> StateLogicService.setEditEngineState;
  StateLogicService.getRunEngineState()
  |> pregetGLSLData
  |> StateLogicService.setRunEngineState
};