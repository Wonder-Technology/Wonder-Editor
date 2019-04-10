open FileType;

open NodeAssetType;

open Js.Promise;

let _handleImage =
    (
      (mimeType, fileName, imgBase64),
      (textureNodeId, selectedFolderNodeInAssetTree, textureComponent),
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

        let (editorState, imageDataIndex) =
          ImageDataMapAssetEditorService.addImageNodeByBase64(
            imgBase64,
            fileName,
            mimeType,
            editorState,
          );

        let editorState =
          TextureNodeAssetEditorService.addTextureNodeToAssetTree(
            selectedFolderNodeInAssetTree,
            TextureNodeAssetService.buildNode(
              ~nodeId=textureNodeId,
              ~textureComponent,
              ~imageDataIndex,
            ),
            editorState,
          );

        resolve(. (editorState, engineState));
      },
    )
  );

let _handleAssetWDBType =
    (
      (fileName, wdbArrayBuffer),
      (wdbNodeId, selectedFolderNodeInAssetTree),
      (editorState, engineState),
    ) =>
  WDBAssetLogicService.importAssetWDB(
    (
      FileNameService.getBaseName(fileName)
      ->(
          OperateTreeAssetLogicService.getUniqueNodeName(
            selectedFolderNodeInAssetTree,
            engineState,
          )
        ),
      wdbArrayBuffer,
    ),
    (wdbNodeId, selectedFolderNodeInAssetTree),
    true,
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
         ExtractAndRelateAssetsUtils.Extract.extractAndRelateAssets(
           allGameObjects,
           imageUint8ArrayDataMap,
           (editorState, engineState),
         );

       let defaultGeometryData =
         RelateGameObjectAndGeometryAssetUtils.getDefaultGeometryData(
           editorState,
           engineState,
         );

       let engineState =
         allGameObjects
         |> WonderCommonlib.ArrayService.reduceOneParam(
              (. engineState, gameObject) =>
                engineState
                |> RelateGameObjectAndGeometryAssetUtils.replaceWDBAssetGameObjectGeometryComponentToDefaultGeometryComponent(
                     gameObject,
                     defaultGeometryData,
                   )
                |> GameObjectEngineService.initGameObject(gameObject),
              engineState,
            )
         |> DirectorEngineService.loopBody(0.);

       WonderLog.Console.profile("generate image");

       let (editorState, engineState) =
         ExtractAndRelateAssetsUtils.AssetTree.addNodeToAssetTree(
           extractedMaterialAssetDataArr,
           extractedTextureAssetDataArr,
           (editorState, engineState),
         );

       WonderLog.Console.profileEnd();

       (editorState, engineState) |> resolve;
     });

let _handleGLBType =
    (
      (fileName, glbArrayBuffer),
      (wdbNodeId, selectedFolderNodeInAssetTree),
      (editorState, engineState),
    ) =>
  _handleAssetWDBType(
    (fileName, ConverterEngineService.convertGLBToWDB(glbArrayBuffer)),
    (wdbNodeId, selectedFolderNodeInAssetTree),
    (editorState, engineState),
  );

let _handleGLTFZipType =
    (
      (fileName, jsZipBlob),
      (wdbNodeId, selectedFolderNodeInAssetTree),
      createJsZipFunc,
      (editorState, engineState),
    ) =>
  LoadGLTFZipUtils.convertGLTFToGLB(jsZipBlob, createJsZipFunc)
  |> then_(glbArrayBuffer =>
       _handleGLBType(
         (fileName, glbArrayBuffer),
         (wdbNodeId, selectedFolderNodeInAssetTree),
         (editorState, engineState),
       )
     );

let _handleSpecificFuncByTypeAsync =
    (
      type_,
      (handleTextureFunc, handleWDBFunc, handleGLBFunc, handleGLTFZipFuncc),
    ) =>
  switch (type_) {
  | LoadTexture => handleTextureFunc()
  | LoadWDB => handleWDBFunc()
  | LoadGLB => handleGLBFunc()
  | LoadGLTFZip => handleGLTFZipFuncc()
  | LoadError =>
    make((~resolve, ~reject) => reject(. LoadException("load asset error")))
  };

let _handleTextureType =
    (
      fileResult: nodeResultType,
      (selectedFolderNodeInAssetTree, assetNodeId),
      (editorState, engineState),
    ) => {
  let baseName = FileNameService.getBaseName(fileResult.name);
  let extName = FileNameService.getExtName(fileResult.name);

  let (textureComponent, engineState) =
    TextureUtils.createAndInitTexture(
      OperateTreeAssetLogicService.getUniqueNodeName(
        baseName,
        selectedFolderNodeInAssetTree,
        engineState,
      ),
      extName,
      StateEngineService.unsafeGetState(),
    );

  _handleImage(
    (
      ImageUtils.getImageMimeType(extName, editorState),
      fileResult.name,
      fileResult.result |> FileReader.convertResultToString,
    ),
    (assetNodeId, selectedFolderNodeInAssetTree, textureComponent),
    (editorState, engineState),
  );
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
        _handleTextureType(
          fileResult,
          (selectedFolderNodeInAssetTree, assetNodeId),
          (editorState, engineState),
        ),
      () =>
        _handleAssetWDBType(
          (
            fileResult.name,
            fileResult.result |> FileReader.convertResultToArrayBuffer,
          ),
          (assetNodeId, selectedFolderNodeInAssetTree),
          (editorState, engineState),
        ),
      () =>
        _handleGLBType(
          (
            fileResult.name,
            fileResult.result |> FileReader.convertResultToArrayBuffer,
          ),
          (assetNodeId, selectedFolderNodeInAssetTree),
          (editorState, engineState),
        ),
      () =>
        _handleGLTFZipType(
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
           AppStore.UpdateAction(Update([|UpdateStore.Project|])),
         );

         resolve();
       });
  };
};