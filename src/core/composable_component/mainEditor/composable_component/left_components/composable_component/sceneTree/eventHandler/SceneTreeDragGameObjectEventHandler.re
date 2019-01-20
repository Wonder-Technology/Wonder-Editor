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
      (targetGameObjectUid, draggedGameObjectUid, engineState) => {
    SceneTreeEditorService.setIsShowChildren(targetGameObjectUid, true)
    |> StateLogicService.getAndSetEditorState;

    engineState
    |> HierarchyGameObjectEngineService.setParentKeepOrder(
         targetGameObjectUid,
         draggedGameObjectUid,
       );
  };

  let _handleDragToBeSceneGameObjectHierarchy =
      (dragPosition, sceneGameObject, draggedGameObjectUid, engineState) =>
    switch (dragPosition) {
    | DragIntoTarget =>
      _handleDragIntoTarget(
        sceneGameObject,
        draggedGameObjectUid,
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
           draggedGameObjectUid,
         )
      |> HierarchyGameObjectEngineService.changeGameObjectChildOrder(
           draggedGameObjectUid,
           targetGameObject,
           WonderEditor.TransformType.Before,
         );
    };

  let _handleDragToBeTargetGameObjectHierarchy =
      (dragPosition, targetGameObjectUid, draggedGameObjectUid, engineState) =>
    switch (dragPosition) {
    | DragBeforeTarget =>
      engineState
      |> HierarchyGameObjectEngineService.setParentKeepOrder(
           HierarchyGameObjectEngineService.getParentGameObject(
             targetGameObjectUid,
             engineState,
           )
           |> OptionService.unsafeGet,
           draggedGameObjectUid,
         )
      |> HierarchyGameObjectEngineService.changeGameObjectChildOrder(
           draggedGameObjectUid,
           targetGameObjectUid,
           WonderEditor.TransformType.Before,
         )

    | DragIntoTarget =>
      _handleDragIntoTarget(
        targetGameObjectUid,
        draggedGameObjectUid,
        engineState,
      )

    | DragAfterTarget =>
      engineState
      |> HierarchyGameObjectEngineService.setParentKeepOrder(
           HierarchyGameObjectEngineService.getParentGameObject(
             targetGameObjectUid,
             engineState,
           )
           |> OptionService.unsafeGet,
           draggedGameObjectUid,
         )
      |> HierarchyGameObjectEngineService.changeGameObjectChildOrder(
           draggedGameObjectUid,
           targetGameObjectUid,
           WonderEditor.TransformType.After,
         )
    };

  let handleSelfLogic =
      (
        (store, dispatchFunc),
        (),
        (targetGameObjectUid, draggedGameObjectUid, dragPosition),
      ) => {
    let engineState = StateEngineService.unsafeGetState();

    let isSceneGameObject =
      targetGameObjectUid
      === (
            SceneEngineService.getSceneGameObject
            |> StateLogicService.getEngineStateToGetData
          );

    let engineState =
      targetGameObjectUid
      === (
            SceneEngineService.getSceneGameObject
            |> StateLogicService.getEngineStateToGetData
          ) ?
        _handleDragToBeSceneGameObjectHierarchy(
          dragPosition,
          targetGameObjectUid,
          draggedGameObjectUid,
          engineState,
        ) :
        _handleDragToBeTargetGameObjectHierarchy(
          dragPosition,
          targetGameObjectUid,
          draggedGameObjectUid,
          engineState,
        );

    engineState |> StateEngineService.setState |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);