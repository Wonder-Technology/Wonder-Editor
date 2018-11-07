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
      |> SceneGraphUtils.getSceneGraphDataFromEngine
      |> _buildSceneTreeAppState
  )
  |> StateLogicService.getStateToGetData;

let buildAppStateSceneGraphAndInspectorState = () =>
  (
    stateTuple =>
      stateTuple
      |> SceneGraphUtils.getSceneGraphDataFromEngine
      |> _buildSceneTreeAppStateWithInspectorState
  )
  |> StateLogicService.getStateToGetData;

let initScene = () => {
  let engineState = StateEngineService.unsafeGetState();
  let engineStateScene = SceneEngineService.getSceneGameObject(engineState);

  engineState
  |> GameObjectEngineService.setGameObjectName("scene", engineStateScene)
  |> StateEngineService.setState
  |> ignore;
  /* let engineForRunState = StateEngineService.unsafeGetState();
     let runEngineStateScene =
       SceneEngineService.getSceneGameObject(engineForRunState);

     engineForRunState
     |> GameObjectEngineService.setGameObjectName("scene", runEngineStateScene)
     |> StateLogicService.setRunEngineState; */
};

let initEditorAndEngineStateAndInitSceneWithJob =
    (~sandbox, ~buffer, ~noWorkerJobRecord, ~isBuildFakeDom=true, ~isInitJob=true, ()) => {
  TestToolEngine.createAndSetEngineState(
    ~sandbox,
    ~buffer,
    ~noWorkerJobRecord,
    ~isBuildFakeDom,
    ~isInitJob,
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