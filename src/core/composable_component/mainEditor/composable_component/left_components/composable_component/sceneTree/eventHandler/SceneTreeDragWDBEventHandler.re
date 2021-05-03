module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;

  type prepareTuple = unit;
  type dataTuple = (
    Wonderjs.GameObjectPrimitiveType.gameObject,
    Wonderjs.GameObjectPrimitiveType.gameObject,
    SceneTreeNodeType.sceneTreeDragType,
  );
  type return = unit;

  let handleSelfLogic =
      (
        (uiState, dispatchFunc),
        (),
        (targetGameObject, wdbGameObject, dragPosition),
      ) =>
    DragWDBEventHandlerUtils.handleSelfLogic(
      (uiState, dispatchFunc),
      (),
      (targetGameObject, wdbGameObject, dragPosition),
    );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);