open MainEditorTransformBuss;

let _isCurrentGameObjectExist = (gameObject) =>
  switch gameObject {
  | None =>
    WonderCommonlib.DebugUtils.log("game object err") |> ignore;
    1
  /* ExcepetionHandleSystem.throwMessage(
       "getCurrentGameObjectLocalPosition:current gameObject not exist"
     ) */
  | Some(gameObject) => Js.log("this is exist gameobject");gameObject
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