open SceneTreeNodeType;

open Wonderjs;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;

  type prepareTuple = unit;
  type dataTuple = (
    GameObjectType.gameObject,
    GameObjectType.gameObject,
    sceneTreeDragMoveType,
  );
  type return = unit;

  let handleSelfLogic =
      ((store, dispatchFunc), (), (targetUid, draggedUid, dragPosition)) => {
    let engineState = StateEngineService.unsafeGetState();

    let engineState =
      switch (dragPosition) {
      | DragBeforeTarget =>
        GameObjectEngineService.changeGameObjectChildOrder(
          draggedUid,
          targetUid,
          WonderEditor.TransformType.Before,
          engineState,
        )

      | DragIntoTarget =>
        SceneTreeEditorService.setIsShowChildren(targetUid, true)
        |> StateLogicService.getAndSetEditorState;

        engineState
        |> GameObjectUtils.setParentKeepOrder(targetUid, draggedUid);

      | DragAfterTarget =>
        GameObjectEngineService.changeGameObjectChildOrder(
          draggedUid,
          targetUid,
          WonderEditor.TransformType.After,
          engineState,
        )
      };

    engineState |> StateEngineService.setState |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);