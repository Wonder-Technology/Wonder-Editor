open SceneGraphType;

let disposeCurrentSceneTreeNode = currentGameObject => {
  let rec _iterateSceneGraphRemove = removedGameObjectArr =>
    removedGameObjectArr
    |> Js.Array.forEach(removedGameObject => {
         let editorState = StateEditorService.getState();
         let engineState = StateEngineService.unsafeGetState();

         let (editorState, engineState) =
           engineState
           |> CameraEngineService.hasCameraGroup(removedGameObject) ?
             engineState
             |> CameraLogicService.unbindArcballCameraControllerEventIfHasComponentForGameView(
                  removedGameObject,
                  editorState,
                ) :
             (editorState, engineState);

         let engineState =
           engineState
           |> GameObjectEngineService.disposeGameObjectKeepOrderRemoveGeometry(
                removedGameObject,
              );

         editorState |> StateEditorService.setState |> ignore;
         engineState |> StateEngineService.setState |> ignore;

         _iterateSceneGraphRemove(
           GameObjectUtils.getChildren(removedGameObject, engineState),
         );
       });

  _iterateSceneGraphRemove([|currentGameObject|]);

  StateLogicService.getAndRefreshEngineState();

  SceneEditorService.clearCurrentSceneTreeNode
  |> StateLogicService.getAndSetEditorState;
};