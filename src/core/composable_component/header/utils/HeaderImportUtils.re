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

               (nodeId |. Some, editorState);
             } :
             {
               let (nodeId, editorState) =
                 AssetTreeUtils.rebuildFolder(
                   parentId,
                   pathName,
                   editorState,
                 );

               (nodeId |. Some, editorState);
             },
         (None, StateEditorService.getState()),
       );

  editorState |> StateEditorService.setState |> ignore;

  nodeId;
};

let _handleImportJson = (path, jsonResult) => {
  let (folderPath, jsonName) =
    FileNameService.getFolderPathAndFileName(path);
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
    |> then_(zip => {
         zip
         |. Zip.forEach((relativePath, zipEntry) =>
              switch (FileNameService.getFileExtName(relativePath)) {
              | None =>
                Js.Promise.make((~resolve, ~reject) => {
                  _handleImportFolder(relativePath) |> ignore;

                  resolve(. Obj.magic(-1));
                })
                |> ignore
              | Some(extName) =>
                switch (extName) {
                | ".json"
                | ".tex" =>
                  zipEntry
                  |. ZipObject.asyncString()
                  |> then_(content => {
                       Js.log(content);
                       _handleImportJson(relativePath, content);
                       resolve(content);
                     })
                  |> ignore
                | ".wdb" =>
                  zipEntry
                  |. ZipObject.asyncUint8()
                  |> then_(content => {
                       Js.log(content);
                       resolve(content);
                     })
                  |> ignore
                }
              }
            );

         WonderLog.Log.print("foreach over") |> ignore;

         resolve(zip);
       })
    |> WonderBsMost.Most.fromPromise
    |> WonderBsMost.Most.drain
    |> then_(_ => {
         WonderLog.Log.print("over all import") |> ignore;
         dispatchFunc(
           AppStore.UpdateAction(Update([|UpdateStore.BottomComponent|])),
         )
         |> resolve;
       })
    |> ignore;
  };
};