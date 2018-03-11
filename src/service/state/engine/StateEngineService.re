
open Wonderjs;

let deepCopyStateForRestore = State.deepCopyStateForRestore;

let restoreState = State.restoreState;

let getStateData = () => StateData.stateData;

let getState = () => StateSystem.getState(getStateData());

let setState = (state) => StateSystem.setState(getStateData(), state);
