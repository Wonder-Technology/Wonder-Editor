open Wonderjs;

let deepCopyForRestore = StateAPI.deepCopyForRestore;

let restoreState = StateAPI.restoreState;

let getStateData = () => StateAPI.getStateData();

let getState = () => StateAPI.getState();

let setState = (state) => state |> StateAPI.setState;