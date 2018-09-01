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
let _buildSceneTreeAppStateWithInspectorState = sceneGraphData => {
  let state = buildEmptyAppState();
  {
    ...state,
    sceneTreeState: {
      ...state.sceneTreeState,
      sceneGraphData: Some(sceneGraphData),
    },
    inspectorState: {
      ...state.inspectorState,
      showComponentMap:
        state.inspectorState.showComponentMap
        |> SparseMapService.immutableSet(
             InspectorComponentType.Transform
             |> InspectorComponentType.convertComponentTypeToInt,
             false,
           ),
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
let buildAppStateSceneGraphAndInspectorState = () =>
  (
    stateTuple =>
      stateTuple
      |> SceneTreeUtils.getSceneGraphDataFromEngine
      |> _buildSceneTreeAppStateWithInspectorState
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
    (~sandbox, ~buffer, ~noWorkerJobRecord,
    ~isBuildFakeDom=true,
    ()) => {
  TestToolEngine.createAndSetEngineState(
    ~sandbox,
    ~buffer,
    ~noWorkerJobRecord,
    ~isBuildFakeDom,
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