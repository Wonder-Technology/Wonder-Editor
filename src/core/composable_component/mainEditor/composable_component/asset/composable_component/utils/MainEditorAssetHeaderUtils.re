open FileType;

open AssetNodeType;

open Js.Promise;

let fileLoad = (dispatchFunc, event) => {
  let e = ReactEventType.convertReactFormEventToJsEvent(event);
  DomHelper.preventDefault(e);

  let fileInfoArr =
    e##target##files
    |> Js.Dict.values
    |> Js.Array.map(AssetTreeNodeUtils.convertFileJsObjectToFileInfoRecord);

  WonderBsMost.Most.from(fileInfoArr)
  |> WonderBsMost.Most.flatMap((fileInfo: fileInfoType) =>
       WonderBsMost.Most.fromPromise(
         Js.Promise.make((~resolve, ~reject) => {
           let reader = FileReader.createFileReader();
           FileReader.onload(reader, result =>
             resolve(. {
               name: fileInfo.name,
               type_: AssetTreeNodeUtils.getUploadFileType(fileInfo.type_),
               result,
             })
           );
           AssetTreeNodeUtils.readFileByType(reader, fileInfo);
         }),
       )
     )
  |> WonderBsMost.Most.flatMap((fileResult: nodeResultType) =>
       WonderBsMost.Most.fromPromise(
         fileResult |> AssetTreeNodeUtils.handleFileByType,
       )
     )
  |> WonderBsMost.Most.drain
  |> then_(_ =>
       dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Asset|])))
       |> resolve
     );
};