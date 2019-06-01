open NodeAssetType;

open Js.Promise;

let _handleSpecificFuncByTypeAsync =
    (
      type_,
      (
        handleTextureFunc,
        handleWDBFunc,
        handleAssetBundleFunc,
        handleGLBFunc,
        handleZipFunc,
      ),
    ) =>
  switch (type_) {
  | LoadTexture => handleTextureFunc()
  | LoadWDB => handleWDBFunc()
  | LoadAssetBundle => handleAssetBundleFunc()
  | LoadGLB => handleGLBFunc()
  | LoadZip => handleZipFunc()
  | LoadError =>
    make((~resolve, ~reject) => reject(. LoadException("load asset error")))
  };

let handleFileByTypeAsync = (fileResult: nodeResultType, createJsZipFunc) => {
  let (editorState, assetNodeId) =
    IdAssetEditorService.generateNodeId |> StateLogicService.getEditorState;
  let engineState = StateEngineService.unsafeGetState();

  let selectedFolderNodeInAssetTree =
    editorState
    |> OperateTreeAssetEditorService.unsafeGetSelectedFolderNodeInAssetTree;

  _handleSpecificFuncByTypeAsync(
    fileResult.type_,
    (
      () =>
        AssetHeaderHandleTextureUtils.handleTextureType(
          fileResult,
          (selectedFolderNodeInAssetTree, assetNodeId),
          (editorState, engineState),
        ),
      () =>
        AssetHeaderHandleWDBUtils.handleAssetWDBType(
          (
            fileResult.name,
            fileResult.result |> FileReader.convertResultToArrayBuffer,
          ),
          (assetNodeId, selectedFolderNodeInAssetTree),
          (editorState, engineState),
        ),
      () =>
        AssetHeaderHandleAssetBundleUtils.handleAssetBundleType(
          (
            fileResult.name,
            fileResult.result |> FileReader.convertResultToArrayBuffer,
          ),
          (assetNodeId, selectedFolderNodeInAssetTree),
          (editorState, engineState),
        ),
      () =>
        AssetHeaderHandleGLBUtils.handleGLBType(
          (
            fileResult.name,
            fileResult.result |> FileReader.convertResultToArrayBuffer,
          ),
          (assetNodeId, selectedFolderNodeInAssetTree),
          (editorState, engineState),
        ),
      () =>
        AssetHeaderHandleZipUtils.handleZipType(
          (
            fileResult.name,
            fileResult.result |> FileReader.convertResultToJsZipBlob,
          ),
          (assetNodeId, selectedFolderNodeInAssetTree),
          createJsZipFunc,
          (editorState, engineState),
        ),
    ),
  )
  |> then_(((editorState, engineState)) => {
       editorState |> StateEditorService.setState |> ignore;
       engineState |> StateEngineService.setState |> ignore;

       () |> resolve;
     });
};

let fileLoad = ((uiState, dispatchFunc), createJsZipFunc, event) => {
  let e = ReactEventType.convertReactFormEventToJsEvent(event);
  EventHelper.preventDefault(e);

  let target = e##target;

  switch (target##files |> Js.Dict.values |> ArrayService.getFirst) {
  | None => resolve()
  | Some(file) =>
    let fileInfo = FileReader.convertFileJsObjectToFileInfoRecord(file);

    WonderBsMost.Most.fromPromise(
      Js.Promise.make((~resolve, ~reject) => {
        let reader = FileReader.createFileReader();

        FileReader.onload(reader, result =>
          resolve(. {
            name: fileInfo.name,
            type_: LoadAssetUtils.getUploadAssetType(fileInfo.name),
            result,
          })
        );

        LoadAssetUtils.readAssetByTypeSync(reader, fileInfo);
      }),
    )
    |> WonderBsMost.Most.flatMap((fileResult: nodeResultType) =>
         WonderBsMost.Most.fromPromise(
           handleFileByTypeAsync(fileResult, createJsZipFunc),
         )
       )
    |> WonderBsMost.Most.drain
    |> then_(() => {
         FileReader.makeSureCanLoadSameNameFileAgain(target);

         dispatchFunc(
           AppStore.UpdateAction(
             Update([|UpdateStore.Inspector, UpdateStore.Project|]),
           ),
         );

         resolve();
       });
  };
};