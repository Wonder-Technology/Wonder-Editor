module Extract = {
  let _hasExtractedAsset = (key, hasExtractedAssetMap) =>
    switch (hasExtractedAssetMap |> WonderCommonlib.SparseMapService.get(key)) {
    | Some(true) => true
    | _ => false
    };

  let _isLightMaterialDataEqual =
      (
        (name, diffuseColor, shininess, textureData),
        material2,
        imageUint8ArrayDataMap,
        engineState,
      ) =>
    RelateGameObjectAndMaterialAssetUtils.isLightMaterialDataEqual(
      (name, diffuseColor, shininess, textureData),
      material2,
      imageUint8ArrayDataMap,
      RelateGameObjectAndTextureAssetUtils.isTextureDataEqual(
        RelateGameObjectAndTextureAssetUtils.isImageDataEqual,
      ),
      engineState,
    );

  let _addExtractedMaterialAssetData =
      (
        sourceMaterial,
        materialType,
        replacedTargetMaterialMap,
        (hasExtractedMaterialAssetMap, extractedMaterialAssetDataArr),
        engineState,
      ) => {
    let (extractedMaterialAssetDataArr, hasExtractedMaterialAssetMap) =
      switch (sourceMaterial, materialType) {
      | (Some(sourceMaterial), Some(materialType)) =>
        _hasExtractedAsset(sourceMaterial, hasExtractedMaterialAssetMap) ?
          (extractedMaterialAssetDataArr, hasExtractedMaterialAssetMap) :
          (
            extractedMaterialAssetDataArr
            |> ArrayService.push((
                 (sourceMaterial, materialType),
                 (
                   MainEditorMaterialUtils.getName,
                   MainEditorMaterialUtils.setName,
                 ),
               )),
            hasExtractedMaterialAssetMap
            |> WonderCommonlib.SparseMapService.set(sourceMaterial, true),
          )
      | _ => (extractedMaterialAssetDataArr, hasExtractedMaterialAssetMap)
      };

    (
      true,
      replacedTargetMaterialMap,
      hasExtractedMaterialAssetMap,
      extractedMaterialAssetDataArr,
      engineState,
    );
  };

  let _extractAndRelateMaterialAssets =
      (
        gameObject,
        (
          replacedTargetMaterialMap,
          hasExtractedMaterialAssetMap,
          extractedMaterialAssetDataArr,
        ),
        imageUint8ArrayDataMap,
        defaultMaterialData,
        materialDataMapData,
        engineState,
      ) => {
    let (
      sourceMaterial,
      targetMaterial,
      materialType,
      replacedTargetMaterialMap,
    ) =
      RelateGameObjectAndMaterialAssetUtils.getRelatedMaterialDataFromGameObject(
        gameObject,
        replacedTargetMaterialMap,
        imageUint8ArrayDataMap,
        defaultMaterialData,
        materialDataMapData,
        _isLightMaterialDataEqual,
        engineState,
      );

    RelateGameObjectAndMaterialAssetUtils.doesNeedReplaceMaterial((
      sourceMaterial,
      targetMaterial,
      materialType,
    )) ?
      {
        let engineState =
          RelateGameObjectAndMaterialAssetUtils.replaceToMaterialAssetMaterialComponent(
            gameObject,
            (sourceMaterial, targetMaterial, materialType),
            engineState,
          );

        (
          false,
          replacedTargetMaterialMap,
          hasExtractedMaterialAssetMap,
          extractedMaterialAssetDataArr,
          engineState,
        );
      } :
      _addExtractedMaterialAssetData(
        sourceMaterial,
        materialType,
        replacedTargetMaterialMap,
        (hasExtractedMaterialAssetMap, extractedMaterialAssetDataArr),
        engineState,
      );
  };

  let _addExtractedTextureAssetData =
      (
        sourceTexture,
        replacedTargetTextureMap,
        imageUint8ArrayDataMap,
        (hasExtractedTextureAssetMap, extractedTextureAssetDataArr),
        (editorState, engineState),
      ) => {
    let (extractedTextureAssetDataArr, hasExtractedTextureAssetMap) =
      switch (sourceTexture) {
      | Some(sourceTexture) =>
        _hasExtractedAsset(sourceTexture, hasExtractedTextureAssetMap) ?
          (extractedTextureAssetDataArr, hasExtractedTextureAssetMap) :
          (
            extractedTextureAssetDataArr
            |> ArrayService.push((
                 sourceTexture,
                 imageUint8ArrayDataMap
                 |> WonderCommonlib.SparseMapService.unsafeGet(sourceTexture),
                 BasicSourceTextureEngineService.unsafeGetSource(
                   sourceTexture,
                   engineState,
                 )
                 |> ImageUtils.getImageName,
                 (
                   OperateTextureLogicService.getTextureBaseNameByTextureComponent,
                   BasicSourceTextureEngineService.setBasicSourceTextureName,
                 ),
               )),
            hasExtractedTextureAssetMap
            |> WonderCommonlib.SparseMapService.set(sourceTexture, true),
          )
      | None => (extractedTextureAssetDataArr, hasExtractedTextureAssetMap)
      };

    (
      replacedTargetTextureMap,
      hasExtractedTextureAssetMap,
      extractedTextureAssetDataArr,
      (editorState, engineState),
    );
  };

  let _extractAndRelateTextureAssets =
      (
        gameObject,
        imageUint8ArrayDataMap,
        (
          replacedTargetTextureMap,
          hasExtractedTextureAssetMap,
          extractedTextureAssetDataArr,
          textureAssetDataMap,
        ),
        (editorState, engineState),
      ) => {
    let (sourceTexture, targetTexture, setMapFunc, replacedTargetTextureMap) =
      RelateGameObjectAndTextureAssetUtils.getRelatedTextureDataFromGameObject(
        gameObject,
        replacedTargetTextureMap,
        textureAssetDataMap,
        imageUint8ArrayDataMap,
        (editorState, engineState),
      );

    RelateGameObjectAndTextureAssetUtils.doesNeedReplaceTexture((
      targetTexture,
      setMapFunc,
    )) ?
      {
        let engineState =
          RelateGameObjectAndTextureAssetUtils.replaceToTextureAssetTextureComponent(
            gameObject,
            (targetTexture, setMapFunc),
            (editorState, engineState),
          );

        (
          replacedTargetTextureMap,
          hasExtractedTextureAssetMap,
          extractedTextureAssetDataArr,
          (editorState, engineState),
        );
      } :
      _addExtractedTextureAssetData(
        sourceTexture,
        replacedTargetTextureMap,
        imageUint8ArrayDataMap,
        (hasExtractedTextureAssetMap, extractedTextureAssetDataArr),
        (editorState, engineState),
      );
  };

  let _buildMaterialMap = (materialType, editorState) =>
    MaterialNodeMapAssetEditorService.getValidValues(editorState)
    |> SparseMapService.filter(({type_}: AssetNodeType.materialResultType) =>
         type_ === materialType
       )
    |> SparseMapService.map(
         ({materialComponent}: AssetNodeType.materialResultType) =>
         materialComponent
       );

  let _prepareData = (editorState, engineState) => {
    let defaultMaterialData =
      RelateGameObjectAndMaterialAssetUtils.getDefaultMaterialData(
        editorState,
        engineState,
      );

    let basicMaterialMap =
      _buildMaterialMap(AssetMaterialDataType.BasicMaterial, editorState);
    let lightMaterialMap =
      _buildMaterialMap(AssetMaterialDataType.LightMaterial, editorState);

    let basicMaterialDataMap =
      RelateGameObjectAndMaterialAssetUtils.getBasicMaterialDataMap(
        basicMaterialMap,
        engineState,
      );

    let lightMaterialDataMap =
      RelateGameObjectAndMaterialAssetUtils.getLightMaterialDataMap(
        lightMaterialMap,
        (editorState, engineState),
      );

    let textureAssetDataMap =
      TextureNodeMapAssetEditorService.getTextureComponents(editorState)
      |> SparseMapService.map(textureComponent =>
           (
             textureComponent,
             RelateGameObjectAndTextureAssetUtils.getTextureData(
               textureComponent,
               (editorState, engineState),
             ),
           )
         );

    (
      defaultMaterialData,
      basicMaterialMap,
      lightMaterialMap,
      basicMaterialDataMap,
      lightMaterialDataMap,
      textureAssetDataMap,
    );
  };

  let extractAndRelateAssets =
      (allGameObjects, imageUint8ArrayDataMap, (editorState, engineState)) => {
    let (
      defaultMaterialData,
      basicMaterialMap,
      lightMaterialMap,
      basicMaterialDataMap,
      lightMaterialDataMap,
      textureAssetDataMap,
    ) =
      _prepareData(editorState, engineState);

    let (
      _,
      _,
      (extractedMaterialAssetDataArr, extractedTextureAssetDataArr),
      (editorState, engineState),
    ) =
      allGameObjects
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (.
             (
               (replacedTargetMaterialMap, replacedTargetTextureMap),
               (hasExtractedMaterialAssetMap, hasExtractedTextureAssetMap),
               (extractedMaterialAssetDataArr, extractedTextureAssetDataArr),
               (editorState, engineState),
             ),
             gameObject,
           ) => {
             let (
               doseNeedExtractTextureAssets,
               replacedTargetMaterialMap,
               hasExtractedMaterialAssetMap,
               extractedMaterialAssetDataArr,
               engineState,
             ) =
               _extractAndRelateMaterialAssets(
                 gameObject,
                 (
                   replacedTargetMaterialMap,
                   hasExtractedMaterialAssetMap,
                   extractedMaterialAssetDataArr,
                 ),
                 imageUint8ArrayDataMap,
                 defaultMaterialData,
                 (basicMaterialDataMap, lightMaterialDataMap),
                 engineState,
               );

             doseNeedExtractTextureAssets ?
               {
                 let (
                   replacedTargetTextureMap,
                   hasExtractedTextureAssetMap,
                   extractedTextureAssetDataArr,
                   (editorState, engineState),
                 ) =
                   _extractAndRelateTextureAssets(
                     gameObject,
                     imageUint8ArrayDataMap,
                     (
                       replacedTargetTextureMap,
                       hasExtractedTextureAssetMap,
                       extractedTextureAssetDataArr,
                       textureAssetDataMap,
                     ),
                     (editorState, engineState),
                   );

                 (
                   (replacedTargetMaterialMap, replacedTargetTextureMap),
                   (
                     hasExtractedMaterialAssetMap,
                     hasExtractedTextureAssetMap,
                   ),
                   (
                     extractedMaterialAssetDataArr,
                     extractedTextureAssetDataArr,
                   ),
                   (editorState, engineState),
                 );
               } :
               (
                 (replacedTargetMaterialMap, replacedTargetTextureMap),
                 (hasExtractedMaterialAssetMap, hasExtractedTextureAssetMap),
                 (
                   extractedMaterialAssetDataArr,
                   extractedTextureAssetDataArr,
                 ),
                 (editorState, engineState),
               );
           },
           (
             (
               WonderCommonlib.SparseMapService.createEmpty(),
               WonderCommonlib.SparseMapService.createEmpty(),
             ),
             (
               WonderCommonlib.SparseMapService.createEmpty(),
               WonderCommonlib.SparseMapService.createEmpty(),
             ),
             ([||], [||]),
             (editorState, engineState),
           ),
         );

    (
      (extractedMaterialAssetDataArr, extractedTextureAssetDataArr),
      (editorState, engineState),
    );
  };
};

module AssetTree = {
  let _buildFolderNode =
      (
        siblingFolderDataArr,
        folderName,
        parentFolderNodeId,
        (editorState, engineState),
      ) =>
    switch (
      siblingFolderDataArr
      |> Js.Array.find(((name, nodeId)) => name === folderName)
    ) {
    | Some((_, nodeId)) => (editorState, nodeId)
    | None =>
      let (editorState, newIndex) =
        AssetIdUtils.generateAssetId(editorState);

      let editorState =
        AddFolderNodeUtils.addFolderNodeToAssetTree(
          folderName,
          (parentFolderNodeId, newIndex),
          (editorState, engineState),
        );

      (editorState, newIndex);
    };

  let _addMaterialNodeToAssetTree =
      (
        extractedMaterialAssetDataArr,
        siblingFolderDataArr,
        parentFolderNodeId,
        (editorState, engineState),
      ) =>
    extractedMaterialAssetDataArr |> Js.Array.length === 0 ?
      (editorState, engineState) :
      {
        let folderName = "Materials";

        let (editorState, folderNodeId) =
          _buildFolderNode(
            siblingFolderDataArr,
            folderName,
            parentFolderNodeId,
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
                 |. IterateAssetTreeAssetEditorService.getUniqueTreeNodeName(
                      AssetNodeType.Material,
                      folderNodeId |. Some,
                      (editorState, engineState),
                    );

               let engineState =
                 setNameFunc(
                   material,
                   materialType,
                   materialName,
                   engineState,
                 );

               let (editorState, materialNodeId) =
                 AssetIdUtils.generateAssetId(editorState);

               let editorState =
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
        parentFolderNodeId,
        (editorState, engineState),
      ) =>
    extractedTextureAssetDataArr |> Js.Array.length === 0 ?
      (editorState, engineState) :
      {
        let folderName = "Textures";

        let (editorState, folderNodeId) =
          _buildFolderNode(
            siblingFolderDataArr,
            folderName,
            parentFolderNodeId,
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
                 |. IterateAssetTreeAssetEditorService.getUniqueTreeNodeName(
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

  let addNodeToAssetTree =
      (
        extractedMaterialAssetDataArr,
        extractedTextureAssetDataArr,
        (editorState, engineState),
      ) => {
    let targetTreeNodeId = editorState |> AssetTreeUtils.getTargetTreeNodeId;

    let siblingFolderDataArr =
      IterateAssetTreeAssetEditorService.getChildrenNameAndIdArr(
        targetTreeNodeId,
        AssetNodeType.Folder,
        (editorState, engineState),
      );

    (editorState, engineState)
    |> _addMaterialNodeToAssetTree(
         extractedMaterialAssetDataArr,
         siblingFolderDataArr,
         targetTreeNodeId,
       )
    |> _addTextureNodeToAssetTree(
         extractedTextureAssetDataArr,
         siblingFolderDataArr,
         targetTreeNodeId,
       );
  };
};