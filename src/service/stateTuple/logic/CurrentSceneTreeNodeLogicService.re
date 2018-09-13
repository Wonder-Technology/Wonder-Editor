open SceneGraphType;

let disposeCurrentSceneTreeNode = currentTreeNode => {
  let rec _iterateSceneGraphRemove = removedTreeNodeArr =>
    removedTreeNodeArr
    |> Js.Array.forEach(({uid, children}) => {
         GameObjectEngineService.disposeGameObjectKeepOrderRemoveGeometry(uid)
         |> StateLogicService.getAndSetEngineState;

         _iterateSceneGraphRemove(children);
       });

  _iterateSceneGraphRemove([|currentTreeNode|]);

  StateLogicService.getAndRefreshEngineState();

  SceneEditorService.clearCurrentSceneTreeNode
  |> StateLogicService.getAndSetEditorState;
};