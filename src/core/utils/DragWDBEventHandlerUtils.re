let handleSelfLogic =
    ((store, dispatchFunc), (), (targetGameObjectUid, wdbGameObjectUid)) => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let isShowChildrenMap =
    (
      switch (store |> StoreUtils.getSceneGraphDataFromStore) {
      | None => [||]
      | Some(sceneGraphArray) => sceneGraphArray
      }
    )
    |> SceneTreeUtils.buildIsShowChildrenMap;

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
              SceneTreeUtils.getSceneGraphDataFromEngine((
                editorState,
                engineState,
              ))
              |> SceneTreeUtils.setIsShowChildrenByMap(isShowChildrenMap),
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