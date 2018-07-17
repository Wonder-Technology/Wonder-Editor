module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectType.gameObject;

  let execPrepareUndoFunc = ((store, dispatchFunc), (), uid) => {
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

    dispatchFunc(AppStore.ReLoad) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);