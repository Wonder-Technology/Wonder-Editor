module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;

  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectType.gameObject;

  let handleSelfLogic = ((store, dispatchFunc), (), wdbGameObjectUid) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let (isSuccess, (editorState, engineState)) =
      DragWDBUtils.dragWDB(
        wdbGameObjectUid,
        switch (editorState |> SceneEditorService.getCurrentSceneTreeNode) {
        | None => SceneEngineService.getSceneGameObject(engineState)
        | Some(gameObject) => gameObject
        },
        (editorState, engineState),
      );

    editorState |> StateEditorService.setState |> ignore;
    engineState |> StateEngineService.setState |> ignore;

    isSuccess ?
      {
        dispatchFunc(
          AppStore.SceneTreeAction(
            SetSceneGraph(
              Some(
                SceneTreeUtils.getSceneGraphDataFromEngine
                |> StateLogicService.getStateToGetData,
              ),
            ),
          ),
        )
        |> ignore;

        dispatchFunc(
          AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])),
        )
        |> ignore;

        ();
      } :
      ();
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);