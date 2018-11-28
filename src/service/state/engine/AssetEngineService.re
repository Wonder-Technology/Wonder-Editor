open Wonderjs;

let loadConfig = (jsonPathArr, stateData) =>
  LoaderManagerSystem.loadConfig(
    jsonPathArr,
    LoaderManagerAPI._fetch,
    stateData,
  );