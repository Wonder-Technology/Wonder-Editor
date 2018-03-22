let addGameObject = (targetGameObject, createGameObjectFunc) => {
  let (engineStateForEdit, box1) =
    StateLogicService.getEngineStateForEdit() |> createGameObjectFunc;
  engineStateForEdit
  |> GameObjectEngineService.initGameObject(box1)
  |> GameObjectUtils.addChild(targetGameObject, box1)
  |> StateLogicService.setEngineStateForEdit;
  switch (EngineStateDataEditorService.getIsRun()) {
  | false => ()
  | true =>
    let (engineStateForRun, box2) =
      StateLogicService.getEngineStateForRun() |> createGameObjectFunc;
    engineStateForRun
    |> GameObjectEngineService.initGameObject(box2)
    |> GameObjectUtils.addChild(targetGameObject, box2)
    |> StateLogicService.setEngineStateForRun
  };
  box1
};