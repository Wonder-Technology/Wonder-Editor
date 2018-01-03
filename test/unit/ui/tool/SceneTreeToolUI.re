let _buildSceneTreeAppState = (sceneGraphData) => {
  let state = TestToolUI.buildEmptyAppState();
  state.sceneTreeState.sceneGraphData = Some(sceneGraphData);
  state
};

let buildAppStateSceneGraphFromEngine = () =>
  MainEditorStateView.prepareState()
  |> MainEditorSceneTreeView.getSceneGraphData
  |> _buildSceneTreeAppState;

let buildTwoLayerSceneGraphToEngine = () => {
  let (editorState, engineState) = MainEditorStateView.prepareState();
  let scene = MainEditorSceneToolEngine.getScene();
  let (engineState, box1) = MainEditorPrimitiveOper.createBox(engineState);
  let (engineState, box2) = MainEditorPrimitiveOper.createBox(engineState);
  let (engineState, box3) = MainEditorPrimitiveOper.createBox(engineState);
  let (engineState, box4) = MainEditorPrimitiveOper.createBox(engineState);
  let engineState =
    engineState
    |> MainEditorGameObjectOper.addChild(scene, box1)
    |> MainEditorGameObjectOper.addChild(scene, box2)
    |> MainEditorGameObjectOper.addChild(scene, box3);
  Js.log(engineState |> MainEditorGameObjectOper.getChildren(scene));
  (editorState, engineState) |> MainEditorStateView.finishState
};