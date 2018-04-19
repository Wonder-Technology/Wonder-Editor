open SceneType;

/* let hasCurrentGameObject = (sceneRecord) =>
   switch sceneRecord.currentGameObject {
   | None => false
   | Some(_) => true
   }; */
let unsafeGetCurrentGameObject = (sceneRecord) =>
  sceneRecord.currentGameObject |> OptionService.unsafeGet;

let getCurrentGameObject = (sceneRecord) => sceneRecord.currentGameObject;

let setCurrentGameObject = (gameObject: Wonderjs.GameObjectType.gameObject, sceneRecord) => {
  ...sceneRecord,
  currentGameObject: Some(gameObject)
};

let clearCurrentGameObject = (sceneRecord) => {...sceneRecord, currentGameObject: None};