open Wonderjs;

let getStateData = () => StateAPI.getStateData();

let setState = state => StateDataMainService.setState(getStateData(), state);

let setStateByFunc = StateDataMainService.setStateByFunc;

let isEqual = (state1, state2) => state1 === state2;