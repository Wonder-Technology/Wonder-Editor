open SceneType;

let unsafeGetEditScene = (sceneRecord) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|scene exist|j}, ~actual={j|not|j}),
              () => sceneRecord.editRoot |> assertExist
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug()
  );
  sceneRecord.editRoot |> Js.Option.getExn
};

let setEditScene = (scene: Wonderjs.GameObjectType.gameObject, sceneRecord) => {
  ...sceneRecord,
  editRoot: Some(scene)
};

let unsafeGetRunScene = (sceneRecord) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|scene exist|j}, ~actual={j|not|j}),
              () => sceneRecord.runRoot |> assertExist
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug()
  );
  sceneRecord.runRoot |> Js.Option.getExn
};

let setRunScene = (scene: Wonderjs.GameObjectType.gameObject, sceneRecord) => {
  ...sceneRecord,
  runRoot: Some(scene)
};