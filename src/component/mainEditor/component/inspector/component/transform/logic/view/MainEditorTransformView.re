open MainEditorTransformBuss;

let _isCurrentGameObjectExist = (gameObject) =>
  switch gameObject {
  | None =>
    ExcepetionHandleSystem.throwMessage(
      "getCurrentGameObjectLocalPosition:current gameObject not exist"
    )
  | Some(gameObject) => gameObject
  };

let getCurrentGameObjectLocalPosition = (stateTuple) =>
  stateTuple
  |> MainEditorSceneBuss.getCurrentGameObject
  |> _isCurrentGameObjectExist
  |> getCurrentGameObjectLocalPosition(stateTuple);

let setCurrentGameObjectLocalPosition = (positionTuple, stateTuple) =>
  stateTuple
  |> setCurrentGameObjectLocalPosition(
       stateTuple |> MainEditorSceneBuss.getCurrentGameObject |> _isCurrentGameObjectExist,
       positionTuple
     );