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
        (store, dispatchFunc),
        (),
        (targetGameObjectUid, wdbGameObjectUid, dragPosition),
      ) =>
    DragWDBEventHandlerUtils.handleSelfLogic(
      (store, dispatchFunc),
      (),
      (targetGameObjectUid, wdbGameObjectUid, dragPosition),
    );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);