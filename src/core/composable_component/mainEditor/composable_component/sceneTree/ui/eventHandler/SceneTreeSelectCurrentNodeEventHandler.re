open UpdateStore;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectType.gameObject;

  let handleSelfLogic = ((store, dispatchFunc), (), uid) => {
    StateAssetService.getState()
    |> CurrentNodeDataAssetService.clearCurrentNodeData
    |> StateAssetService.setState
    |> ignore;

    StateEditorService.getState()
    |> SceneEditorService.setCurrentSceneTreeNode(uid)
    |> CurrentSelectSourceEditorService.setCurrentSelectSource(
         EditorType.SceneTree,
       )
    |> StateEditorService.setState
    |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|SceneTree, Inspector|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);