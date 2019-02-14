let getAllClonedGameObjectArr = clonedGameObjectArr =>
  clonedGameObjectArr |> WonderCommonlib.ArrayService.flatten;

let getClonedGameObject = clonedGameObjectArr =>
  clonedGameObjectArr
  |> WonderCommonlib.ArrayService.flatten
  |> ArrayService.unsafeGetFirst;