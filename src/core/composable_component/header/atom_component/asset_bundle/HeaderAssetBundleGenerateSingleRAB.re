type state = {selectTreeForGenerateSingleRAB: SelectTreeType.tree};

type action =
  | UpdateSelectTreeForGenerateSingleRAB(SelectTreeType.tree);

module Method = {
  let _toggleSelect = (tree, send, isSelect, node) => {
    open SelectTreeType;

    let tree = SelectTreeUtils.setSelectForSelectTree(tree, isSelect, node);

    send(UpdateSelectTreeForGenerateSingleRAB(tree));
  };

  let buildGenerateSingleRABUI = (send, selectTreeForGenerateSingleRAB) =>
    <SelectTree
      key={DomHelper.getRandomKey()}
      tree=selectTreeForGenerateSingleRAB
      toggleSelectFunc={_toggleSelect(selectTreeForGenerateSingleRAB, send)}
      getValueNodeIconFunc={
        (type_, value, editorState) =>
          switch (type_) {
          | "basicMaterial"
          | "lightMaterial" =>
            let {snapshotImageDataIndex}: HeaderAssetBundleType.materialData =
              value |> HeaderAssetBundleType.convertValueToMaterialData;

            ImageDataMapUtils.getImgSrc(snapshotImageDataIndex, editorState)
            ->Some;
          | "geometry" => Some("./public/img/geo.png")
          | "scriptEventFunction" => Some("./public/img/selectJsFunc.png")
          | "scriptAttribute" => Some("./public/img/scriptAttribute.png")
          | "basicSourceTexture" =>
            let {imageDataIndex}: HeaderAssetBundleType.basicSourceTextureData =
              value
              |> HeaderAssetBundleType.convertValueToBasicSourceTextureData;

            ImageDataMapUtils.getImgSrc(imageDataIndex, editorState)->Some;
          | "cubemapTexture" => Some("./public/img/cubemap.png")
          | _ => None
          }
      }
    />;

  let _getMaterialComponentFromMaterialData =
      (materialData: HeaderAssetBundleType.materialData) =>
    materialData.materialComponent;

  let _addLightMaterialContainedTextureData =
      (lightMaterials, basicSourceTextures, (editorState, engineState)) =>
    lightMaterials
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. basicSourceTextures, lightMaterialComponent) =>
           LightMaterialEngineService.hasLightMaterialDiffuseMap(
             lightMaterialComponent,
             engineState,
           ) ?
             switch (
               TextureNodeAssetEditorService.getDataByTextureComponent(
                 LightMaterialEngineService.unsafeGetLightMaterialDiffuseMap(
                   lightMaterialComponent,
                   engineState,
                 ),
                 editorState,
               )
             ) {
             | None => basicSourceTextures
             | Some(textureNodeData) =>
               basicSourceTextures
               |> ArrayService.push(
                    {
                      textureComponent: textureNodeData.textureComponent,
                      imageDataIndex: textureNodeData.imageDataIndex,
                    }: HeaderAssetBundleType.basicSourceTextureData,
                  )
             } :
             basicSourceTextures,
         basicSourceTextures,
       );

  let _addResourceData = (resources, value, convertValueToResourceDataFunc) =>
    resources |> ArrayService.push(value |> convertValueToResourceDataFunc);

  let _convertImageData =
      (imageDataInImageDataMap: ImageDataType.imageData)
      : HeaderAssetBundleType.imageData => {
    let imageName = imageDataInImageDataMap.name;

    {
      uint8Array:
        ImageDataAssetService.getUint8Array(imageDataInImageDataMap, () =>
          WonderLog.Log.fatal(
            WonderLog.Log.buildFatalMessage(
              ~title="_convertImageData",
              ~description=
                {j|image(whose name is $imageName) should has uint8Array or base64 data|j},
              ~reason="",
              ~solution={j||j},
              ~params={j||j},
            ),
          )
        ),
      name: imageName,
      mimeType: imageDataInImageDataMap.mimeType,
    };
  };

  let _generateSingleRABResourceData =
      (selectTreeForGenerateSingleRAB, (editorState, engineState)) => {
    let (
      basicMaterials,
      lightMaterials,
      basicSourceTextures,
      cubemapTextures,
      geometrys,
      scriptEventFunctionDataArr,
      scriptAttributeDataArr,
    ) =
      IterateTreeSelectTreeService.fold(
        ~tree=selectTreeForGenerateSingleRAB,
        ~acc=(
          WonderCommonlib.ArrayService.createEmpty(),
          WonderCommonlib.ArrayService.createEmpty(),
          WonderCommonlib.ArrayService.createEmpty(),
          WonderCommonlib.ArrayService.createEmpty(),
          WonderCommonlib.ArrayService.createEmpty(),
          WonderCommonlib.ArrayService.createEmpty(),
          WonderCommonlib.ArrayService.createEmpty(),
        ),
        ~valueNodeFunc=
          (
            (
              basicMaterials,
              lightMaterials,
              basicSourceTextures,
              cubemapTextures,
              geometrys,
              scriptEventFunctionDataArr,
              scriptAttributeDataArr,
            ),
            nodeId,
            nodeData,
          ) =>
            ValueNodeSelectTreeService.getIsSelect(nodeData) ?
              {
                let value = ValueNodeSelectTreeService.getValue(nodeData);

                switch (ValueNodeSelectTreeService.getType(nodeData)) {
                | "basicMaterial" => (
                    _addResourceData(basicMaterials, value, value =>
                      value
                      |> HeaderAssetBundleType.convertValueToMaterialData
                      |> _getMaterialComponentFromMaterialData
                    ),
                    lightMaterials,
                    basicSourceTextures,
                    cubemapTextures,
                    geometrys,
                    scriptEventFunctionDataArr,
                    scriptAttributeDataArr,
                  )
                | "lightMaterial" => (
                    basicMaterials,
                    _addResourceData(lightMaterials, value, value =>
                      value
                      |> HeaderAssetBundleType.convertValueToMaterialData
                      |> _getMaterialComponentFromMaterialData
                    ),
                    basicSourceTextures,
                    cubemapTextures,
                    geometrys,
                    scriptEventFunctionDataArr,
                    scriptAttributeDataArr,
                  )
                | "basicSourceTexture" => (
                    basicMaterials,
                    lightMaterials,
                    _addResourceData(
                      basicSourceTextures,
                      value,
                      HeaderAssetBundleType.convertValueToBasicSourceTextureData,
                    ),
                    cubemapTextures,
                    geometrys,
                    scriptEventFunctionDataArr,
                    scriptAttributeDataArr,
                  )
                | "cubemapTexture" => (
                    basicMaterials,
                    lightMaterials,
                    basicSourceTextures,
                    _addResourceData(
                      cubemapTextures,
                      value,
                      HeaderAssetBundleType.convertValueToCubemapTextureData,
                    ),
                    geometrys,
                    scriptEventFunctionDataArr,
                    scriptAttributeDataArr,
                  )
                | "scriptEventFunction" => (
                    basicMaterials,
                    lightMaterials,
                    basicSourceTextures,
                    cubemapTextures,
                    geometrys,
                    _addResourceData(
                      scriptEventFunctionDataArr,
                      value,
                      HeaderAssetBundleType.convertValueToScriptEventFunctionData,
                    ),
                    scriptAttributeDataArr,
                  )
                | "scriptAttribute" => (
                    basicMaterials,
                    lightMaterials,
                    basicSourceTextures,
                    cubemapTextures,
                    geometrys,
                    scriptEventFunctionDataArr,
                    _addResourceData(
                      scriptAttributeDataArr,
                      value,
                      HeaderAssetBundleType.convertValueToScriptAttributeData,
                    ),
                  )
                | "geometry" => (
                    basicMaterials,
                    lightMaterials,
                    basicSourceTextures,
                    cubemapTextures,
                    _addResourceData(
                      geometrys,
                      value,
                      HeaderAssetBundleType.convertValueToGeometryComponent,
                    ),
                    scriptEventFunctionDataArr,
                    scriptAttributeDataArr,
                  )
                | _ => (
                    basicMaterials,
                    lightMaterials,
                    basicSourceTextures,
                    cubemapTextures,
                    geometrys,
                    scriptEventFunctionDataArr,
                    scriptAttributeDataArr,
                  )
                };
              } :
              (
                basicMaterials,
                lightMaterials,
                basicSourceTextures,
                cubemapTextures,
                geometrys,
                scriptEventFunctionDataArr,
                scriptAttributeDataArr,
              ),
        ~folderNodeFunc=(acc, nodeId, nodeData, children) => acc,
        (),
      );

    let basicSourceTextures =
      _addLightMaterialContainedTextureData(
        lightMaterials,
        basicSourceTextures,
        (editorState, engineState),
      );

    let basicSourceTextureImageDataMap =
      BasicSourceTextureImageDataMapAssetEditorService.getMap(editorState)
      |> WonderCommonlib.ImmutableSparseMapService.mapValid(
           (. imageData: ImageDataType.basicSourceTextureImageData) =>
           (
             _convertImageData(imageData): HeaderAssetBundleType.basicSourceTextureImageData
           )
         );

    let cubemapTextureImageDataMap =
      CubemapTextureImageDataMapAssetEditorService.getMap(editorState)
      |> WonderCommonlib.ImmutableSparseMapService.mapValid(
           (.
             {
               pxImageData,
               nxImageData,
               pyImageData,
               nyImageData,
               pzImageData,
               nzImageData,
             }: ImageDataType.cubemapTextureImageData,
           ) =>
           (
             {
               pxImageData:
                 pxImageData
                 |> Js.Option.map((. imageData) =>
                      _convertImageData(imageData)
                    ),
               nxImageData:
                 nxImageData
                 |> Js.Option.map((. imageData) =>
                      _convertImageData(imageData)
                    ),
               pyImageData:
                 pyImageData
                 |> Js.Option.map((. imageData) =>
                      _convertImageData(imageData)
                    ),
               nyImageData:
                 nyImageData
                 |> Js.Option.map((. imageData) =>
                      _convertImageData(imageData)
                    ),
               pzImageData:
                 pzImageData
                 |> Js.Option.map((. imageData) =>
                      _convertImageData(imageData)
                    ),
               nzImageData:
                 nzImageData
                 |> Js.Option.map((. imageData) =>
                      _convertImageData(imageData)
                    ),
             }: HeaderAssetBundleType.cubemapTextureImageData
           )
         );

    (
      basicMaterials |> WonderCommonlib.ArrayService.removeDuplicateItems,
      lightMaterials |> WonderCommonlib.ArrayService.removeDuplicateItems,
      basicSourceTextures
      |> ArrayService.removeDuplicateItems(
           (.
             {textureComponent}: HeaderAssetBundleType.basicSourceTextureData,
           ) =>
           textureComponent |> string_of_int
         ),
      cubemapTextures
      |> ArrayService.removeDuplicateItems(
           (. {textureComponent}: HeaderAssetBundleType.cubemapTextureData) =>
           textureComponent |> string_of_int
         ),
      geometrys |> WonderCommonlib.ArrayService.removeDuplicateItems,
      scriptEventFunctionDataArr
      |> ArrayService.removeDuplicateItems(
           (. {name}: HeaderAssetBundleType.scriptEventFunctionData) =>
           name
         ),
      scriptAttributeDataArr
      |> ArrayService.removeDuplicateItems(
           (. {name}: HeaderAssetBundleType.scriptAttributeData) =>
           name
         ),
      basicSourceTextureImageDataMap,
      cubemapTextureImageDataMap,
    );
  };

  let generateAndDownloadSingleRAB =
      (selectTreeForGenerateSingleRAB, baseName, (editorState, engineState)) => {
    let (
      basicMaterials,
      lightMaterials,
      basicSourceTextures,
      cubemapTextures,
      geometrys,
      scriptEventFunctionDataArr,
      scriptAttributeDataArr,
      basicSourceTextureImageDataMap,
      cubemapTextureImageDataMap,
    ) =
      _generateSingleRABResourceData(
        selectTreeForGenerateSingleRAB,
        (editorState, engineState),
      );

    let rab =
      GenerateAssetBundleEngineService.generateSingleRAB(
        GenerateAssetBundleEngineService.buildResourceData(
          basicMaterials,
          lightMaterials,
          basicSourceTextures,
          cubemapTextures,
          geometrys,
          scriptEventFunctionDataArr,
          scriptAttributeDataArr,
          basicSourceTextureImageDataMap,
          cubemapTextureImageDataMap,
        ),
        engineState,
      );

    HeaderAssetBundleUtils.downloadAB({j|$(baseName).rab|j}, rab);
  };

  let renderGenerateSingleRABModal =
      (
        languageType,
        selectTreeForGenerateSingleRAB,
        send,
        (closeFunc, submitFunc),
      ) =>
    <SingleInputModal
      title={
        LanguageUtils.getHeaderLanguageDataByType(
          "generate-single-rab",
          languageType,
        )
      }
      inputText="name"
      defaultValue="WonderSingleRAB"
      closeFunc
      submitFunc={
        baseName => {
          generateAndDownloadSingleRAB(
            selectTreeForGenerateSingleRAB,
            baseName,
          )
          |> StateLogicService.getStateToGetData;

          submitFunc();
        }
      }
      content=[|
        buildGenerateSingleRABUI(send, selectTreeForGenerateSingleRAB),
      |]
    />;
};

let component =
  ReasonReact.reducerComponent("HeaderAssetBundleGenerateSingleRAB");

let reducer = (action, state) =>
  switch (action) {
  | UpdateSelectTreeForGenerateSingleRAB(selectTree) =>
    ReasonReact.Update({...state, selectTreeForGenerateSingleRAB: selectTree})
  };

let render =
    ({state, send}: ReasonReact.self('a, 'b, 'c), (closeFunc, submitFunc)) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article className="wonder-assetBundle-rab" key="wonderAssetBundleRab">
    {
      Method.renderGenerateSingleRABModal(
        languageType,
        state.selectTreeForGenerateSingleRAB,
        send,
        (closeFunc, submitFunc),
      )
    }
  </article>;
};

let make =
    (~selectTreeForGenerateSingleRAB, ~closeFunc, ~submitFunc, _children) => {
  ...component,
  initialState: () => {
    selectTreeForGenerateSingleRAB: selectTreeForGenerateSingleRAB,
  },
  reducer,
  render: self => render(self, (closeFunc, submitFunc)),
};