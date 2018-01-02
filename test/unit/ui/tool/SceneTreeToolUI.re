
let _buildSceneTreeAppState = (sceneGraphData) => {
  let state = TestToolUI.buildEmptyAppState();
  state.sceneTreeState.sceneGraphData = Some(sceneGraphData);
  state
};

let buildAppStateSceneGraphFromEngine = () =>
  MainEditorStateView.prepareState()
  |> MainEditorSceneTreeView.getSceneGraphData
  |> WonderCommonlib.DebugUtils.log
  |> _buildSceneTreeAppState;