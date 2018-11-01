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

let _buildFolderNode =
    (
      siblingFolderDataArr,
      folderName,
      targetTreeNodeId,
      (editorState, engineState),
    ) =>
  switch (
    siblingFolderDataArr
    |> Js.Array.find(((name, nodeId)) => name === folderName)
  ) {
  | Some((_, nodeId)) => (editorState, nodeId)
  | None =>
    let (editorState, newIndex) = AssetIdUtils.generateAssetId(editorState);

    let editorState =
      AddFolderNodeUtils.addFolderNodeToAssetTree(
        (targetTreeNodeId, newIndex),
        (editorState, engineState),
      );

    (editorState, newIndex);
  };

let _addMaterialNodeToAssetTree =
    (
      extractedMaterialAssetDataArr,
      siblingFolderDataArr,
      (editorState, engineState),
    ) => {
  let folderName = "Materials";
  let targetTreeNodeId = editorState |> AssetUtils.getTargetTreeNodeId;

  let (editorState, folderNodeId) =
    _buildFolderNode(
      siblingFolderDataArr,
      folderName,
      targetTreeNodeId,
      (editorState, engineState),
    );

  extractedMaterialAssetDataArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         (editorState, engineState),
         ((material, materialType), (getNameFunc, setNameFunc)),
       ) => {
         let materialName =
           getNameFunc(material, materialType, engineState)
           |. AssetUtils.getUniqueTreeNodeName(
                AssetNodeType.Material,
                folderNodeId |. Some,
                (editorState, engineState),
              );

         let engineState =
           setNameFunc(material, materialType, materialName, engineState);

         let (editorState, materialNodeId) =
           AssetIdUtils.generateAssetId(editorState);

         AddMaterialNodeUtils.addMaterialNodeToAssetTree(
           material,
           (folderNodeId, materialNodeId),
           editorState,
         );

         (editorState, engineState);
       },
       (editorState, engineState),
     );
};

let _addTextureNodeToAssetTree =
    (
      extractedTextureAssetDataArr,
      siblingFolderDataArr,
      (editorState, engineState),
    ) => {
  let folderName = "Textures";
  let targetTreeNodeId = editorState |> AssetUtils.getTargetTreeNodeId;

  let (editorState, folderNodeId) =
    _buildFolderNode(
      siblingFolderDataArr,
      folderName,
      targetTreeNodeId,
      (editorState, engineState),
    );

  extractedTextureAssetDataArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         (editorState, engineState),
         (
           texture,
           (mimeType, imageUint8Array),
           imageName,
           (getTextureNameFunc, setTextureNameFunc),
         ),
       ) => {
         let textureName =
           getTextureNameFunc(texture, engineState)
           |. AssetUtils.getUniqueTreeNodeName(
                AssetNodeType.Texture,
                folderNodeId |. Some,
                (editorState, engineState),
              );

         let engineState =
           setTextureNameFunc(textureName, texture, engineState);

         let (imageNodeId, editorState) =
           AddTextureNodeUtils.addImageNodeByUint8Array(
             imageUint8Array,
             imageName,
             mimeType,
             editorState,
           );

         let (editorState, textureNodeId) =
           AssetIdUtils.generateAssetId(editorState);

         let editorState =
           AddTextureNodeUtils.addTextureNodeToAssetTree(
             texture,
             (folderNodeId, textureNodeId, imageNodeId),
             editorState,
           );

         (editorState, engineState);
       },
       (editorState, engineState),
     );
};

let _addNodeToAssetTree =
    (
      extractedMaterialAssetDataArr,
      extractedTextureAssetDataArr,
      (editorState, engineState),
    ) => {
  let targetTreeNodeId = editorState |> AssetUtils.getTargetTreeNodeId;

  let siblingFolderDataArr =
    AssetUtils.getChildrenNameAndIdArr(
      targetTreeNodeId,
      AssetNodeType.Folder,
      (editorState, engineState),
    );

  (editorState, engineState)
  |> _addMaterialNodeToAssetTree(
       extractedMaterialAssetDataArr,
       siblingFolderDataArr,
     )
  |> _addTextureNodeToAssetTree(
       extractedTextureAssetDataArr,
       siblingFolderDataArr,
     );
};

/* TODO refactor */
let _handleAssetWDBType =
    (
      (fileName, wdbArrayBuffer),
      (wdbNodeId, parentFolderNodeId),
      (editorState, engineState),
    ) => {
  let (baseName, _) = FileNameService.getBaseNameAndExtName(fileName);

  AssetWDBUtils.importAssetWDB(
    (
      baseName
      |. AssetUtils.getUniqueTreeNodeName(
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
       let defaultBasicMaterial =
         AssetMaterialDataEditorService.unsafeGetDefaultBasicMaterial(
           editorState,
         );
       let defaultLightMaterial =
         AssetMaterialDataEditorService.unsafeGetDefaultLightMaterial(
           editorState,
         );

       let basicMaterialMap =
         AssetMaterialNodeMapEditorService.getMaterialNodeMap(editorState)
         |> SparseMapService.filter(
              ({type_}: AssetNodeType.materialResultType) =>
              type_ === AssetMaterialDataType.BasicMaterial
            )
         |> SparseMapService.map(
              ({materialComponent}: AssetNodeType.materialResultType) =>
              materialComponent
            );

       let lightMaterialMap =
         AssetMaterialNodeMapEditorService.getMaterialNodeMap(editorState)
         |> SparseMapService.filter(
              ({type_}: AssetNodeType.materialResultType) =>
              type_ === AssetMaterialDataType.LightMaterial
            )
         |> SparseMapService.map(
              ({materialComponent}: AssetNodeType.materialResultType) =>
              materialComponent
            );

       let (
         (extractedMaterialAssetDataArr, extractedTextureAssetDataArr),
         (editorState, engineState),
       ) =
         allGameObjects
         |> WonderCommonlib.ArrayService.reduceOneParam(
              (.
                (
                  (
                    extractedMaterialAssetDataArr,
                    extractedTextureAssetDataArr,
                  ),
                  (editorState, engineState),
                ),
                gameObject,
              ) => {
                let (sourceMaterial, targetMaterial, materialType) as relatedMaterialData =
                  RelateGameObjectAndAssetUtils.getRelatedMaterialDataFromGameObject(
                    gameObject,
                    (defaultBasicMaterial, defaultLightMaterial),
                    (basicMaterialMap, lightMaterialMap),
                    engineState,
                  );

                RelateGameObjectAndAssetUtils.doesNeedReplaceMaterial(
                  relatedMaterialData,
                ) ?
                  {
                    let engineState =
                      RelateGameObjectAndAssetUtils.replaceToMaterialAssetMaterialComponent(
                        gameObject,
                        relatedMaterialData,
                        engineState,
                      );

                    (
                      (
                        extractedMaterialAssetDataArr,
                        extractedTextureAssetDataArr,
                      ),
                      (editorState, engineState),
                    );
                  } :
                  {
                    let extractedMaterialAssetDataArr =
                      switch (sourceMaterial, materialType) {
                      | (Some(sourceMaterial), Some(materialType)) =>
                        extractedMaterialAssetDataArr
                        |> ArrayService.push((
                             (sourceMaterial, materialType),
                             (
                               MainEditorMaterialUtils.getName,
                               MainEditorMaterialUtils.setName,
                             ),
                           ))
                      | _ => extractedMaterialAssetDataArr
                      };

                    let (sourceTexture, targetTexture, setMapFunc) as relatedTextureData =
                      RelateGameObjectAndAssetUtils.getRelatedTextureDataFromGameObject(
                        gameObject,
                        (editorState, engineState),
                      );

                    RelateGameObjectAndAssetUtils.doesNeedReplaceTexture((
                      targetTexture,
                      setMapFunc,
                    )) ?
                      {
                        let engineState =
                          RelateGameObjectAndAssetUtils.replaceToTextureAssetTextureComponent(
                            gameObject,
                            (targetTexture, setMapFunc),
                            engineState,
                          );

                        (
                          (
                            extractedMaterialAssetDataArr,
                            extractedTextureAssetDataArr,
                          ),
                          (editorState, engineState),
                        );
                      } :
                      {
                        let extractedTextureAssetDataArr =
                          switch (sourceTexture) {
                          | Some(sourceTexture) =>
                            extractedTextureAssetDataArr
                            |> ArrayService.push((
                                 sourceTexture,
                                 imageUint8ArrayDataMap
                                 |> WonderCommonlib.SparseMapService.unsafeGet(
                                      sourceTexture,
                                    ),
                                 BasicSourceTextureEngineService.unsafeGetSource(
                                   sourceTexture,
                                   engineState,
                                 )
                                 |> ImageUtils.getImageName,
                                 (
                                   OperateTextureLogicService.getTextureBaseNameByTextureComponent,
                                   BasicSourceTextureEngineService.setBasicSourceTextureName,
                                 ),
                               ))
                          | None => extractedTextureAssetDataArr
                          };

                        (
                          (
                            extractedMaterialAssetDataArr,
                            extractedTextureAssetDataArr,
                          ),
                          (editorState, engineState),
                        );
                      };
                  };
              },
              (([||], [||]), (editorState, engineState)),
            );

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

       let (editorState, engineState) =
         _addNodeToAssetTree(
           extractedMaterialAssetDataArr,
           extractedTextureAssetDataArr,
           (editorState, engineState),
         );

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