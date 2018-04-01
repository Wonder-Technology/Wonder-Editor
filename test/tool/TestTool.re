let getDispatch = () => Reductive.Store.dispatch(IndexStore.store);

let buildEmptyAppState = () => AppStore.state;

let initMainEditor = (sandbox) => MainEditorMainTool.init(sandbox);

let createAndSetEditorStateAndCreateAndSetScene = () => {
  let engineForEditState = StateLogicService.getEngineStateForEdit();
  let (engineForEditState, editEngineStateScene) =
    GameObjectEngineService.create(engineForEditState);
  let engineForRunState = StateLogicService.getEngineStateForRun();
  let (engineForRunState, runEngineStateScene) = GameObjectEngineService.create(engineForRunState);
  engineForRunState |> StateLogicService.setEngineStateForRun;
  let editorState = StateToolLogic.createEditorState();
  editorState
  |> SceneEditorService.setEditScene(editEngineStateScene)
  |> SceneEditorService.setRunScene(runEngineStateScene)
  |> StateEditorService.setState
  |> ignore
};

let createAndSetEditorAndEngineStateAndCreateAndSetScene = (sandbox) => {
  TestToolEngine.createAndSetEngineState(~sandbox, ());
  createAndSetEditorStateAndCreateAndSetScene()
};

let openContractCheck = () => EditorStateData.editorStateData.isDebug = true;

let closeContractCheck = () => EditorStateData.editorStateData.isDebug = false;