open DiffType;

let disposeCurrentSceneTreeNode = gameObject => {
  GameObjectEngineService.disposeGameObjectKeepOrder
  |> StateLogicService.getAndRefreshEngineStateWithDiff([|
       {arguments: [|gameObject|], type_: GameObject},
     |]);
  SceneEditorService.clearCurrentSceneTreeNode
  |> StateLogicService.getAndSetEditorState;
};