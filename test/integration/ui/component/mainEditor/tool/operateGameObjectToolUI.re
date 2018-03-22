let buildSceneGraphDataWithNewGameObject = (newGameObject, oldArray) =>
  SceneTreeUtils.buildSceneGraphDataWithNewGameObject(newGameObject, oldArray)
  |> StateLogicService.getEngineState;

let getSceneGraphFromEngine = () =>
  SceneTreeUtils.getSceneGraphDataFromEngine |> StateLogicService.getState;

let addBox = () =>
  SceneLogicService.addGameObject(
    MainEditorSceneTool.unsafeGetScene(),
    PrimitiveEngineService.createBox
  );
  