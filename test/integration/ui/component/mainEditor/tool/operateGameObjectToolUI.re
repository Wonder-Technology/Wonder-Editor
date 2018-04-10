let buildSceneGraphDataWithNewGameObject = (newGameObject, oldArray) =>
  SceneTreeUtils.buildSceneGraphDataWithNewGameObject(newGameObject, oldArray)
  |> StateLogicService.getEngineStateToGetData;

let getSceneGraphFromEngine = () =>
  SceneTreeUtils.getSceneGraphDataFromEngine |> StateLogicService.getStateToGetData;

let addBox = () =>
  SceneUtils.addGameObject(MainEditorSceneTool.unsafeGetScene(), PrimitiveEngineService.createBox);