open SceneTreeNodeType;

open Wonderjs;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;

  type prepareTuple = unit;
  type dataTuple = (
    GameObjectPrimitiveType.gameObject,
    GameObjectPrimitiveType.gameObject,
    sceneTreeDragType,
  );
  type return = unit;

  let handleSelfLogic =
      (
        (uiState, dispatchFunc),
        (),
        (targetGameObject, draggedGameObject, dragPosition),
      ) => {
    let engineState = StateEngineService.unsafeGetState();

    let engineState =
      SceneEngineService.isSceneGameObject(targetGameObject)
      |> StateLogicService.getEngineStateToGetData ?
        DragGameObjectUtils.handleDragToBeSceneGameObjectChild(
          dragPosition,
          targetGameObject,
          draggedGameObject,
          engineState,
        ) :
        DragGameObjectUtils.handleDragToBeTargetGameObjectSib(
          dragPosition,
          targetGameObject,
          draggedGameObject,
          engineState,
        );

    StateLogicService.refreshEngineState(engineState);

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);