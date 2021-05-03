module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = (float, float, float);
  type return = unit;

  let setUndoValueToCopiedEngineState =
      ((uiState, dispatchFunc), transformComponent, (x, y, z)) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();
    let editorState =
      TransformEditorService.removeLocalEulerAngleData(
        GameObjectComponentEngineService.unsafeGetTransformComponent(
          SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
          engineState,
        ),
        editorState,
      );
    editorState |> StateEditorService.setState |> ignore;

    engineState
    |> StateEngineService.deepCopyForRestore
    |> TransformEngineService.setLocalEulerAngles(
         (x, y, z),
         transformComponent,
       );
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);