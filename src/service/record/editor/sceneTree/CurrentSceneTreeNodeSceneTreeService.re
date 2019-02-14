open SceneTreeType;

let unsafeGetCurrentSceneTreeNode = (sceneTreeRecord) =>
  sceneTreeRecord.currentSceneTreeNode |> OptionService.unsafeGet;

let getCurrentSceneTreeNode = (sceneTreeRecord) => sceneTreeRecord.currentSceneTreeNode;

let setCurrentSceneTreeNode = (gameObject: Wonderjs.GameObjectPrimitiveType.gameObject, sceneTreeRecord) => {
  ...sceneTreeRecord,
  currentSceneTreeNode: Some(gameObject)
};

let clearCurrentSceneTreeNode = (sceneTreeRecord) => {...sceneTreeRecord, currentSceneTreeNode: None};