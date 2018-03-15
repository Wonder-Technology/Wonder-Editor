open Wonderjs;

open SceneType;

let unsafeGetScene = (sceneRecord) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|scene exist|j}, ~actual={j|not|j}),
              () => sceneRecord.root |> assertExist
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug()
  );
  sceneRecord.root |> Js.Option.getExn
};

let setScene = (scene: GameObjectType.gameObject, sceneRecord) => {
  ...sceneRecord,
  root: Some(scene)
};