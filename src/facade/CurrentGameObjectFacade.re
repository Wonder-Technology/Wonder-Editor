let getCurrentGameObject = ((editorState, engineState)) =>
  editorState |> CurrentGameObjectLogicService.getCurrentGameObject;

let unsafeGetCurrentGameObject = ((editorState, engineState)) =>
  editorState |> CurrentGameObjectLogicService.unsafeGetCurrentGameObject;

let setCurrentGameObject = (gameObject, (editorState, engineState)) => (
  editorState |> CurrentGameObjectLogicService.setCurrentGameObject(gameObject),
  engineState
);

let clearCurrentGameObject = ((editorState, engineState)) => (
  editorState |> CurrentGameObjectLogicService.clearCurrentGameObject,
  engineState
);

let hasCurrentGameObject = ((editorState, engineState)) =>
  editorState |> CurrentGameObjectLogicService.hasCurrentGameObject;