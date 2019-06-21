open SceneGraphType;

let disposeCurrentSceneTreeNode =
    (currentGameObject, (editorState, engineState)) => {
  let rec _iterateSceneGraphRemove =
          (removedGameObjectArr, (editorState, engineState)) =>
    removedGameObjectArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (editorState, engineState), removedGameObject) => {
           let (editorState, engineState) =
             engineState
             |> CameraEngineService.hasCameraGroup(removedGameObject) ?
               (editorState, engineState)
               |> CameraLogicService.unbindCameraControllerEventIfHasComponentGameView(
                    removedGameObject,
                  ) :
               (editorState, engineState);

           let engineState =
             engineState
             |> GameObjectEngineService.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial(
                  removedGameObject,
                );

           _iterateSceneGraphRemove(
             HierarchyGameObjectEngineService.getChildren(
               removedGameObject,
               engineState,
             ),
             (editorState, engineState),
           );
         },
         (editorState, engineState),
       );

  let (editorState, engineState) =
    _iterateSceneGraphRemove(
      [|currentGameObject|],
      (editorState, engineState),
    );

  let editorState =
    SceneTreeEditorService.clearCurrentSceneTreeNode(editorState);

  (editorState, engineState);
};