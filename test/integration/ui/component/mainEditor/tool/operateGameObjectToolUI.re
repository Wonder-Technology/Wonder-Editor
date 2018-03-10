let buildSceneGraphDataWithNewGameObject = (newGameObject, oldArray) =>
  MainEditorSceneTreeView.buildSceneGraphDataWithNewGameObject(newGameObject, oldArray)
  |> StateLogicService.getState;

let getSceneGraphFromEngine = () =>
  MainEditorSceneTreeView.getSceneGraphDataFromEngine |> StateLogicService.getState;

let addBox = () => {
  let (newGameObject, engineState) =
    SceneEngineService.addBox(MainEditorSceneToolEngine.unsafeGetScene())
    |> StateLogicService.getEngineState;
  engineState |> StateEngineService.setState;
  newGameObject
};