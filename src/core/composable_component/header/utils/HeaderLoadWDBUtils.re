open Js.Promise;

open AssetNodeType;

open FileType;

let handleSceneWDB = wdbArrayBuffer =>
  SceneWDBUtils.importSceneWDB(wdbArrayBuffer)
  |> WonderBsMost.Most.tap(((gameObject, _)) =>
       GameObjectEngineService.initAllGameObjects(gameObject)
       |> StateLogicService.getAndRefreshEngineStateWithFunc
     );

let loadSceneWDB = (dispatchFunc, event) => {
  let e = ReactEventType.convertReactFormEventToJsEvent(event);
  DomHelper.preventDefault(e);

  switch (
    e##target##files
    |> Js.Dict.values
    |> Js.Array.map(AssetTreeNodeUtils.convertFileJsObjectToFileInfoRecord)
    |> ArrayService.getFirst
  ) {
  | None =>
    Js.Promise.make((~resolve, ~reject) =>
      resolve(.
        dispatchFunc(
          AppStore.UpdateAction(Update([|UpdateStore.NoUpdate|])),
        ),
      )
    )
  | Some(wdbInfo) =>
    WonderBsMost.Most.just(wdbInfo)
    |> WonderBsMost.Most.flatMap(wdbInfo =>
         WonderBsMost.Most.fromPromise(
           Js.Promise.make((~resolve, ~reject) => {
             let reader = FileReader.createFileReader();

             FileReader.onload(reader, result =>
               resolve(. {
                 name: wdbInfo.name,
                 type_: AssetTreeNodeUtils.getUploadFileType(wdbInfo.name),
                 result,
               })
             );

             AssetTreeNodeUtils.readFileByTypeSync(reader, wdbInfo);
           }),
         )
       )
    |> WonderBsMost.Most.flatMap((wdbResult: nodeResultType) =>
         wdbResult.result
         |> FileReader.convertResultToArrayBuffer
         |> handleSceneWDB
       )
    |> WonderBsMost.Most.drain
    |> then_(_ => {
         dispatchFunc(
           AppStore.SceneTreeAction(
             SetSceneGraph(
               Some(
                 SceneTreeUtils.getSceneGraphDataFromEngine
                 |> StateLogicService.getStateToGetData,
               ),
             ),
           ),
         );

         dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.All|])))
         |> resolve;
       })
  };
};