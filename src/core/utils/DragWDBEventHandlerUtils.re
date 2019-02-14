let handleSelfLogic =
    (
      (uiState, dispatchFunc),
      (),
      (targetGameObject, wdbGameObject, dragPosition),
    ) => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let editorState =
    editorState
    |> SceneTreeEditorService.setIsShowChildren(targetGameObject, true);

  let (isSuccess, (editorState, engineState)) =
    DragWDBUtils.dragWDB(
      wdbGameObject,
      targetGameObject,
      dragPosition,
      (editorState, engineState),
    );

  isSuccess ?
    {
      dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])))
      |> ignore;

      ();
    } :
    ();

  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateEngineService.setState |> ignore;

  ();
};