let buildSceneGraphDataWithNewGameObject = (newGameObject, oldArray) =>
  StateFacade.prepareState()
  |> MainEditorSceneTreeView.buildSceneGraphDataWithNewGameObject(newGameObject, oldArray);

let getSceneGraphFromEngine = () =>
  StateFacade.prepareState() |> MainEditorSceneTreeView.getSceneGraphDataFromEngine;

let addBox = () => {
  let (newGameObject, stateTuple) =
    /* StateFacade.prepareState() |> MainEditorSceneView.addBox( MainEditorSceneToolEngine.unsafeGetScene()); */
    StateFacade.prepareState() |> GameObjectLogicCompositeService.addBox( MainEditorSceneToolEngine.unsafeGetScene());
  stateTuple |> StateFacade.finishState;
  newGameObject
};