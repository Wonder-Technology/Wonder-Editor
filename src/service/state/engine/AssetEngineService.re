open Wonderjs;

let loadToData = (jsonPathArr, stateData) =>
  LoaderManagerSystem.loadConfig(
    jsonPathArr,
    LoaderManagerAPI._fetch,
    stateData,
  );