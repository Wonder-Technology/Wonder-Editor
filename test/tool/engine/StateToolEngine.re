open Wonderjs;

let getStateData = () => StateAPI.getStateData();

let setState = (state) => StateDataMainService.setState(getStateData(), state);