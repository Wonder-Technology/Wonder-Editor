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

  let _handleDragIntoTarget =
      (targetGameObject, draggedGameObject, engineState) => {
    SceneTreeEditorService.setIsShowChildren(targetGameObject, true)
    |> StateLogicService.getAndSetEditorState;

    engineState
    |> HierarchyGameObjectEngineService.setParentKeepOrder(
         targetGameObject,
         draggedGameObject,
       );
  };

  let _handleDragToBeSceneGameObjectChild =
      (dragPosition, sceneGameObject, draggedGameObject, engineState) =>
    switch (dragPosition) {
    | DragIntoTarget =>
      _handleDragIntoTarget(sceneGameObject, draggedGameObject, engineState)

    | DragBeforeTarget
    | DragAfterTarget =>
      let targetGameObject =
        engineState
        |> HierarchyGameObjectEngineService.getChildren(sceneGameObject)
        |> ArrayService.unsafeGetFirst;
      engineState
      |> HierarchyGameObjectEngineService.setParentKeepOrder(
           HierarchyGameObjectEngineService.getParentGameObject(
             targetGameObject,
             engineState,
           )
           |> OptionService.unsafeGet,
           draggedGameObject,
         )
      |> HierarchyGameObjectEngineService.changeGameObjectChildOrder(
           draggedGameObject,
           targetGameObject,
           Wonderjs.TransformType.Before,
         );
    };

  let _handleDragToBeTargetGameObjectSib =
      (dragPosition, targetGameObject, draggedGameObject, engineState) =>
    switch (dragPosition) {
    | DragBeforeTarget =>
      engineState
      |> HierarchyGameObjectEngineService.setParentKeepOrder(
           HierarchyGameObjectEngineService.getParentGameObject(
             targetGameObject,
             engineState,
           )
           |> OptionService.unsafeGet,
           draggedGameObject,
         )
      |> HierarchyGameObjectEngineService.changeGameObjectChildOrder(
           draggedGameObject,
           targetGameObject,
           Wonderjs.TransformType.Before,
         )

    | DragIntoTarget =>
      _handleDragIntoTarget(targetGameObject, draggedGameObject, engineState)

    | DragAfterTarget =>
      engineState
      |> HierarchyGameObjectEngineService.setParentKeepOrder(
           HierarchyGameObjectEngineService.getParentGameObject(
             targetGameObject,
             engineState,
           )
           |> OptionService.unsafeGet,
           draggedGameObject,
         )
      |> HierarchyGameObjectEngineService.changeGameObjectChildOrder(
           draggedGameObject,
           targetGameObject,
           Wonderjs.TransformType.After,
         )
    };

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
        _handleDragToBeSceneGameObjectChild(
          dragPosition,
          targetGameObject,
          draggedGameObject,
          engineState,
        ) :
        _handleDragToBeTargetGameObjectSib(
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