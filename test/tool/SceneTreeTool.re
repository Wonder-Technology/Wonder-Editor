let _buildSceneTreeAppState = sceneGraphData => {
  let state = TestTool.buildEmptyAppState();
  state.sceneTreeState.sceneGraphData = Some(sceneGraphData);
  state;
};

let buildAppStateSceneGraphFromEngine = () =>
  (
    stateTuple =>
      stateTuple
      |> SceneTreeUtils.getSceneGraphDataFromEngine
      |> _buildSceneTreeAppState
  )
  |> StateLogicService.getStateToGetData;

let _prepareSpecificGameObjectsForEditEngineState = editEngineState => {
  let scene = MainEditorSceneTool.unsafeGetScene();
  let (engineState, camera) =
    CameraEngineService.createCamera(editEngineState);
  let (engineState, box) = PrimitiveEngineService.createBox(engineState);
  engineState
  |> GameObjectUtils.addChild(scene, camera)
  |> GameObjectUtils.addChild(scene, box);
};

let _buildTwoLayerSceneGraphToTargetEngine = engineState => {
  let scene = MainEditorSceneTool.unsafeGetScene();
  let (engineState, box1) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box2) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box3) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box4) = PrimitiveEngineService.createBox(engineState);
  engineState
  |> GameObjectUtils.addChild(scene, box1)
  |> GameObjectUtils.addChild(box1, box4)
  |> GameObjectUtils.addChild(scene, box2)
  |> GameObjectUtils.addChild(scene, box3);
};

let buildTwoLayerSceneGraphToEngine = () => {
  let (editorState, editEngineState) =
    StateLogicService.getEditEngineState()
    |> _prepareSpecificGameObjectsForEditEngineState
    |> DefaultSceneUtils.computeDiffValue(StateEditorService.getState());
  editEngineState
  |> _buildTwoLayerSceneGraphToTargetEngine
  |> StateLogicService.setEditEngineState;
  editorState |> StateEditorService.setState |> ignore;
  StateLogicService.getRunEngineState()
  |> _buildTwoLayerSceneGraphToTargetEngine
  |> StateLogicService.setRunEngineState;
};

let _buildThreeLayerSceneGraphToTargetEngine = engineState => {
  let scene = MainEditorSceneTool.unsafeGetScene();
  let (engineState, box1) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box2) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box3) = PrimitiveEngineService.createBox(engineState);
  let (engineState, box4) = PrimitiveEngineService.createBox(engineState);
  engineState
  |> GameObjectUtils.addChild(scene, box1)
  |> GameObjectUtils.addChild(box1, box3)
  |> GameObjectUtils.addChild(box3, box4)
  |> GameObjectUtils.addChild(scene, box2);
};

let buildThreeLayerSceneGraphToEngine = () => {
  let (editorState, editEngineState) =
    StateLogicService.getEditEngineState()
    |> _prepareSpecificGameObjectsForEditEngineState
    |> DefaultSceneUtils.computeDiffValue(StateEditorService.getState());
  editEngineState
  |> _buildThreeLayerSceneGraphToTargetEngine
  |> StateLogicService.setEditEngineState;
  editorState |> StateEditorService.setState |> ignore;
  StateLogicService.getRunEngineState()
  |> _buildThreeLayerSceneGraphToTargetEngine
  |> StateLogicService.setRunEngineState;
};

let setSceenTreeSpecificGameObject = clickTreeNodeIndex => {
  let component =
    BuildComponentTool.buildSceneTree(buildAppStateSceneGraphFromEngine());
  BaseEventTool.triggerComponentEvent(
    component,
    SceneTreeEventTool.triggerClickEvent(clickTreeNodeIndex),
  );
};