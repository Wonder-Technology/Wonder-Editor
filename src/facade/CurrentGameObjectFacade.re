let getCurrentGameObject = ((editorState, engineState)) =>
  editorState |> CurrentGameObjectLogicSingleService.getCurrentGameObject;

let unsafeGetCurrentGameObject = ((editorState, engineState)) =>
  editorState |> CurrentGameObjectLogicSingleService.unsafeGetCurrentGameObject;

let setCurrentGameObject = (gameObject, (editorState, engineState)) => (
  editorState |> CurrentGameObjectLogicSingleService.setCurrentGameObject(gameObject),
  engineState
);

let clearCurrentGameObject = ((editorState, engineState)) => (
  editorState |> CurrentGameObjectLogicSingleService.clearCurrentGameObject,
  engineState
);

let hasCurrentGameObject = ((editorState, engineState)) =>
  editorState |> CurrentGameObjectLogicSingleService.hasCurrentGameObject;