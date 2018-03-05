let _buildSceneTreeAppState = (sceneGraphData) => {
  let state = TestToolUI.buildEmptyAppState();
  state.sceneTreeState.sceneGraphData = Some(sceneGraphData);
  state
};

let buildAppStateSceneGraphFromEngine = () =>
  StateFacade.prepareState()
  |> MainEditorSceneTreeView.getSceneGraphDataFromEngine
  |> _buildSceneTreeAppState;

let buildTwoLayerSceneGraphToEngine = () => {
  let (editorState, engineState) = StateFacade.prepareState();
  let scene = MainEditorSceneToolEngine.unsafeGetScene();
  let (engineState, box1) = MainEditorPrimitiveOper.createBox(engineState);
  let (engineState, box2) = MainEditorPrimitiveOper.createBox(engineState);
  let (engineState, box3) = MainEditorPrimitiveOper.createBox(engineState);
  let (engineState, box4) = MainEditorPrimitiveOper.createBox(engineState);
  let engineState =
    engineState
    |> MainEditorGameObjectOper.addChild(scene, box1)
    |> MainEditorGameObjectOper.addChild(box1, box4)
    |> MainEditorGameObjectOper.addChild(scene, box2)
    |> MainEditorGameObjectOper.addChild(scene, box3);
  (editorState, engineState) |> StateFacade.finishState
};

let buildThreeLayerSceneGraphToEngine = () => {
  let (editorState, engineState) = StateFacade.prepareState();
  let scene = MainEditorSceneToolEngine.unsafeGetScene();
  let (engineState, box1) = MainEditorPrimitiveOper.createBox(engineState);
  let (engineState, box2) = MainEditorPrimitiveOper.createBox(engineState);
  let (engineState, box3) = MainEditorPrimitiveOper.createBox(engineState);
  let (engineState, box4) = MainEditorPrimitiveOper.createBox(engineState);
  let engineState =
    engineState
    |> MainEditorGameObjectOper.addChild(scene, box1)
    |> MainEditorGameObjectOper.addChild(box1, box3)
    |> MainEditorGameObjectOper.addChild(box3, box4)
    |> MainEditorGameObjectOper.addChild(scene, box2);
  (editorState, engineState) |> StateFacade.finishState
};