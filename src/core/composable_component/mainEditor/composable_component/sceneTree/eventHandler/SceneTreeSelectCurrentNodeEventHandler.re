open UpdateStore;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectType.gameObject;

  let handleSelfLogic = ((store, dispatchFunc), (), uid) => {
    StateEditorService.getState()
    |> CurrentNodeDataAssetEditorService.clearCurrentNodeData
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
        Update([|SceneTree, Inspector, BottomComponent|]),
      ),
    )
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);