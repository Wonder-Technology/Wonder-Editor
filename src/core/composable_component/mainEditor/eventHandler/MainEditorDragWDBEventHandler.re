module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;

  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectPrimitiveType.gameObject;
  type return = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), wdbGameObjectUid) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    DragWDBEventHandlerUtils.handleSelfLogic(
      (store, dispatchFunc),
      (),
      (
        switch (editorState |> SceneTreeEditorService.getCurrentSceneTreeNode) {
        | None => SceneEngineService.getSceneGameObject(engineState)
        | Some(gameObject) => gameObject
        },
        wdbGameObjectUid,
        SceneTreeNodeType.DragIntoTarget,
      ),
    );
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);