let addGameObject = (targetGameObject, createGameObjectFunc) => {
  let (engineStateForEdit, box1) =
    StateLogicService.getEditEngineState() |> createGameObjectFunc;

  engineStateForEdit
  |> GameObjectEngineService.initGameObject(box1)
  |> GameObjectUtils.addChild(targetGameObject, box1)
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setEditEngineState;

  let (engineStateForRun, box2) =
    StateLogicService.getRunEngineState() |> createGameObjectFunc;

  engineStateForRun
  |> GameObjectEngineService.initGameObject(box2)
  |> GameObjectUtils.addChild(targetGameObject, box2)
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setRunEngineState;
  box2;
};