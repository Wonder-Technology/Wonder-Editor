module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;

  type prepareTuple = unit;
  type dataTuple = (
    Wonderjs.GameObjectType.gameObject,
    Wonderjs.GameObjectType.gameObject,
  );

  let handleSelfLogic =
      ((store, dispatchFunc), (), (targetGameObjectUid, wdbGameObjectUid)) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let (isSuccess, (editorState, engineState)) =
      DragWDBUtils.dragWDB(
        wdbGameObjectUid,
        targetGameObjectUid,
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