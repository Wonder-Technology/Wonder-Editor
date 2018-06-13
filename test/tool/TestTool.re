let getDispatch = () => Reductive.Store.dispatch(IndexStore.store);

let buildEmptyAppState = () => AppStore.state;



let createScene = () => {
  let engineForEditState = StateLogicService.getEditEngineState();
  let (engineForEditState, editEngineStateScene) =
    GameObjectEngineService.create(engineForEditState);
  let engineForRunState = StateLogicService.getRunEngineState();
  let (engineForRunState, runEngineStateScene) = GameObjectEngineService.create(engineForRunState);
  engineForRunState |> StateLogicService.setRunEngineState;
  let editorState = StateEditorService.getState();
  editorState
  |> SceneEditorService.setScene(runEngineStateScene)
  |> StateEditorService.setState
  |> ignore
};

let initEditorAndEngineStateAndInitScene = (~sandbox, ~buffer) => {
  TestToolEngine.createAndSetEngineState(~sandbox, ~buffer, ());
createScene();
};

let openContractCheck = () => CreateEditorStateDataEditorService.editorStateData.isDebug = true;

let closeContractCheck = () => CreateEditorStateDataEditorService.editorStateData.isDebug = false;