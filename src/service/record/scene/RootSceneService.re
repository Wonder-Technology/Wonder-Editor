open SceneType;

let unsafeGetScene = (sceneRecord) => sceneRecord.root |> OptionService.unsafeGet;

let setScene = (scene: Wonderjs.GameObjectType.gameObject, sceneRecord) => {
  ...sceneRecord,
  root: Some(scene)
};