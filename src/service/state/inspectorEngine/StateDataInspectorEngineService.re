open Wonderjs;

let getStateData = () =>
  CreateInspectorEngineStateDataService.createStateData();

let unsafeGetState = () =>
  StateDataMainService.unsafeGetState(getStateData());

let setState = (state: StateDataMainType.state) =>
  StateDataMainService.setState(getStateData(), state);