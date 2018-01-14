open MainEditorTransformBuss;

/* TODO refactor */
let _isCurrentGameObjectExist = (gameObject) =>
  switch gameObject {
  | None =>
    WonderCommonlib.LogUtils.warn("getCurrentGameObjectLocalPosition:current gameObject not exist")
    |> Obj.magic
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