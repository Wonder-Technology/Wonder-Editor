let handleSelfLogic =
    ((store, dispatchFunc), (), (targetGameObjectUid, wdbGameObjectUid)) => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let editorState =
    editorState
    |> SceneTreeEditorService.setIsShowChildren(targetGameObjectUid, true);

  let (isSuccess, (editorState, engineState)) =
    DragWDBUtils.dragWDB(
      wdbGameObjectUid,
      targetGameObjectUid,
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