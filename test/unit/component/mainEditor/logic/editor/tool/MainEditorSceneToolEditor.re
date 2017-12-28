let getCurrentGameObject = () =>
  MainEditorStateView.prepareState() |> MainEditorSceneView.getCurrentGameObject;

let getScene = () =>
  MainEditorStateView.prepareState() |> MainEditorSceneTreeView.getSceneGraphData;