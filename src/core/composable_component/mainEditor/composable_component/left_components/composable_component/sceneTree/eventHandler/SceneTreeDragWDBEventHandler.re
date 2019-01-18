module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;

  type prepareTuple = unit;
  type dataTuple = (
    Wonderjs.GameObjectPrimitiveType.gameObject,
    Wonderjs.GameObjectPrimitiveType.gameObject,
  );
  type return = unit;

  let handleSelfLogic =
      ((store, dispatchFunc), (), (targetGameObjectUid, wdbGameObjectUid)) =>
    DragWDBEventHandlerUtils.handleSelfLogic(
      (store, dispatchFunc),
      (),
      (targetGameObjectUid, wdbGameObjectUid),
    );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);