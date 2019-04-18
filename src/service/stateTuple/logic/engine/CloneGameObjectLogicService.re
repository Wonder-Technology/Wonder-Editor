let getAllClonedGameObjectArr = clonedGameObjectArr =>
  clonedGameObjectArr |> WonderCommonlib.ArrayService.flatten;

let getClonedGameObject = clonedGameObjectArr =>
  clonedGameObjectArr
  |> WonderCommonlib.ArrayService.flatten
  |> ArrayService.unsafeGetFirst;

let cloneGameObjectToOtherEngineState =
    (gameObject, clonedEngineState, targetEngineState) => {
  let (targetEngineState, newGameObject) =
    GameObjectEngineService.create(targetEngineState);

  (newGameObject, targetEngineState);
};

