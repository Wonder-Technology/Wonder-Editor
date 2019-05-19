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
          ImageDataMapAssetEditorService.addImageDataIfBase64NotExist(
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
         (
           extractedMaterialAssetDataArr,
           extractedTextureAssetDataArr,
           extractedScriptEventFunctionAssetEntriesArr,
           extractedScriptAttributeAssetEntriesArr,
         ),
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

       let (editorState, engineState) =
         ExtractAndRelateAssetsUtils.AssetTree.addNodeToAssetTree(
           extractedMaterialAssetDataArr,
           extractedTextureAssetDataArr,
           extractedScriptEventFunctionAssetEntriesArr,
           extractedScriptAttributeAssetEntriesArr,
           (editorState, engineState),
         );

       (editorState, engineState) |> resolve;
     });

let _getAssetBundleTypeByExtname = extname =>
  switch (extname) {
  | ".rab" => RAB
  | ".sab" => SAB
  | ".wab" => WAB
  | extName =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_getAssetBundleTypeByExtname",
        ~description={j|unknown extName: $extName|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let _handleAssetAssetBundleType =
    (
      (fileName, assetBundleArrayBuffer),
      (assetBundleNodeId, selectedFolderNodeInAssetTree),
      (editorState, engineState),
    ) =>
  make((~resolve, ~reject) => {
    let editorState =
      AssetBundleNodeAssetEditorService.addAssetBundleNodeToAssetTree(
        selectedFolderNodeInAssetTree,
        AssetBundleNodeAssetService.buildNode(
          ~nodeId=assetBundleNodeId,
          ~name=
            OperateTreeAssetLogicService.getUniqueNodeName(
              FileNameService.getBaseName(fileName),
              selectedFolderNodeInAssetTree,
              engineState,
            ),
          ~assetBundle=assetBundleArrayBuffer,
          ~type_=
            _getAssetBundleTypeByExtname(
              FileNameService.getExtName(fileName),
            ),
        ),
        editorState,
      );

    resolve(. (editorState, engineState));
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

let _getZipRelativeFolderPath = zipRelativePath => {
  let arr = zipRelativePath |> Js.String.split("/");

  arr |> Js.Array.length > 0 ?
    arr
    |> Js.Array.slice(~start=0, ~end_=(arr |> Js.Array.length) - 1)
    |> Js.Array.joinWith("/") :
    "";
};

let _buildPathInAssetTree =
    (
      selectedFolderNodeInAssetTree,
      zipRelativePath,
      (editorState, engineState),
    ) => {
  let zipRelativeFolderPath = _getZipRelativeFolderPath(zipRelativePath);

  PathTreeAssetLogicService.getNodePath(
    selectedFolderNodeInAssetTree,
    (editorState, engineState),
  )
  ++ (zipRelativeFolderPath === "" ? "" : "/" ++ zipRelativeFolderPath);
};

let _handleAssetBundleZipType =
    (
      (fileName, jsZipBlob),
      (wdbNodeId, selectedFolderNodeInAssetTree),
      createJsZipFunc,
      (editorState, engineState),
    ) =>
  WonderBsJszip.(
    createJsZipFunc()->(Zip.loadAsync(`blob(jsZipBlob)))
    |> WonderBsMost.Most.fromPromise
    |> WonderBsMost.Most.flatMap(zip => {
         let streamArr = [||];

         editorState |> StateEditorService.setState |> ignore;
         engineState |> StateEngineService.setState |> ignore;

         zip
         ->(
             Zip.forEach((relativePath, zipEntry) => {
               let extname = FileNameService.getExtName(relativePath);

               switch (extname) {
               | "" => ()
               | ".wab"
               | ".sab"
               | ".rab" =>
                 streamArr
                 |> ArrayService.push(
                      zipEntry->(ZipObject.asyncUint8())
                      |> Obj.magic
                      |> then_(content => {
                           let editorState = StateEditorService.getState();

                           let assetBundle =
                             content |> Js.Typed_array.Uint8Array.buffer;

                           let (editorState, assetNodeId) =
                             IdAssetEditorService.generateNodeId(editorState);

                           let (editorState, parentFolderNode) =
                             OperateTreeAssetLogicService.addFolderNodesToTreeByPath(
                               _buildPathInAssetTree(
                                 selectedFolderNodeInAssetTree,
                                 relativePath,
                                 (editorState, engineState),
                               ),
                               (editorState, engineState),
                             );

                           let editorState =
                             AssetBundleNodeAssetEditorService.addAssetBundleNodeToAssetTree(
                               parentFolderNode,
                               AssetBundleNodeAssetService.buildNode(
                                 ~nodeId=assetNodeId,
                                 ~name=
                                   OperateTreeAssetLogicService.getUniqueNodeName(
                                     FileNameService.getBaseName(
                                       relativePath,
                                     ),
                                     parentFolderNode,
                                     engineState,
                                   ),
                                 ~assetBundle,
                                 ~type_=_getAssetBundleTypeByExtname(extname),
                               ),
                               editorState,
                             );

                           editorState |> StateEditorService.setState |> ignore;

                           resolve();
                         })
                      |> WonderBsMost.Most.fromPromise,
                    )
                 |> ignore
               | extname =>
                 WonderLog.Log.fatal(
                   WonderLog.Log.buildFatalMessage(
                     ~description={j|_handleAssetBundleZipType|j},
                     ~reason="unknown extname: $extname",
                     ~solution={j||j},
                     ~params={j||j},
                   ),
                 )
               };
             })
           );

         Wonderjs.MostUtils.concatArray(streamArr);
       })
    |> WonderBsMost.Most.drain
    |> then_(_ =>
         resolve((
           StateEditorService.getState(),
           StateEngineService.unsafeGetState(),
         ))
       )
  );

let _handleZipType =
    (
      (fileName, jsZipBlob),
      (wdbNodeId, selectedFolderNodeInAssetTree),
      createJsZipFunc,
      (editorState, engineState),
    ) =>
  WonderBsJszip.(
    createJsZipFunc()->(Zip.loadAsync(`blob(jsZipBlob)))
    |> then_(zip => {
         let isGLTFZip = ref(false);
         let isAssetBundleZip = ref(false);

         zip
         ->(
             Zip.forEach((relativePath, zipEntry) =>
               switch (FileNameService.getExtName(relativePath)) {
               | ".gltf" => isGLTFZip := true
               | ".wab"
               | ".sab"
               | ".rab" => isAssetBundleZip := true
               | _ => ()
               }
             )
           );

         isGLTFZip^ ?
           _handleGLTFZipType(
             (fileName, jsZipBlob),
             (wdbNodeId, selectedFolderNodeInAssetTree),
             createJsZipFunc,
             (editorState, engineState),
           ) :
           isAssetBundleZip^ ?
             _handleAssetBundleZipType(
               (fileName, jsZipBlob),
               (wdbNodeId, selectedFolderNodeInAssetTree),
               createJsZipFunc,
               (editorState, engineState),
             ) :
             resolve((editorState, engineState));
       })
  );

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
        _handleAssetAssetBundleType(
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
        _handleZipType(
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