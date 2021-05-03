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
  };

let handleFileByTypeAsync =
    (fileResult: uploadAssetFileResultType, createJsZipFunc) => {
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

let fileLoad = (uiState, createJsZipFunc, event) => {
  let e = ReactEventType.convertReactFormEventToJsEvent(event);
  EventHelper.preventDefault(e);

  let target = e##target;

  switch (target##files |> Js.Dict.values |> ArrayService.getFirst) {
  | None => WonderBsMost.Most.empty()
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

        switch (LoadAssetUtils.getUploadAssetType(fileInfo.name)) {
        | LoadError(msg) => reject(. LoadAssetException(msg))
        | type_ => LoadAssetUtils.readAssetByTypeSync(reader, fileInfo, type_)
        };
      }),
    )
    |> WonderBsMost.Most.flatMap((fileResult: uploadAssetFileResultType) =>
         WonderBsMost.Most.fromPromise(
           handleFileByTypeAsync(fileResult, createJsZipFunc),
         )
       )
    |> WonderBsMost.Most.tap(_ =>
         FileReader.makeSureCanLoadSameNameFileAgain(target)
       );
  };
};