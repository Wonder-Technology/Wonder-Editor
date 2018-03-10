let _buildSceneTreeAppState = (sceneGraphData) => {
  let state = TestToolUI.buildEmptyAppState();
  state.sceneTreeState.sceneGraphData = Some(sceneGraphData);
  state
};

let buildAppStateSceneGraphFromEngine = () =>
  (
    (stateTuple) =>
      stateTuple |> MainEditorSceneTreeView.getSceneGraphDataFromEngine |> _buildSceneTreeAppState
  )
  |> StateLogicService.getState;

let buildTwoLayerSceneGraphToEngine = () => {
  let engineState = StateEngineService.getState();
  let scene = MainEditorSceneToolEngine.unsafeGetScene();
  let (engineState, box1) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box2) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box3) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box4) = PrimitiveEngineService.createBox(engineState);
  engineState |> StateEngineService.setState;
  (
    (engineState) =>
      engineState
      |> GameObjectEngineService.addChild(scene, box1)
      |> GameObjectEngineService.addChild(box1, box4)
      |> GameObjectEngineService.addChild(scene, box2)
      |> GameObjectEngineService.addChild(scene, box3)
  )
  |> StateLogicService.getAndSetEngineState
};

let buildThreeLayerSceneGraphToEngine = () => {
  let engineState = StateEngineService.getState();
  let scene = MainEditorSceneToolEngine.unsafeGetScene();
  let (engineState, box1) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box2) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box3) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box4) = PrimitiveEngineService.createBox(engineState);
  engineState |> StateEngineService.setState;
  (
    (engineState) =>
      engineState
      |> GameObjectEngineService.addChild(scene, box1)
      |> GameObjectEngineService.addChild(box1, box3)
      |> GameObjectEngineService.addChild(box3, box4)
      |> GameObjectEngineService.addChild(scene, box2)
  )
  |> StateLogicService.getAndSetEngineState
};