let getDispatch = UIStateService.getDispatch;

let buildEmptyAppState = () => AppStore.state;

let _buildInspectorAppState = () => {
  let state = buildEmptyAppState();
  {
    ...state,
    inspectorState: {
      ...state.inspectorState,
      showComponentMap:
        state.inspectorState.showComponentMap
        |> WonderCommonlib.ImmutableSparseMapService.set(
             InspectorComponentType.Transform
             |> InspectorComponentType.convertComponentTypeToInt,
             false,
           ),
    },
  };
};

let buildAppStateInspectorState = () =>
  (stateTuple => _buildInspectorAppState())
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

let _buildFakeConsole = [%bs.raw
  () => {|
  window.console.profile = (_) => {};
  window.console.profileEnd = () => {};
  |}
];

let initEditorAndEngineStateAndInitSceneWithJob =
    (
      ~sandbox,
      ~buffer,
      ~noWorkerJobRecord,
      ~isBuildFakeDom=true,
      ~isInitJob=true,
      ~context=TestToolEngine.getDefaultContext(),
      (),
    ) => {
  TestToolEngine.createAndSetEngineState(
    ~sandbox,
    ~buffer,
    ~noWorkerJobRecord,
    ~isBuildFakeDom,
    ~isInitJob,
    ~context,
    (),
  );
  initScene();
  _buildFakeConsole(.);
};

let initEditorAndEngineStateAndInitScene = (~sandbox, ~buffer, ()) => {
  TestToolEngine.createAndSetEngineState(~sandbox, ~buffer, ());
  initScene();
};

let openContractCheck = () => {
  StateEditorService.setStateIsDebug(true);
  StateEngineService.setIsDebug(true) |> ignore;
};

let closeContractCheck = () => {
  StateEditorService.setStateIsDebug(false);
  StateEngineService.setIsDebug(false) |> ignore;
};