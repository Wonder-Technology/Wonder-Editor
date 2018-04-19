open SceneType;

let hasCurrentGameObject = (sceneRecord) =>
  switch sceneRecord.currentGameObject {
  | None => false
  | Some(_) => true
  };

let unsafeGetCurrentGameObject = (sceneRecord) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|current gameObject exist|j}, ~actual={j|not|j}),
              () => sceneRecord.currentGameObject |> assertExist
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug()
  );
  sceneRecord.currentGameObject |> Js.Option.getExn
};

let getCurrentGameObject = (sceneRecord) => sceneRecord.currentGameObject;

let setCurrentGameObject = (gameObject: Wonderjs.GameObjectType.gameObject, sceneRecord) => {
  ...sceneRecord,
  currentGameObject: Some(gameObject)
};

let clearCurrentGameObject = (sceneRecord) => {...sceneRecord, currentGameObject: None};