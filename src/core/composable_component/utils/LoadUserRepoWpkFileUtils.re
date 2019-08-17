open WonderBsMost;

open UserDataType;

let loadUserRepoWpkFile = (dispatchFunc, fetchFunc, editorState) => {
  StateEditorService.getEventEngineState()
  |> ProgressUtils.show
  |> ProgressUtils.changePercent(99)
  |> StateEditorService.setEventEngineState
  |> ignore;

  let {id, name, description, filePath} =
    UserDataEditorService.getCurrentRepo(editorState);

  fetchFunc(ClientConfig.getServerPath() ++ filePath)
  |> Most.fromPromise
  |> Most.flatMap(response =>
       response |> Fetch.Response.arrayBuffer |> Most.fromPromise
     )
  |> Most.flatMap(fileArrayBuffer => {
       let wpk = fileArrayBuffer |> FetchService.convertResponseToArrayBuffer;

       HeaderImportPackageUtils.loadSceneWithWpkFile(wpk);
     })
  |> Most.concat(
       MostUtils.callFunc(() =>
         StateEditorService.getEventEngineState()
         |> ProgressUtils.finish
         |> StateEditorService.setEventEngineState
         |> ignore
       ),
     );
};