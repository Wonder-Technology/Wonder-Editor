open DiffType;

open SceneGraphType;

let disposeCurrentSceneTreeNode = currentTreeNode => {
  let rec _iterateSceneGraphRemove = removedTreeNodeArr =>
    removedTreeNodeArr
    |> Js.Array.forEach(({uid, children}) => {
         GameObjectEngineService.disposeGameObjectKeepOrderRemoveGeometry
         |> StateLogicService.getAndSetEngineStateWithDiff([|
              {arguments: [|uid|], type_: GameObject},
            |]);

         _iterateSceneGraphRemove(children);
       });

  _iterateSceneGraphRemove([|currentTreeNode|]);

  SceneEditorService.clearCurrentSceneTreeNode
  |> StateLogicService.getAndSetEditorState;
};