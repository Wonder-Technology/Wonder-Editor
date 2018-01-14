open MainEditorTransformBuss;

let getCurrentGameObjectLocalPosition = (stateTuple) =>
  stateTuple
  |> MainEditorSceneBuss.unsafeGetCurrentGameObject
  |> getCurrentGameObjectLocalPosition(stateTuple);

let setCurrentGameObjectLocalPosition = (positionTuple, stateTuple) =>
  stateTuple
  |> setCurrentGameObjectLocalPosition(
       stateTuple |> MainEditorSceneBuss.unsafeGetCurrentGameObject,
       positionTuple
     );