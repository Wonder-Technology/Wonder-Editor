module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;

  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectPrimitiveType.gameObject;
  type return = unit;

  let handleSelfLogic = ((uiState, dispatchFunc), (), wdbGameObject) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    DragWDBEventHandlerUtils.handleSelfLogic(
      (uiState, dispatchFunc),
      (),
      (
        switch (editorState |> SceneTreeEditorService.getCurrentSceneTreeNode) {
        | None => SceneEngineService.getSceneGameObject(engineState)
        | Some(gameObject) => gameObject
        },
        wdbGameObject,
        SceneTreeNodeType.DragIntoTarget,
      ),
    );
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);