let _buildSceneTreeAppState = (sceneGraphData) => {
  let state = TestTool.buildEmptyAppState();
  state.sceneTreeState.sceneGraphData = Some(sceneGraphData);
  state
};

let buildAppStateSceneGraphFromEngine = () =>
  (
    (stateTuple) =>
      stateTuple |> SceneTreeUtils.getSceneGraphDataFromEngine |> _buildSceneTreeAppState
  )
  |> StateLogicService.getStateToGetData;

let _buildTwoLayerSceneGraphToTargetEngine = (engineState, getAndSetEditEngineStateFunc) => {
  let scene = MainEditorSceneTool.unsafeGetScene();
  let (engineState, box1) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box2) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box3) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box4) = PrimitiveEngineService.createBox(engineState);
  engineState |> StateLogicService.setEngineStateForEdit;
  (
    (engineState) =>
      engineState
      |> GameObjectUtils.addChild(scene, box1)
      |> GameObjectUtils.addChild(box1, box4)
      |> GameObjectUtils.addChild(scene, box2)
      |> GameObjectUtils.addChild(scene, box3)
  )
  |> getAndSetEditEngineStateFunc
  |> ignore
};

let buildTwoLayerSceneGraphToEngine = () => {
  _buildTwoLayerSceneGraphToTargetEngine(
    StateLogicService.getEngineStateForEdit(),
    StateLogicService.getAndSetEditEngineState
  );
  _buildTwoLayerSceneGraphToTargetEngine(
    StateLogicService.getEngineStateForRun(),
    StateLogicService.getAndSetRunEngineState
  )
};

let _buildThreeLayerSceneGraphToTargetEngine = (engineState, getAndSetEditEngineStateFunc) => {
  let scene = MainEditorSceneTool.unsafeGetScene();
  let (engineState, box1) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box2) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box3) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box4) = PrimitiveEngineService.createBox(engineState);
  engineState |> StateLogicService.setEngineStateForEdit;
  (
    (engineState) =>
      engineState
      |> GameObjectUtils.addChild(scene, box1)
      |> GameObjectUtils.addChild(box1, box3)
      |> GameObjectUtils.addChild(box3, box4)
      |> GameObjectUtils.addChild(scene, box2)
  )
  |> getAndSetEditEngineStateFunc
};

let buildThreeLayerSceneGraphToEngine = () => {
  _buildThreeLayerSceneGraphToTargetEngine(
    StateLogicService.getEngineStateForEdit(),
    StateLogicService.getAndSetEditEngineState
  );
  _buildThreeLayerSceneGraphToTargetEngine(
    StateLogicService.getEngineStateForRun(),
    StateLogicService.getAndSetRunEngineState
  )
};