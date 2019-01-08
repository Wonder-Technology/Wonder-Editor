open UpdateStore;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectType.gameObject;
  type return = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), uid) => {
    StateEditorService.getState()
    |> CurrentNodeIdAssetEditorService.clearCurrentNodeId
    |> StateEditorService.setState
    |> ignore;

    StateEditorService.getState()
    |> SceneTreeEditorService.setCurrentSceneTreeNode(uid)
    |> CurrentSelectSourceEditorService.setCurrentSelectSource(
         SceneTreeWidgetService.getWidget(),
       )
    |> StateEditorService.setState
    |> ignore;

    dispatchFunc(
      AppStore.UpdateAction(Update([|SceneTree, Inspector, Project|])),
    )
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);