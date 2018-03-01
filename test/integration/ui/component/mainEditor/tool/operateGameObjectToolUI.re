let buildSceneGraphDataWithNewGameObject = (newGameObject, oldArray) =>
  MainEditorStateView.prepareState()
  |> MainEditorSceneTreeView.buildSceneGraphDataWithNewGameObject(newGameObject, oldArray);

let getSceneGraphFromEngine = () =>
  MainEditorStateView.prepareState() |> MainEditorSceneTreeView.getSceneGraphDataFromEngine;

let addBoxGameObject = () => {
  let (newGameObject, stateTuple) =
    MainEditorStateView.prepareState() |> MainEditorSceneView.addBoxGameObject;
  stateTuple |> MainEditorStateView.finishState;
  newGameObject
};