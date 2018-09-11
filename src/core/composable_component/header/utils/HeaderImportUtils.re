open AssetNodeType;

open AssetTreeNodeType;

open WonderBsJszip;

let _handleImportFolder = path => WonderLog.Log.print(path) |> ignore;

let _handleImportJson = path => WonderLog.Log.print(path) |> ignore;

let importPackage = (createJsZipFunc, event) => {
  let e = ReactEventType.convertReactFormEventToJsEvent(event);
  DomHelper.preventDefault(e);

  switch (e##target##files |> Js.Dict.values |> ArrayService.getFirst) {
  | None =>
    /* Js.Promise.make((~resolve, ~reject) => resolve(. Obj.magic(-1))) */
    ()
  | Some(packageFile) =>
    StateEditorService.getState()
    |> AssetTreeEditorService.deepDisposeAssetTreeRoot
    |> StateEditorService.setState;

    createJsZipFunc()
    |. Zip.loadAsync(`blob(packageFile))
    |> Js.Promise.then_(zip => {
         zip
         |. Zip.forEach((relativePath, zipEntry) =>
              switch (FileNameService.getFileExtName(relativePath)) {
              | None => _handleImportFolder(relativePath)
              | Some(extName) =>
                switch (extName) {
                | ".json"
                | ".tex" =>
                  zipEntry
                  |. ZipObject.asyncString()
                  |> Js.Promise.then_(content => {
                       Js.log(content);
                       Js.Promise.resolve(content);
                     })
                  |> ignore
                | ".wdb" =>
                  zipEntry
                  |. ZipObject.asyncUint8()
                  |> Js.Promise.then_(content => {
                       Js.log(content);
                       Js.Promise.resolve(content);
                     })
                  |> ignore
                }
              }
            );

         Js.Promise.resolve(zip);
       })
    |> ignore;
  };
};