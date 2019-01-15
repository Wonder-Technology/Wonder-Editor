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
        engineState
        |> GameObjectUtils.setParentKeepOrder(
             GameObjectUtils.getParentGameObject(targetUid, engineState)
             |> OptionService.unsafeGet,
             draggedUid,
           )
        |> GameObjectEngineService.changeGameObjectChildOrder(
             draggedUid,
             targetUid,
             WonderEditor.TransformType.Before,
           )

      | DragIntoTarget =>
        SceneTreeEditorService.setIsShowChildren(targetUid, true)
        |> StateLogicService.getAndSetEditorState;

        engineState
        |> GameObjectUtils.setParentKeepOrder(targetUid, draggedUid);

      | DragAfterTarget =>
        engineState
        |> GameObjectUtils.setParentKeepOrder(
             GameObjectUtils.getParentGameObject(targetUid, engineState)
             |> OptionService.unsafeGet,
             draggedUid,
           )
        |> GameObjectEngineService.changeGameObjectChildOrder(
             draggedUid,
             targetUid,
             WonderEditor.TransformType.After,
           )
      };

    engineState |> StateEngineService.setState |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);