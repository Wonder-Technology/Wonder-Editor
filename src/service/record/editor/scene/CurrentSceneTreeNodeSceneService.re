open SceneType;

/* let hasCurrentSceneTreeNode = (sceneRecord) =>
   switch sceneRecord.currentSceneTreeNode {
   | None => false
   | Some(_) => true
   }; */
let unsafeGetCurrentSceneTreeNode = (sceneRecord) =>
  sceneRecord.currentSceneTreeNode |> OptionService.unsafeGet;

let getCurrentSceneTreeNode = (sceneRecord) => sceneRecord.currentSceneTreeNode;

let setCurrentSceneTreeNode = (gameObject: Wonderjs.GameObjectType.gameObject, sceneRecord) => {
  ...sceneRecord,
  currentSceneTreeNode: Some(gameObject)
};

let clearCurrentSceneTreeNode = (sceneRecord) => {...sceneRecord, currentSceneTreeNode: None};