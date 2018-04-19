let getDispatch = () => Reductive.Store.dispatch(IndexStore.store);

let buildEmptyAppState = () => AppStore.state;

/* let initMainEditor = (sandbox) => MainEditorMainTool.init(sandbox); */

let initEditorAndEngineStateAndInitScene = (sandbox) => {
  TestToolEngine.createAndSetEngineState(~sandbox, ());
  let engineForEditState = StateLogicService.getEditEngineState();
  let (engineForEditState, editEngineStateScene) =
    GameObjectEngineService.create(engineForEditState);
  let engineForRunState = StateLogicService.getRunEngineState();
  let (engineForRunState, runEngineStateScene) = GameObjectEngineService.create(engineForRunState);
  engineForRunState |> StateLogicService.setRunEngineState;
  let editorState = StateToolLogic.createEditorState();
  editorState
  |> SceneEditorService.setScene(runEngineStateScene)
  |> StateEditorService.setState
  |> ignore
};

let openContractCheck = () => EditorStateData.editorStateData.isDebug = true;

let closeContractCheck = () => EditorStateData.editorStateData.isDebug = false;