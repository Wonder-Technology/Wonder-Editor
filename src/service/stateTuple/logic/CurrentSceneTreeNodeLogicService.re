open DiffType;

open SceneGraphType;

let disposeCurrentSceneTreeNode = removedTreeNode => {
  /* TODO rename to removedTreeNode */
  let rec _iterateSceneGraphRemove = removedTreeNode =>
    removedTreeNode
    |> Js.Array.forEach(({uid, children}) => {
         GameObjectEngineService.disposeGameObjectKeepOrder
         |> StateLogicService.getAndRefreshEngineStateWithDiff([|
              {arguments: [|uid|], type_: GameObject},
            |]);

         _iterateSceneGraphRemove(children);
       });

  _iterateSceneGraphRemove([|removedTreeNode|]);
  SceneEditorService.clearCurrentSceneTreeNode
  |> StateLogicService.getAndSetEditorState;
};