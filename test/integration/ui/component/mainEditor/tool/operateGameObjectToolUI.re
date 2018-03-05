let buildSceneGraphDataWithNewGameObject = (newGameObject, oldArray) =>
  StateFacade.prepareState()
  |> MainEditorSceneTreeView.buildSceneGraphDataWithNewGameObject(newGameObject, oldArray);

let getSceneGraphFromEngine = () =>
  StateFacade.prepareState() |> MainEditorSceneTreeView.getSceneGraphDataFromEngine;

let addBoxGameObject = () => {
  let (newGameObject, stateTuple) =
    StateFacade.prepareState() |> MainEditorSceneView.addBoxGameObject;
  stateTuple |> StateFacade.finishState;
  newGameObject
};