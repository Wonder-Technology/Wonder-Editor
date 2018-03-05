
open Wonderjs;

let getStateData = () => StateData.stateData;

let getState = StateSystem.getState;

let setState = StateSystem.setState;

let deepCopyStateForRestore = State.deepCopyStateForRestore;

let restoreState = State.restoreState;
