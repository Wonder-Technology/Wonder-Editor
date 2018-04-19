open Wonderjs;

let getStateData = () => StateAPI.getStateData();

let getState = () => StateDataMainService.getState(getStateData());

let setState = (state) => StateDataMainService.setState(getStateData(), state);