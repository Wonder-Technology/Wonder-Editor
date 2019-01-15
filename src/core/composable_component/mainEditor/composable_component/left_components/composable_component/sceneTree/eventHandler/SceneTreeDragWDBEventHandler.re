module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;

  type prepareTuple = unit;
  type dataTuple = (
    Wonderjs.GameObjectType.gameObject,
    Wonderjs.GameObjectType.gameObject,
    SceneTreeNodeType.sceneTreeDragMoveType,
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