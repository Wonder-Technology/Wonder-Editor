open WonderBsMost;

open UserDataType;

let loadUserRepoWpkFile = (dispatchFunc, fetchFunc, editorState) => {
  StateEngineService.unsafeGetState()
  |> ProgressUtils.show
  |> ProgressUtils.changePercent(99)
  |> StateEngineService.setState
  |> ignore;

  let {id, name, description, filePath} =
    UserDataEditorService.unsafeGetCurrentRepo(editorState);

  fetchFunc(ClientConfig.getServerPath() ++ filePath)
  |> Most.fromPromise
  |> Most.flatMap(response =>
       response |> Fetch.Response.arrayBuffer |> Most.fromPromise
     )
  |> Most.flatMap(fileArrayBuffer => {
       let wpk = fileArrayBuffer |> FetchService.convertResponseToArrayBuffer;

       HeaderImportPackageUtils.loadSceneWithWpkFile(wpk);
     })
  |> WonderBsMost.Most.concat(
       MostUtils.callFunc(() => {
         ProgressUtils.finish |> StateLogicService.getAndSetEngineState;

         dispatchFunc(
           AppStore.UpdateAction(
             Update([|UpdateStore.Project, UpdateStore.SceneTree|]),
           ),
         );
       }),
     );
};