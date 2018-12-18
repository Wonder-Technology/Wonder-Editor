let handleSelfLogic =
    ((store, dispatchFunc), (), (targetGameObjectUid, wdbGameObjectUid)) => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let isShowChildrenMap =
    SceneGraphUtils.buildIsShowChildrenMapFromStore(store)
    |> WonderCommonlib.SparseMapService.set(targetGameObjectUid, true);

  let (isSuccess, (editorState, engineState)) =
    DragWDBUtils.dragWDB(
      wdbGameObjectUid,
      targetGameObjectUid,
      (editorState, engineState),
    );

  isSuccess ?
    {
      dispatchFunc(
        AppStore.SceneTreeAction(
          SetSceneGraph(
            Some(
              SceneGraphUtils.getSceneGraphDataFromEngine((
                editorState,
                engineState,
              ))
              |> SceneGraphUtils.setIsShowChildrenByMap(isShowChildrenMap),
            ),
          ),
        ),
      )
      |> ignore;

      dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])))
      |> ignore;

      ();
    } :
    ();

  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateEngineService.setState |> ignore;

  ();
};