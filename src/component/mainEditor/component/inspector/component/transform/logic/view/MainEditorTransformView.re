open MainEditorTransformBuss;

let getCurrentGameObjectLocalPosition = (stateTuple) =>
  stateTuple
  |> MainEditorSceneBuss.getCurrentGameObject
  |> getCurrentGameObjectLocalPosition(stateTuple);

let setCurrentGameObjectLocalPosition = (positionTuple, stateTuple) =>
  stateTuple
  |> setCurrentGameObjectLocalPosition(
       stateTuple |> MainEditorSceneBuss.getCurrentGameObject,
       positionTuple
     );