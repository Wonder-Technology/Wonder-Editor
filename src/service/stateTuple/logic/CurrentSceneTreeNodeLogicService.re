

open SceneGraphType;

let disposeCurrentSceneTreeNode = currentTreeNode => {
  let rec _iterateSceneGraphRemove = removedTreeNodeArr =>
    removedTreeNodeArr
    |> Js.Array.forEach(({uid, children}) => {
         GameObjectEngineService.disposeGameObjectKeepOrderRemoveGeometry(uid)
         |> StateLogicService.getAndRefreshEngineStateWithFunc;

         _iterateSceneGraphRemove(children);
       });

  _iterateSceneGraphRemove([|currentTreeNode|]);

  SceneEditorService.clearCurrentSceneTreeNode
  |> StateLogicService.getAndSetEditorState;
};