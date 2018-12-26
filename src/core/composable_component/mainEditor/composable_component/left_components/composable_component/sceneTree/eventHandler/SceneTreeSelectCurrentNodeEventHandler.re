open UpdateStore;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectType.gameObject;
  type return = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), uid) => {
    StateEditorService.getState()
    |> CurrentNodeAssetEditorService.clearCurrentNodeId
    |> StateEditorService.setState
    |> ignore;

    StateEditorService.getState()
    |> SceneEditorService.setCurrentSceneTreeNode(uid)
    |> CurrentSelectSourceEditorService.setCurrentSelectSource(
         EditorType.SceneTree,
       )
    |> StateEditorService.setState
    |> ignore;

    dispatchFunc(
      AppStore.UpdateAction(
        Update([|SceneTree, Inspector, Project|]),
      ),
    )
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);