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

  let _handleDragToBeSceneGameObjectHierarchy =
      (dragPosition, sceneGameObject, draggedGameObject, engineState) =>
    switch (dragPosition) {
    | DragIntoTarget =>
      _handleDragIntoTarget(
        sceneGameObject,
        draggedGameObject,
        engineState,
      )

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
           WonderEditor.TransformType.Before,
         );
    };

  let _handleDragToBeTargetGameObjectHierarchy =
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
           WonderEditor.TransformType.Before,
         )

    | DragIntoTarget =>
      _handleDragIntoTarget(
        targetGameObject,
        draggedGameObject,
        engineState,
      )

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
           WonderEditor.TransformType.After,
         )
    };

  let handleSelfLogic =
      (
        (store, dispatchFunc),
        (),
        (targetGameObject, draggedGameObject, dragPosition),
      ) => {
    let engineState = StateEngineService.unsafeGetState();

    let engineState =
      SceneEngineService.isSceneGameObject(targetGameObject)
      |> StateLogicService.getEngineStateToGetData ?
        _handleDragToBeSceneGameObjectHierarchy(
          dragPosition,
          targetGameObject,
          draggedGameObject,
          engineState,
        ) :
        _handleDragToBeTargetGameObjectHierarchy(
          dragPosition,
          targetGameObject,
          draggedGameObject,
          engineState,
        );

    engineState |> StateEngineService.setState |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);