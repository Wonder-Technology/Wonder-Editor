module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;

  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectType.gameObject;
  type return = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), wdbGameObjectUid) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    DragWDBEventHandlerUtils.handleSelfLogic(
      (store, dispatchFunc),
      (),
      (
        switch (editorState |> SceneEditorService.getCurrentSceneTreeNode) {
        | None => SceneEngineService.getSceneGameObject(engineState)
        | Some(gameObject) => gameObject
        },
        wdbGameObjectUid,
      ),
    );
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);