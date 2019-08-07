open Wonderjs.StateDataMainType;

let setMaxTextureUnit = (maxTextureUnit, state) => {
  ...state,
  gpuDetectRecord: {
    ...state.gpuDetectRecord,
    maxTextureUnit: Some(maxTextureUnit),
  },
};