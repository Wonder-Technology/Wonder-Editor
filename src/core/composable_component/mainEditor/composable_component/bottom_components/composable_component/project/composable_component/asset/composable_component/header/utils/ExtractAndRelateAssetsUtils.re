module Extract = {
  let _hasExtractedAsset = (key, hasExtractedAssetMap) =>
    switch (
      hasExtractedAssetMap
      |> WonderCommonlib.ImmutableSparseMapService.get(key)
    ) {
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
      (
        imageUint8ArrayDataMap,
        RelateGameObjectAndTextureAssetUtils.isTextureDataEqual(
          RelateGameObjectAndTextureAssetUtils.isImageDataEqual,
        ),
        engineState,
      ),
    );

  let _addExtractedMaterialAssetData =
      (
        (sourceMaterial, materialType),
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
                   NodeNameAssetLogicService.getMaterialNodeName,
                   OperateMaterialLogicService.setName,
                 ),
               )),
            hasExtractedMaterialAssetMap
            |> WonderCommonlib.ImmutableSparseMapService.set(
                 sourceMaterial,
                 true,
               ),
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
        (imageUint8ArrayDataMap, defaultMaterialData, materialDataMapData),
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
        (sourceMaterial, materialType),
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
                 |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
                      sourceTexture,
                    ),
                 BasicSourceTextureEngineService.unsafeGetSource(
                   sourceTexture,
                   engineState,
                 )
                 |> ImageUtils.getImageName,
                 (
                   (texture, engineState) =>
                     OperateTextureLogicService.getName(
                       ~texture,
                       ~engineState,
                     ),
                   BasicSourceTextureEngineService.setBasicSourceTextureName,
                 ),
               )),
            hasExtractedTextureAssetMap
            |> WonderCommonlib.ImmutableSparseMapService.set(
                 sourceTexture,
                 true,
               ),
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
        (
          replacedTargetTextureMap,
          textureAssetDataMap,
          imageUint8ArrayDataMap,
        ),
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
    MaterialNodeAssetEditorService.getMaterialComponentsByType(
      materialType,
      editorState,
    )
    |> ImmutableSparseMapType.arrayToImmutableSparseMap;

  /* MaterialNodeMapAssetEditorService.getValidValues(editorState)
     |> WonderCommonlib.ImmutableSparseMapService.filter(({type_}: NodeAssetType.materialResultType) =>
          type_ === materialType
        )
     |> WonderCommonlib.ImmutableSparseMapService.map(
          ({materialComponent}: NodeAssetType.materialResultType) =>
          materialComponent
        ); */

  let _prepareData = (editorState, engineState) => {
    let defaultMaterialData =
      RelateGameObjectAndMaterialAssetUtils.getDefaultMaterialData(
        editorState,
        engineState,
      );

    let basicMaterialMap =
      _buildMaterialMap(MaterialDataAssetType.BasicMaterial, editorState);
    let lightMaterialMap =
      _buildMaterialMap(MaterialDataAssetType.LightMaterial, editorState);

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
      TextureNodeAssetEditorService.getTextureComponents(editorState)
      |> ImmutableSparseMapType.arrayToImmutableSparseMap
      |> WonderCommonlib.ImmutableSparseMapService.mapValid(
           (. textureComponent) =>
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
                 (
                   imageUint8ArrayDataMap,
                   defaultMaterialData,
                   (basicMaterialDataMap, lightMaterialDataMap),
                 ),
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
               WonderCommonlib.ImmutableSparseMapService.createEmpty(),
               WonderCommonlib.ImmutableSparseMapService.createEmpty(),
             ),
             (
               WonderCommonlib.ImmutableSparseMapService.createEmpty(),
               WonderCommonlib.ImmutableSparseMapService.createEmpty(),
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
  let _findTargetFolderChildNodeByName =
      (folderNode, targetFolderChildNodeName, engineState) =>
    FolderNodeAssetService.getChildren(folderNode)
    |> UIStateAssetService.get
    |> Js.Array.find(child =>
         NodeNameAssetLogicService.getNodeName(child, engineState)
         === targetFolderChildNodeName
       );

  let _buildFolderNode =
      (folderName, selectedFolderNodeInAssetTree, (editorState, engineState)) =>
    switch (
      _findTargetFolderChildNodeByName(
        selectedFolderNodeInAssetTree,
        folderName,
        engineState,
      )
    ) {
    | Some(node) => (editorState, node)
    | None =>
      let (editorState, newNodeId) =
        IdAssetEditorService.generateNodeId(editorState);
      let newNode =
        FolderNodeAssetService.buildNode(
          ~nodeId=newNodeId,
          ~name=folderName,
          (),
        );

      let editorState =
        FolderNodeAssetEditorService.addFolderNodeToAssetTree(
          selectedFolderNodeInAssetTree,
          newNode,
          editorState,
        );

      (editorState, newNode);
    };

  let _addMaterialNodeToAssetTree =
      (
        extractedMaterialAssetDataArr,
        selectedFolderNodeInAssetTree,
        (editorState, engineState),
      ) =>
    extractedMaterialAssetDataArr |> Js.Array.length === 0 ?
      (editorState, engineState) :
      {
        let folderName = "Materials";

        let (editorState, folderNode) =
          _buildFolderNode(
            folderName,
            selectedFolderNodeInAssetTree,
            (editorState, engineState),
          );

        extractedMaterialAssetDataArr
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (.
               (editorState, engineState),
               ((material, materialType), (getNameFunc, setNameFunc)),
             ) => {
               let materialName =
                 getNameFunc(~material, ~type_=materialType, ~engineState)
                 ->(
                     OperateTreeAssetLogicService.getUniqueNodeName(
                       folderNode,
                       engineState,
                     )
                   );

               let engineState =
                 setNameFunc(
                   ~material,
                   ~type_=materialType,
                   ~name=materialName,
                   ~engineState,
                 );

               let (editorState, newNodeId) =
                 IdAssetEditorService.generateNodeId(editorState);

               let (editorState, newImageDataIndex) =
                 IndexAssetEditorService.generateImageDataMapIndex(
                   editorState,
                 );

               /* TODO extract gltf/wdb material file, create material snapshot to store in imageDataMap */
               let editorState =
                 MaterialNodeAssetEditorService.addMaterialNodeToAssetTree(
                   folderNode,
                   MaterialNodeAssetService.buildNode(
                     ~nodeId=newNodeId,
                     ~type_=MaterialDataAssetType.LightMaterial,
                     ~materialComponent=material,
                     ~imageDataIndex=newImageDataIndex,
                   ),
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
        selectedFolderNodeInAssetTree,
        (editorState, engineState),
      ) =>
    extractedTextureAssetDataArr |> Js.Array.length === 0 ?
      (editorState, engineState) :
      {
        let folderName = "Textures";

        let (editorState, folderNode) =
          _buildFolderNode(
            folderName,
            selectedFolderNodeInAssetTree,
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
                 ->(
                     OperateTreeAssetLogicService.getUniqueNodeName(
                       folderNode,
                       engineState,
                     )
                   );

               let engineState =
                 setTextureNameFunc(textureName, texture, engineState);

               let (editorState, imageDataIndex) =
                 ImageDataMapAssetEditorService.addImageNodeByUint8Array(
                   imageUint8Array,
                   imageName,
                   mimeType,
                   editorState,
                 );

               let (editorState, textureNodeId) =
                 IdAssetEditorService.generateNodeId(editorState);

               let editorState =
                 TextureNodeAssetEditorService.addTextureNodeToAssetTree(
                   folderNode,
                   TextureNodeAssetService.buildNode(
                     ~nodeId=textureNodeId,
                     ~textureComponent=texture,
                     ~imageDataIndex,
                   ),
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
    let selectedFolderNodeInAssetTree =
      editorState
      |> OperateTreeAssetEditorService.unsafeGetSelectedFolderNodeInAssetTree;

    (editorState, engineState)
    |> _addMaterialNodeToAssetTree(
         extractedMaterialAssetDataArr,
         selectedFolderNodeInAssetTree,
       )
    |> _addTextureNodeToAssetTree(
         extractedTextureAssetDataArr,
         selectedFolderNodeInAssetTree,
       );
  };
};