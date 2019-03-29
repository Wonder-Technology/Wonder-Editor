open Wonderjs;

let createStateData = () =>
  CreateInspectorEngineStateDataService.createStateData();

let stateData = CreateInspectorEngineStateDataService.createStateData();

let getStateData = () => stateData;

let unsafeGetState = () =>
  StateDataMainService.unsafeGetState(getStateData());

let setState = (state: StateDataMainType.state) =>
  StateDataMainService.setState(getStateData(), state);