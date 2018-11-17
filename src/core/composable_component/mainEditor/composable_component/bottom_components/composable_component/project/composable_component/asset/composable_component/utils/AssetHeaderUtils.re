open FileType;

open AssetNodeType;

open Js.Promise;

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
          AddTextureNodeUtils.addImageNodeByBase64(
            imgBase64,
            fileName,
            mimeType,
            editorState,
          );

        let editorState =
          AddTextureNodeUtils.addTextureNodeToAssetTree(
            textureComponent,
            (parentFolderNodeId, textureNodeId, imageNodeId),
            editorState,
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
  let baseName = FileNameService.getBaseName(fileName);

  AssetWDBUtils.importAssetWDB(
    (
      baseName
      |. IterateAssetTreeAssetEditorService.getUniqueTreeNodeName(
           WDB,
           parentFolderNodeId |. Some,
           (editorState, engineState),
         ),
      wdbArrayBuffer,
    ),
    (wdbNodeId, parentFolderNodeId),
    (editorState, engineState),
  )
  |> then_(
       (
         (
           (allGameObjects, imageUint8ArrayDataMap),
           (editorState, engineState),
         ),
       ) => {
       let (
         (extractedMaterialAssetDataArr, extractedTextureAssetDataArr),
         (editorState, engineState),
       ) =
         ExtractAndRelateAssetsUtils.extractAndRelateAssets(
           allGameObjects,
           imageUint8ArrayDataMap,
           (editorState, engineState),
         );

       let defaultGeometryData =
         RelateGameObjectAndAssetUtils.getDefaultGeometryData(
           editorState,
           engineState,
         );

       let engineState =
         allGameObjects
         |> WonderCommonlib.ArrayService.reduceOneParam(
              (. engineState, gameObject) =>
                engineState
                |> RelateGameObjectAndAssetUtils.replaceWDBAssetGameObjectGeometryComponentToDefaultGeometryComponent(
                     gameObject,
                     defaultGeometryData,
                   )
                |> GameObjectEngineService.initGameObject(gameObject),
              engineState,
            )
         |> DirectorEngineService.loopBody(0.);

       let (editorState, engineState) =
         ExtractAndRelateAssetsUtils.addNodeToAssetTree(
           extractedMaterialAssetDataArr,
           extractedTextureAssetDataArr,
           (editorState, engineState),
         );

       (editorState, engineState) |> resolve;
     });
};

let _handleGLBType =
    (
      (fileName, glbArrayBuffer),
      (wdbNodeId, parentFolderNodeId),
      (editorState, engineState),
    ) =>
  _handleAssetWDBType(
    (fileName, ConverterEngineService.convertGLBToWDB(glbArrayBuffer)),
    (wdbNodeId, parentFolderNodeId),
    (editorState, engineState),
  );

let _handleGLTFZipType =
    (
      (fileName, jsZipBlob),
      (wdbNodeId, parentFolderNodeId),
      createJsZipFunc,
      (editorState, engineState),
    ) =>
  LoadGLTFZipUtils.convertGLTFToGLB(jsZipBlob, createJsZipFunc)
  |> then_(glbArrayBuffer =>
       _handleGLBType(
         (fileName, glbArrayBuffer),
         (wdbNodeId, parentFolderNodeId),
         (editorState, engineState),
       )
     );

let _handleSpecificFuncByTypeAsync =
    (
      type_,
      (handleImageFunc, handleWDBFunc, handleGLBFunc, handleGLTFZipFuncc),
    ) =>
  switch (type_) {
  | LoadImage => handleImageFunc()
  | LoadWDB => handleWDBFunc()
  | LoadGLB => handleGLBFunc()
  | LoadGLTFZip => handleGLTFZipFuncc()
  | LoadError =>
    make((~resolve, ~reject) => reject(. LoadException("load asset error")))
  };

let handleFileByTypeAsync = (fileResult: nodeResultType, createJsZipFunc) => {
  let (editorState, assetNodeId) =
    AssetIdUtils.generateAssetId |> StateLogicService.getEditorState;
  let engineState = StateEngineService.unsafeGetState();

  let targetTreeNodeId = editorState |> AssetTreeUtils.getTargetTreeNodeId;

  _handleSpecificFuncByTypeAsync(
    fileResult.type_,
    (
      () => {
        let baseName = FileNameService.getBaseName(fileResult.name);
        let extName = FileNameService.getExtName(fileResult.name);

        let (textureComponent, engineState) =
          TextureUtils.createAndInitTexture(
            baseName
            |. IterateAssetTreeAssetEditorService.getUniqueTreeNodeName(
                 Texture,
                 targetTreeNodeId |. Some,
                 (editorState, engineState),
               ),
            StateEngineService.unsafeGetState(),
          );

        _handleImageType(
          (
            ImageUtils.getImageMimeType(extName, editorState),
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
      () =>
        _handleGLBType(
          (
            fileResult.name,
            fileResult.result |> FileReader.convertResultToArrayBuffer,
          ),
          (assetNodeId, targetTreeNodeId),
          (editorState, engineState),
        ),
      () =>
        _handleGLTFZipType(
          (
            fileResult.name,
            fileResult.result |> FileReader.convertResultToJsZipBlob,
          ),
          (assetNodeId, targetTreeNodeId),
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

let fileLoad = ((store, dispatchFunc), createJsZipFunc, event) => {
  let e = ReactEventType.convertReactFormEventToJsEvent(event);
  DomHelper.preventDefault(e);

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
           AppStore.UpdateAction(Update([|UpdateStore.Project|])),
         );

         resolve();
       });
  };
};