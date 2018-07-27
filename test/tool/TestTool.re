let getDispatch = () => Reductive.Store.dispatch(IndexStore.store);

let buildEmptyAppState = () => AppStore.state;

let _buildSceneTreeAppState = sceneGraphData => {
  let state = buildEmptyAppState();
  {
    ...state,
    sceneTreeState: {
      ...state.sceneTreeState,
      sceneGraphData: Some(sceneGraphData),
    },
  };
};

let buildAppStateSceneGraphFromEngine = () =>
  (
    stateTuple =>
      stateTuple
      |> SceneTreeUtils.getSceneGraphDataFromEngine
      |> _buildSceneTreeAppState
  )
  |> StateLogicService.getStateToGetData;

let initScene = () => {
  let engineForEditState = StateLogicService.getEditEngineState();
  let editEngineStateScene =
    SceneEngineService.getSceneGameObject(engineForEditState);

  engineForEditState
  |> GameObjectEngineService.setGameObjectName("scene", editEngineStateScene)
  |> StateLogicService.setEditEngineState;

  let engineForRunState = StateLogicService.getRunEngineState();
  let runEngineStateScene =
    SceneEngineService.getSceneGameObject(engineForRunState);

  engineForRunState
  |> GameObjectEngineService.setGameObjectName("scene", runEngineStateScene)
  |> StateLogicService.setRunEngineState;
};

let initEditorAndEngineStateAndInitSceneWithJob =
    (~sandbox, ~buffer, ~noWorkerJobRecord, ()) => {
  TestToolEngine.createAndSetEngineState(
    ~sandbox,
    ~buffer,
    ~noWorkerJobRecord,
    (),
  );
  initScene();
};

let initEditorAndEngineStateAndInitScene = (~sandbox, ~buffer, ()) => {
  TestToolEngine.createAndSetEngineState(~sandbox, ~buffer, ());
  initScene();
};

let openContractCheck = () =>
  CreateEditorStateDataEditorService.editorStateData.isDebug = true;

let closeContractCheck = () =>
  CreateEditorStateDataEditorService.editorStateData.isDebug = false;