open AssetNodeType;

open AssetTreeNodeType;

open WonderBsJszip;

open Js.Promise;

let _handleImportFolder = path => {
  let (nodeId, editorState) =
    path
    |> FileNameService.removePathPostfix
    |> Js.String.split("/")
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (parentId, editorState), pathName) =>
           pathName === AssetTreeNodeUtils.getAssetTreeRootName() ?
             {
               let (nodeId, editorState) =
                 AssetTreeUtils.rebuildRootAssetTree(
                   parentId,
                   pathName,
                   editorState,
                 );

               (Some(nodeId), editorState);
             } :
             {
               let (nodeId, editorState) =
                 AssetTreeUtils.rebuildFolder(
                   parentId,
                   pathName,
                   editorState,
                 );

               (Some(nodeId), editorState);
             },
         (None, StateEditorService.getState()),
       );

  editorState |> StateEditorService.setState |> ignore;

  nodeId;
};

let _handleImportJson = (path, jsonResult) => {
  let (folderPath, jsonName) =
    FileNameService.getFolderPathAndFileName(path);

  switch (folderPath |> Js.Undefined.toOption) {
  | Some(folderPath) =>
    let jsonFileParentId =
      _handleImportFolder(folderPath) |> OptionService.unsafeGet;
    let (editorState, newIndex) =
      AssetIdUtils.getAssetId |> StateLogicService.getEditorState;

    AssetTreeNodeUtils.handleJsonType(
      (jsonName, jsonResult),
      (newIndex, jsonFileParentId),
      editorState,
      (),
    )
    |> then_(editorState => editorState |> resolve);
  | None =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildErrorMessage(
        ~title="_handleImport",
        ~description={j||j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };
};

let _handleImportWDB =
    (dispatchFunc, path, wdbArrayBuffer: Js.Typed_array.array_buffer) => {
  WonderLog.Log.print(path) |> ignore;
  let (folderPath, wdbName) = FileNameService.getFolderPathAndFileName(path);
  WonderLog.Log.print((folderPath, wdbName)) |> ignore;

  switch (folderPath |> Js.Undefined.toOption) {
  | None =>
    HeaderLoadWDBUtils.handleSceneWDB(wdbArrayBuffer)
    |> WonderBsMost.Most.drain
    |> then_(_ => {
         WonderLog.Log.print(" over scene wdb") |> ignore;
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
         dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.All|])));

         StateEditorService.getState() |> resolve;
       })

  | Some(folderPath) =>
    let wdbFileParentId =
      _handleImportFolder(folderPath) |> OptionService.unsafeGet;
    let (editorState, newIndex) =
      AssetIdUtils.getAssetId |> StateLogicService.getEditorState;

    AssetTreeNodeUtils.handleAssetWDBType(
      (wdbName, wdbArrayBuffer),
      (newIndex, wdbFileParentId),
      editorState,
      (),
    )
    |> then_(editorState => editorState |> resolve);
  };
};

let importPackage = (createJsZipFunc, dispatchFunc, event) => {
  let e = ReactEventType.convertReactFormEventToJsEvent(event);
  DomHelper.preventDefault(e);

  switch (e##target##files |> Js.Dict.values |> ArrayService.getFirst) {
  | None => ()
  | Some(packageFile) =>
    StateEditorService.getState()
    |> AssetTreeEditorService.deepDisposeAssetTreeRoot
    |> StateEditorService.setState;

    createJsZipFunc()
    |. Zip.loadAsync(`blob(packageFile))
    |> WonderBsMost.Most.fromPromise
    |> WonderBsMost.Most.flatMap(zip =>
         {
           zip
           |. Zip.forEach((relativePath, zipEntry) =>
                switch (FileNameService.getFileExtName(relativePath)) {
                | None =>
                  WonderLog.Log.print("load folder") |> ignore;
                  Js.Promise.make((~resolve, ~reject) => {
                    _handleImportFolder(relativePath) |> ignore;

                    resolve(. Obj.magic(-1));
                  })
                  |> WonderBsMost.Most.fromPromise
                  |> Obj.magic;
                | Some(extName) =>
                  switch (extName) {
                  | ".json"
                  | ".tex" =>
                    WonderLog.Log.print("load json") |> ignore;
                    zipEntry
                    |. ZipObject.asyncString()
                    |> Obj.magic
                    |> then_(content => {
                         _handleImportJson(relativePath, content);
                         resolve(content);
                       })
                    |> WonderBsMost.Most.fromPromise
                    |> Obj.magic;
                  | ".wdb" =>
                    WonderLog.Log.print("load wdb") |> ignore;
                    zipEntry
                    |. ZipObject.asyncUint8()
                    |> Obj.magic
                    |> then_(content => {
                         _handleImportWDB(
                           dispatchFunc,
                           relativePath,
                           content |> Js.Typed_array.Uint8Array.buffer,
                         )
                         |> ignore;

                         resolve(content);
                       })
                    |> WonderBsMost.Most.fromPromise
                    |> Obj.magic;
                  }
                }
              );
           WonderLog.Log.print("for eacth") |> ignore;
         }
         |> Obj.magic
       )
    |> WonderBsMost.Most.drain
    |> then_(_ => {
         WonderLog.Log.print("over all import") |> ignore;
         dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.All|])))
         |> resolve;
       })
    |> ignore;
  };
};