open AssetNodeType;

open AssetTreeNodeType;

open WonderBsJszip;

open Js.Promise;

let _handleImportJson = (path, jsonResult) => {
  let (folderPath, jsonName) =
    FileNameService.getFolderPathAndFileName(path);

  switch (folderPath |> Js.Undefined.toOption) {
  | Some(folderPath) =>
    let jsonFileParentId =
      HeaderImportFolderUtils.handleImportFolder(folderPath)
      |> OptionService.unsafeGet;
    let (editorState, newIndex) =
      AssetIdUtils.getAssetId |> StateLogicService.getEditorState;

    AssetTreeNodeUtils.handleJsonType(
      (jsonName, jsonResult),
      (newIndex, jsonFileParentId),
      editorState,
      (),
    )
    |> then_(editorState => {
         WonderLog.Log.print("over file json") |> ignore;
         editorState |> resolve;
       });
  | None =>
    HeaderImportAssetJsonUtils.handleImportAssetsJson(jsonResult)
    |> WonderBsMost.Most.drain
    |> then_(_ => {
         WonderLog.Log.print("over all texture") |> ignore;
         resolve(StateEditorService.getState());
       })
  };
};

let _handleImportWDB =
    (dispatchFunc, path, wdbArrayBuffer: Js.Typed_array.array_buffer) => {
  let (folderPath, wdbName) = FileNameService.getFolderPathAndFileName(path);

  switch (folderPath |> Js.Undefined.toOption) {
  | None =>
    HeaderLoadWDBUtils.handleSceneWDB(wdbArrayBuffer)
    |> WonderBsMost.Most.drain
    |> then_(_ => {
         WonderLog.Log.print("over scene wdb") |> ignore;
         StateEditorService.getState() |> resolve;
       })

  | Some(folderPath) =>
    let wdbFileParentId =
      HeaderImportFolderUtils.handleImportFolder(folderPath)
      |> OptionService.unsafeGet;
    let (editorState, newIndex) =
      AssetIdUtils.getAssetId |> StateLogicService.getEditorState;

    AssetTreeNodeUtils.handleAssetWDBType(
      (wdbName, wdbArrayBuffer),
      (newIndex, wdbFileParentId),
      editorState,
      (),
    )
    |> then_(editorState => {
         WonderLog.Log.print("over asset wdb") |> ignore;

         editorState |> resolve;
       });
  };
};

let handleZipPackFile = (createJsZipFunc, dispatchFunc, packageFile) => {
  StateEditorService.getState()
  |> AssetTreeEditorService.deepDisposeAssetTreeRoot
  |> StateEditorService.setState;

  createJsZipFunc()
  |. Zip.loadAsync(`blob(packageFile))
  |> WonderBsMost.Most.fromPromise
  |> WonderBsMost.Most.flatMap(zip => {
       let streamArr = [||];

       zip
       |. Zip.forEach((relativePath, zipEntry) =>
            switch (FileNameService.getFileExtName(relativePath)) {
            | None =>
              streamArr
              |> ArrayService.push(
                   Js.Promise.make((~resolve, ~reject) => {
                     HeaderImportFolderUtils.handleImportFolder(relativePath)
                     |> ignore;

                     resolve(. Obj.magic(-1));
                   })
                   |> WonderBsMost.Most.fromPromise,
                 )
              |> ignore

            | Some(extName) =>
              switch (extName) {
              | ".json" =>
                streamArr
                |> ArrayService.push(
                     zipEntry
                     |. ZipObject.asyncString()
                     |> Obj.magic
                     |> then_(content =>
                          _handleImportJson(relativePath, content)
                        )
                     |> WonderBsMost.Most.fromPromise,
                   )
                |> ignore
              | ".wdb" =>
                streamArr
                |> ArrayService.push(
                     zipEntry
                     |. ZipObject.asyncUint8()
                     |> Obj.magic
                     |> then_(content =>
                          _handleImportWDB(
                            dispatchFunc,
                            relativePath,
                            content |> Js.Typed_array.Uint8Array.buffer,
                          )
                        )
                     |> WonderBsMost.Most.fromPromise,
                   )
                |> ignore
              | _ => ()
              }
            }
          );

       Wonderjs.MostUtils.concatArray(streamArr);
     })
  |> WonderBsMost.Most.drain
  |> then_(_ => {
       WonderLog.Log.print("over all import") |> ignore;

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
     });
};

let _checkFileIsWonderpackage = (file, createJsZipFunc, dispatchFunc) =>
  switch (file##name |> FileNameService.getFileExtName) {
  | None =>
    Antd.Message.message
    |> Antd.Message.convertToJsObj
    |> (
      messageObj =>
        messageObj##error("please select wonderpackage file !", 4)
    )
    |> ignore
  | Some(packageFile) =>
    WonderLog.Log.print(packageFile) |> ignore;
    packageFile === ".zip" ?
      handleZipPackFile(createJsZipFunc, dispatchFunc, file |> Obj.magic)
      |> ignore :
      Antd.Message.message
      |> Antd.Message.convertToJsObj
      |> (
        messageObj =>
          messageObj##error("please select wonderpackage file !", 4)
      )
      |> ignore;
  };

let importPackage = (createJsZipFunc, dispatchFunc, event) => {
  let e = ReactEventType.convertReactFormEventToJsEvent(event);
  DomHelper.preventDefault(e);

  switch (e##target##files |> Js.Dict.values |> ArrayService.getFirst) {
  | None => ()
  | Some(packageFile) =>
    WonderLog.Log.print(packageFile##name) |> ignore;
    _checkFileIsWonderpackage(packageFile, createJsZipFunc, dispatchFunc);
  };
};