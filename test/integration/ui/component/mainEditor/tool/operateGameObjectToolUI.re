let buildSceneGraphDataWithNewGameObject = (newGameObject, oldArray) =>
  SceneTreeUtils.buildSceneGraphDataWithNewGameObject(newGameObject, oldArray)
  |> StateLogicService.getEngineState;

let getSceneGraphFromEngine = () =>
  SceneTreeUtils.getSceneGraphDataFromEngine |> StateLogicService.getState;

let addBox = () => {
  let (newGameObject, engineState) =
    SceneEngineService.addBox(MainEditorSceneTool.unsafeGetScene())
    |> StateLogicService.getEngineState;
  engineState |> StateEngineService.setState;
  newGameObject
};