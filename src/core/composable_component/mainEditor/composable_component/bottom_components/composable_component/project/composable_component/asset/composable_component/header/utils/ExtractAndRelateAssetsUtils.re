module Extract = {
  let _hasExtractedAsset = (key, hasExtractedAssetMap) =>
    switch (
      hasExtractedAssetMap
      |> WonderCommonlib.ImmutableSparseMapService.get(key)
    ) {
    | Some(true) => true
    | _ => false
    };

  let _changeScriptAssetsHashMapToEntriesMap = hashMap =>
    hashMap
    |> WonderCommonlib.ImmutableHashMapService.getValidEntries
    |> WonderCommonlib.SparseMapType.arrayNotNullableToArrayNullable;

  let _extractAndRelateScriptEventFunctionAssets =
      (
        gameObject,
        scriptEventFunctionAssetHashMap,
        totalExtractedScriptEventFunctionAssetEntriesArr,
        engineState,
      ) => {
    let extractedScriptEventFunctionAssetEntriesArr =
      switch (
        GameObjectComponentEngineService.getScriptComponent(
          gameObject,
          engineState,
        )
      ) {
      | None => WonderCommonlib.ArrayService.createEmpty()
      | Some(script) =>
        ExtractScriptAssetLogicService.getScriptEventFunctionDataEntriesArrNotInScriptAssets(
          script,
          scriptEventFunctionAssetHashMap,
          engineState,
        )
      };

    let engineState =
      RelateGameObjectAndScriptEventFunctionAssetUtils.replaceToScriptEventFunctionAssetEventFunctionData(
        gameObject,
        scriptEventFunctionAssetHashMap
        |> _changeScriptAssetsHashMapToEntriesMap,
        engineState,
      );

    (
      ArrayService.fastConcat(
        totalExtractedScriptEventFunctionAssetEntriesArr,
        extractedScriptEventFunctionAssetEntriesArr,
      ),
      engineState,
    );
  };

  let _extractAndRelateScriptAttributeAssets =
      (
        gameObject,
        scriptAttributeAssetHashMap,
        totalExtractedScriptAttributeAssetEntriesArr,
        engineState,
      ) => {
    let extractedScriptAttributeAssetEntriesArr =
      switch (
        GameObjectComponentEngineService.getScriptComponent(
          gameObject,
          engineState,
        )
      ) {
      | None => WonderCommonlib.ArrayService.createEmpty()
      | Some(script) =>
        ExtractScriptAssetLogicService.getScriptAttributeEntriesArrNotInScriptAssets(
          script,
          scriptAttributeAssetHashMap,
          engineState,
        )
      };

    /* let engineState =
       RelateGameObjectAndScriptAttributeAssetUtils.replaceToScriptAttributeAssetAttribute(
         gameObject,
         scriptAttributeAssetHashMap|> _changeScriptAssetsHashMapToEntriesMap,
         engineState,
       ); */

    (
      ArrayService.fastConcat(
        totalExtractedScriptAttributeAssetEntriesArr,
        extractedScriptAttributeAssetEntriesArr,
      ),
      engineState,
    );
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

  let _buildScriptEventFunctionAssetHashMap = editorState =>
    ScriptEventFunctionNodeAssetEditorService.findAllScriptEventFunctionNodes(
      editorState,
    )
    |> Js.Array.map(node => {
         let {eventFunctionData, name}: NodeAssetType.scriptEventFunctionNodeData =
           ScriptEventFunctionNodeAssetService.getNodeData(node);

         (name, eventFunctionData);
       })
    |> ImmutableHashMapService.fromArray;

  /* |> WonderCommonlib.SparseMapType.arrayNotNullableToArrayNullable; */

  let _buildScriptAttributeAssetHashMap = editorState =>
    ScriptAttributeNodeAssetEditorService.findAllScriptAttributeNodes(
      editorState,
    )
    |> Js.Array.map(node => {
         let {attribute, name}: NodeAssetType.scriptAttributeNodeData =
           ScriptAttributeNodeAssetService.getNodeData(node);

         (name, attribute);
       })
    /* |> WonderCommonlib.SparseMapType.arrayNotNullableToArrayNullable; */
    |> ImmutableHashMapService.fromArray;

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
      (
        _buildScriptEventFunctionAssetHashMap(editorState),
        _buildScriptAttributeAssetHashMap(editorState),
      ),
    );
  };

  let extractAndRelateAssets =
      (
        allGameObjects,
        basicSourceTextureImageUint8ArrayDataMap,
        (editorState, engineState),
      ) => {
    let (
      defaultMaterialData,
      basicMaterialMap,
      lightMaterialMap,
      basicMaterialDataMap,
      lightMaterialDataMap,
      textureAssetDataMap,
      (scriptEventFunctionAssetHashMap, scriptAttributeAssetHashMap),
    ) =
      _prepareData(editorState, engineState);

    let (
      _,
      _,
      (
        extractedMaterialAssetDataArr,
        extractedTextureAssetDataArr,
        extractedScriptEventFunctionAssetEntriesArr,
        extractedScriptAttributeAssetEntriesArr,
      ),
      (editorState, engineState),
    ) =
      allGameObjects
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (.
             (
               (replacedTargetMaterialMap, replacedTargetTextureMap),
               (hasExtractedMaterialAssetMap, hasExtractedTextureAssetMap),
               (
                 extractedMaterialAssetDataArr,
                 extractedTextureAssetDataArr,
                 extractedScriptEventFunctionAssetEntriesArr,
                 extractedScriptAttributeAssetEntriesArr,
               ),
               (editorState, engineState),
             ),
             gameObject,
           ) => {
             let (extractedScriptEventFunctionAssetEntriesArr, engineState) =
               _extractAndRelateScriptEventFunctionAssets(
                 gameObject,
                 scriptEventFunctionAssetHashMap,
                 extractedScriptEventFunctionAssetEntriesArr,
                 engineState,
               );

             let (extractedScriptAttributeAssetEntriesArr, engineState) =
               _extractAndRelateScriptAttributeAssets(
                 gameObject,
                 scriptAttributeAssetHashMap,
                 extractedScriptAttributeAssetEntriesArr,
                 engineState,
               );

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
                   basicSourceTextureImageUint8ArrayDataMap,
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
                     basicSourceTextureImageUint8ArrayDataMap,
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
                     extractedScriptEventFunctionAssetEntriesArr,
                     extractedScriptAttributeAssetEntriesArr,
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
                   extractedScriptEventFunctionAssetEntriesArr,
                   extractedScriptAttributeAssetEntriesArr,
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
             (
               WonderCommonlib.ArrayService.createEmpty(),
               WonderCommonlib.ArrayService.createEmpty(),
               WonderCommonlib.ArrayService.createEmpty(),
               WonderCommonlib.ArrayService.createEmpty(),
             ),
             (editorState, engineState),
           ),
         );

    (
      (
        extractedMaterialAssetDataArr,
        extractedTextureAssetDataArr,
        extractedScriptEventFunctionAssetEntriesArr,
        extractedScriptAttributeAssetEntriesArr,
      ),
      (editorState, engineState),
    );
  };

  let extractCubemapAssets = skyboxCubemapOpt =>
    switch (skyboxCubemapOpt) {
    | None => [||]
    | Some(skyboxCubemap) => [|skyboxCubemap|]
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

  let _createMateiralNodeAndSnapshot =
      (folderNode, (material, materialName), editorState) => {
    let (editorState, newNodeId) =
      IdAssetEditorService.generateNodeId(editorState);
    let (editorState, newImageDataIndex) =
      IndexAssetEditorService.generateImageDataMapIndex(editorState);

    editorState
    |> MaterialNodeAssetEditorService.addMaterialNodeToAssetTree(
         folderNode,
         MaterialNodeAssetService.buildNode(
           ~nodeId=newNodeId,
           ~type_=MaterialDataAssetType.LightMaterial,
           ~materialComponent=material,
           ~snapshotImageDataIndex=newImageDataIndex,
         ),
       )
    |> ImageDataMapAssetEditorService.setData(
         newImageDataIndex,
         ImageDataMapAssetService.buildData(
           ~base64=None,
           ~uint8Array=None,
           ~name=materialName,
           ~blobObjectURL=None,
           ~mimeType=ImageUtils.getDefaultMimeType(),
           (),
         ),
       )
    |> ImgCanvasUtils.clipTargetCanvasSnapshotAndSetToImageDataMapByMaterialNodeId(
         DomHelper.getElementById("inspector-canvas"),
         DomHelper.getElementById("img-canvas"),
         newNodeId,
       );
  };

  let _iterateMaterialArrayBuildMaterialNodes =
      (
        extractedMaterialAssetDataArr,
        folderNode,
        (editorState, engineState, inspectorEngineState),
      ) =>
    extractedMaterialAssetDataArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (editorState, engineState, inspectorEngineState),
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

           let (editorState, (inspectorEngineState, _)) =
             (editorState, inspectorEngineState)
             |> InspectorCanvasUtils.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory
             |> MaterialInspectorEngineUtils.createMaterialSphereIntoInspectorCanvas(
                  MaterialDataAssetType.LightMaterial,
                  material,
                  editorState,
                  engineState,
                );

           let inspectorEngineState =
             inspectorEngineState
             |> InspectorCanvasUtils.restoreArcballCameraControllerAngle
             |> StateLogicService.renderInspectorEngineStateAndReturnState;

           let editorState =
             _createMateiralNodeAndSnapshot(
               folderNode,
               (material, materialName),
               editorState,
             );

           (editorState, engineState, inspectorEngineState);
         },
         (editorState, engineState, inspectorEngineState),
       );

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

        let (editorState, engineState, inspectorEngineState) =
          _iterateMaterialArrayBuildMaterialNodes(
            extractedMaterialAssetDataArr,
            folderNode,
            (
              editorState,
              engineState,
              StateInspectorEngineService.unsafeGetState(),
            ),
          );

        (editorState, inspectorEngineState)
        |> InspectorCanvasUtils.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory
        |> StateInspectorEngineService.setState;

        (editorState, engineState);
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
                 ImageDataMapAssetEditorService.addImageDataIfUint8ArrayNotExist(
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

  let _addCubemapNodeToAssetTree =
      (
        extractedCubemapAssetArr,
        selectedFolderNodeInAssetTree,
        (editorState, engineState),
      ) =>
    extractedCubemapAssetArr |> Js.Array.length === 0 ?
      (editorState, engineState) :
      {
        let folderName = "Cubemaps";

        let (editorState, folderNode) =
          _buildFolderNode(
            folderName,
            selectedFolderNodeInAssetTree,
            (editorState, engineState),
          );

        extractedCubemapAssetArr
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (. (editorState, engineState), cubemap) => {
               let cubemapName =
                 engineState
                 |> OperateTreeAssetLogicService.getUniqueNodeName(
                      OperateCubemapLogicService.getName(
                        ~texture=cubemap,
                        ~engineState,
                      ),
                      folderNode,
                    );

               let engineState =
                 engineState
                 |> CubemapTextureEngineService.setCubemapTextureName(
                      cubemapName,
                      cubemap,
                    )
                 |> CubemapTextureEngineService.initTexture(cubemap);

               let (editorState, newNodeId) =
                 IdAssetEditorService.generateNodeId(editorState);

               let editorState =
                 CubemapNodeAssetEditorService.addCubemapNodeToAssetTree(
                   folderNode,
                   CubemapNodeAssetService.buildNode(
                     ~nodeId=newNodeId,
                     ~textureComponent=cubemap,
                   ),
                   editorState,
                 );

               (editorState, engineState);
             },
             (editorState, engineState),
           );
      };

  let _addScriptEventFunctionNodeToAssetTree =
      (
        extractedScriptEventFunctionAssetEntriesArr,
        selectedFolderNodeInAssetTree,
        (editorState, engineState),
      ) =>
    extractedScriptEventFunctionAssetEntriesArr |> Js.Array.length === 0 ?
      (editorState, engineState) :
      {
        let folderName = "ScriptEventFunctions";

        let (editorState, folderNode) =
          _buildFolderNode(
            folderName,
            selectedFolderNodeInAssetTree,
            (editorState, engineState),
          );

        extractedScriptEventFunctionAssetEntriesArr
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (. (editorState, engineState), (name, eventFunctionData)) => {
               let (editorState, nodeId) =
                 IdAssetEditorService.generateNodeId(editorState);

               let editorState =
                 ScriptEventFunctionNodeAssetEditorService.addScriptEventFunctionNodeToAssetTree(
                   folderNode,
                   ScriptEventFunctionNodeAssetService.buildNode(
                     ~nodeId,
                     ~name,
                     ~eventFunctionData,
                   ),
                   editorState,
                 );

               (editorState, engineState);
             },
             (editorState, engineState),
           );
      };

  let _addScriptAttributeNodeToAssetTree =
      (
        extractedScriptAttributeAssetEntriesArr,
        selectedFolderNodeInAssetTree,
        (editorState, engineState),
      ) =>
    extractedScriptAttributeAssetEntriesArr |> Js.Array.length === 0 ?
      (editorState, engineState) :
      {
        let folderName = "ScriptAttributes";

        let (editorState, folderNode) =
          _buildFolderNode(
            folderName,
            selectedFolderNodeInAssetTree,
            (editorState, engineState),
          );

        extractedScriptAttributeAssetEntriesArr
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (. (editorState, engineState), (name, attribute)) => {
               let (editorState, nodeId) =
                 IdAssetEditorService.generateNodeId(editorState);

               let editorState =
                 ScriptAttributeNodeAssetEditorService.addScriptAttributeNodeToAssetTree(
                   folderNode,
                   ScriptAttributeNodeAssetService.buildNode(
                     ~nodeId,
                     ~name,
                     ~attribute,
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
        extractedCubemapAssetArr,
        extractedScriptEventFunctionAssetEntriesArr,
        extractedScriptAttributeAssetEntriesArr,
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
       )
    |> _addCubemapNodeToAssetTree(
         extractedCubemapAssetArr,
         selectedFolderNodeInAssetTree,
       )
    |> _addScriptEventFunctionNodeToAssetTree(
         extractedScriptEventFunctionAssetEntriesArr,
         selectedFolderNodeInAssetTree,
       )
    |> _addScriptAttributeNodeToAssetTree(
         extractedScriptAttributeAssetEntriesArr,
         selectedFolderNodeInAssetTree,
       );
  };
};