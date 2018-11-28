open Wonderjs;

open StateDataMainType;

let setPrecision = (precision, state) => {
  ...state,
  gpuDetectRecord: {
    ...state.gpuDetectRecord,
    precision: Some(precision),
  },
};

let preparePrecision = state => setPrecision(GPUDetectType.HIGHP, state);

let pregetGLSLData = state =>
  state |> preparePrecision |> PregetGLSLDataJob.execJob(Obj.magic(1));

let prepareForInit = () => {
  WonderLog.Wonder_Console.makeObjInToWindow();

  StateEngineService.unsafeGetState()
  |> pregetGLSLData
  |> StateEngineService.setState
  |> ignore;
  /* StateEngineService.unsafeGetState();
     |> pregetGLSLData
     |> StateLogicService.setRunEngineState */
};