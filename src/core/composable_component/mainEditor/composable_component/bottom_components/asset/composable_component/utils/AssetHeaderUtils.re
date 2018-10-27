open FileType;

open AssetNodeType;

open Js.Promise;

let _getImageNodeIdIfImageNodeMapHasIt = (imgBase64, editorState) =>
  switch (
    editorState
    |> AssetImageNodeMapEditorService.getImageNodeMap
    |> SparseMapService.getValidDataArr
    |> SparseMapService.find(((imageNodeId, {base64})) =>
         Base64Service.isBase64Equal(Some(imgBase64), base64)
       )
  ) {
  | None => None
  | Some((imageNodeId, _)) => Some(imageNodeId)
  };

let _handleImageType =
    (
      (mimeType, fileName, imgBase64),
      (textureNodeId, parentFolderNodeId, textureComponent),
      (editorState, engineState),
    ) =>
  make((~resolve, ~reject) =>
    Image.onload(
      imgBase64,
      loadedImg => {
        ImageUtils.setImageName(loadedImg, fileName);

        let engineState =
          engineState
          |> BasicSourceTextureEngineService.setSource(
               loadedImg |> ImageType.convertDomToImageElement,
               textureComponent,
             );

        let (imageNodeId, editorState) =
          switch (_getImageNodeIdIfImageNodeMapHasIt(imgBase64, editorState)) {
          | None =>
            let (editorState, imageNodeId) =
              AssetIdUtils.generateAssetId(editorState);

            (
              imageNodeId,
              editorState
              |> AssetImageNodeMapEditorService.setResult(
                   imageNodeId,
                   AssetImageNodeMapEditorService.buildImageNodeResult(
                     Some(imgBase64),
                     None,
                     fileName,
                     mimeType,
                   ),
                 ),
            );
          | Some(imageNodeId) => (imageNodeId, editorState)
          };

        let editorState =
          editorState
          |> AssetTextureNodeMapEditorService.setResult(
               textureNodeId,
               AssetTextureNodeMapEditorService.buildTextureNodeResult(
                 textureComponent,
                 parentFolderNodeId |. Some,
                 imageNodeId,
               ),
             )
          |> AssetTreeNodeUtils.createNodeAndAddToTargetNodeChildren(
               parentFolderNodeId,
               textureNodeId,
               Texture,
             );

        resolve(. (editorState, engineState));
      },
    )
  );

let _handleAssetWDBType =
    (
      (fileName, wdbArrayBuffer),
      (wdbNodeId, parentFolderNodeId),
      (editorState, engineState),
    ) => {
  let (baseName, _) = FileNameService.getBaseNameAndExtName(fileName);

  AssetWDBUtils.importAssetWDB(
    (baseName, wdbArrayBuffer),
    (wdbNodeId, parentFolderNodeId),
    (editorState, engineState),
  )
  |> then_(((allGameObjects, (editorState, engineState))) => {
       let engineState =
         allGameObjects
         |> WonderCommonlib.ArrayService.reduceOneParam(
              (. engineState, gameObject) =>
                GameObjectEngineService.initGameObject(
                  gameObject,
                  engineState,
                ),
              engineState,
            )
         |> DirectorEngineService.loopBody(0.);

       (editorState, engineState) |> resolve;
     });
};

let _handleSpecificFuncByTypeAsync =
    (type_, (handleImageFunc, handleWDBFunc)) =>
  switch (type_) {
  | LoadImage => handleImageFunc()
  | LoadWDB => handleWDBFunc()
  | LoadError =>
    make((~resolve, ~reject) => {
      WonderLog.Log.error(
        WonderLog.Log.buildErrorMessage(
          ~title="handleSpecificFuncByType",
          ~description={j|the load file type is error|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      );

      reject(. LoadException);
    })
  };

let handleFileByTypeAsync = (fileResult: nodeResultType) => {
  let (editorState, assetNodeId) =
    AssetIdUtils.generateAssetId |> StateLogicService.getEditorState;
  let engineState = StateEngineService.unsafeGetState();
  let targetTreeNodeId = editorState |> AssetUtils.getTargetTreeNodeId;

  _handleSpecificFuncByTypeAsync(
    fileResult.type_,
    (
      () => {
        let (baseName, extName) =
          FileNameService.getBaseNameAndExtName(fileResult.name);
        let (textureComponent, engineState) =
          TextureUtils.createAndInitTexture(
            baseName
            |. AssetUtils.getUniqueTreeNodeName(
                 Texture,
                 targetTreeNodeId |. Some,
                 (editorState, engineState),
               ),
            StateEngineService.unsafeGetState(),
          );

        _handleImageType(
          (
            ImageUtils.getImageMimeType(extName),
            fileResult.name,
            fileResult.result |> FileReader.convertResultToString,
          ),
          (assetNodeId, targetTreeNodeId, textureComponent),
          (editorState, engineState),
        );
      },
      () =>
        _handleAssetWDBType(
          (
            fileResult.name,
            fileResult.result |> FileReader.convertResultToArrayBuffer,
          ),
          (assetNodeId, targetTreeNodeId),
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
               type_: AssetTreeNodeUtils.getUploadFileType(fileInfo.name),
               result,
             })
           );

           AssetTreeNodeUtils.readFileByTypeSync(reader, fileInfo);
         }),
       )
     )
  |> WonderBsMost.Most.flatMap((fileResult: nodeResultType) =>
       WonderBsMost.Most.fromPromise(fileResult |> handleFileByTypeAsync)
     )
  |> WonderBsMost.Most.drain
  |> then_(_ =>
       dispatchFunc(
         AppStore.UpdateAction(Update([|UpdateStore.BottomComponent|])),
       )
       |> resolve
     );
};