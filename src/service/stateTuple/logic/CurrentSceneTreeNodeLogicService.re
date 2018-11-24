open SceneGraphType;

let disposeCurrentSceneTreeNode = currentTreeNode => {
  let rec _iterateSceneGraphRemove = removedTreeNodeArr =>
    removedTreeNodeArr
    |> Js.Array.forEach(({uid, children}) => {
         let editorState = StateEditorService.getState();
         let engineState = StateEngineService.unsafeGetState();

         let (editorState, engineState) =
           engineState |> CameraEngineService.hasCameraGroup(uid) ?
             engineState
             |> CameraLogicService.unbindArcballCameraControllerEventIfHasComponentForGameView(
                  uid,
                  editorState,
                ) :
             (editorState, engineState);

         let engineState =
           engineState
           |> GameObjectEngineService.disposeGameObjectKeepOrderRemoveGeometry(
                uid,
              );

         editorState |> StateEditorService.setState |> ignore;
         engineState |> StateEngineService.setState |> ignore;

         _iterateSceneGraphRemove(children);
       });

  _iterateSceneGraphRemove([|currentTreeNode|]);

  StateLogicService.getAndRefreshEngineState();

  SceneEditorService.clearCurrentSceneTreeNode
  |> StateLogicService.getAndSetEditorState;
};