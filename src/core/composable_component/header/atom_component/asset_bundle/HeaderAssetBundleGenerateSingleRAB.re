type state = {selectTreeForGenerateSingleRAB: SelectTreeType.tree};

type action =
  | HideGenerateSingleRABModal
  | UpdateSelectTreeForGenerateSingleRAB(SelectTreeType.tree);

module Method = {
  let _setSelectForSelectTree = (tree, isSelect, node) => {
    open SelectTreeType;

    let rec _toggle = (isSelect, node, tree) =>
      switch (node) {
      | FolderNode(nodeId, nodeData, children) =>
        let tree =
          FolderNodeSelectTreeUILocalService.setNodeData(
            nodeId,
            FolderNodeSelectTreeService.setIsSelect(isSelect, nodeData),
            children,
            tree,
          );

        children
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (. tree, node) => _toggle(isSelect, node, tree),
             tree,
           );
      | ValueNode(nodeId, nodeData) =>
        ValueNodeSelectTreeUILocalService.setNodeData(
          nodeId,
          ValueNodeSelectTreeService.setIsSelect(isSelect, nodeData),
          tree,
        )
      };

    switch (node) {
    | FolderNode(_, nodeData, _) => _toggle(isSelect, node, tree)
    | ValueNode(nodeId, nodeData) =>
      ValueNodeSelectTreeUILocalService.setNodeData(
        nodeId,
        ValueNodeSelectTreeService.setIsSelect(isSelect, nodeData),
        tree,
      )
    };
  };

  let _toggleSelect = (tree, send, isSelect, node) => {
    open SelectTreeType;

    let tree = _setSelectForSelectTree(tree, isSelect, node);

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
            let {imageDataIndex}: HeaderAssetBundleType.materialData =
              value |> HeaderAssetBundleType.convertValueToMaterialData;

            ImageDataMapUtils.getImgSrc(imageDataIndex, editorState)->Some;
          /* TODO add geometry image */
          | "geometry" => Some("./public/img/wdb.png")
          | "scriptEventFunction" =>
            Some("./public/img/scriptEventFunction.png")
          | "scriptAttribute" => Some("./public/img/scriptAttribute.png")
          | "texture" =>
            let {imageDataIndex}: HeaderAssetBundleType.textureData =
              value |> HeaderAssetBundleType.convertValueToTextureData;

            ImageDataMapUtils.getImgSrc(imageDataIndex, editorState)->Some;
          | _ => None
          }
      }
    />;

  let _getMaterialComponentFromMaterialData =
      (materialData: HeaderAssetBundleType.materialData) =>
    materialData.materialComponent;

  let _addLightMaterialContainedTextureData =
      (lightMaterials, textures, (editorState, engineState)) =>
    lightMaterials
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. textures, lightMaterialComponent) =>
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
             | None => textures
             | Some(textureNodeData) =>
               textures
               |> ArrayService.push(
                    {
                      textureComponent: textureNodeData.textureComponent,
                      imageDataIndex: textureNodeData.imageDataIndex,
                    }: HeaderAssetBundleType.textureData,
                  )
             } :
             textures,
         textures,
       );

  let _generateSingleRABResourceData =
      (selectTreeForGenerateSingleRAB, (editorState, engineState)) => {
    let (
      basicMaterials,
      lightMaterials,
      textures,
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
        ),
        ~valueNodeFunc=
          (
            (
              basicMaterials,
              lightMaterials,
              textures,
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
                | "texture" => (
                    basicMaterials,
                    lightMaterials,
                    textures
                    |> ArrayService.push(
                         value
                         |> HeaderAssetBundleType.convertValueToTextureData,
                       ),
                    geometrys,
                    scriptEventFunctionDataArr,
                    scriptAttributeDataArr,
                  )
                | "basicMaterial" => (
                    basicMaterials
                    |> ArrayService.push(
                         value
                         |> HeaderAssetBundleType.convertValueToMaterialData
                         |> _getMaterialComponentFromMaterialData,
                       ),
                    lightMaterials,
                    textures,
                    geometrys,
                    scriptEventFunctionDataArr,
                    scriptAttributeDataArr,
                  )
                | "lightMaterial" => (
                    basicMaterials,
                    lightMaterials
                    |> ArrayService.push(
                         value
                         |> HeaderAssetBundleType.convertValueToMaterialData
                         |> _getMaterialComponentFromMaterialData,
                       ),
                    textures,
                    geometrys,
                    scriptEventFunctionDataArr,
                    scriptAttributeDataArr,
                  )
                | "texture" => (
                    basicMaterials,
                    lightMaterials,
                    textures
                    |> ArrayService.push(
                         value
                         |> HeaderAssetBundleType.convertValueToTextureData,
                       ),
                    geometrys,
                    scriptEventFunctionDataArr,
                    scriptAttributeDataArr,
                  )
                | "scriptEventFunction" => (
                    basicMaterials,
                    lightMaterials,
                    textures,
                    geometrys,
                    scriptEventFunctionDataArr
                    |> ArrayService.push(
                         value
                         |> HeaderAssetBundleType.convertValueToScriptEventFunctionData,
                       ),
                    scriptAttributeDataArr,
                  )
                | "scriptAttribute" => (
                    basicMaterials,
                    lightMaterials,
                    textures,
                    geometrys,
                    scriptEventFunctionDataArr,
                    scriptAttributeDataArr
                    |> ArrayService.push(
                         value
                         |> HeaderAssetBundleType.convertValueToScriptAttributeData,
                       ),
                  )
                | "geometry" => (
                    basicMaterials,
                    lightMaterials,
                    textures,
                    geometrys
                    |> ArrayService.push(
                         value
                         |> HeaderAssetBundleType.convertValueToGeometryComponent,
                       ),
                    scriptEventFunctionDataArr,
                    scriptAttributeDataArr,
                  )
                };
              } :
              (
                basicMaterials,
                lightMaterials,
                textures,
                geometrys,
                scriptEventFunctionDataArr,
                scriptAttributeDataArr,
              ),
        ~folderNodeFunc=(acc, nodeId, nodeData, children) => acc,
        (),
      );

    let textures =
      _addLightMaterialContainedTextureData(
        lightMaterials,
        textures,
        (editorState, engineState),
      );

    let imageDataMap =
      ImageDataMapAssetEditorService.getMap(editorState)
      |> WonderCommonlib.ImmutableSparseMapService.mapValid(
           (. imageData: ImageDataType.imageData) =>
           (
             {
               let imageName = imageData.name;

               {
                 uint8Array:
                   ImageDataAssetService.getUint8Array(imageData, ()
                     /* ImageDataAssetService.getBase64ForWhiteImage()
                        |> BufferUtils.convertBase64ToUint8Array */
                     =>
                       WonderLog.Log.fatal(
                         WonderLog.Log.buildFatalMessage(
                           ~title="_generateSingleRABResourceData",
                           ~description=
                             {j|image(whose name is $imageName) should has uint8Array or base64 data|j},
                           ~reason="",
                           ~solution={j||j},
                           ~params={j||j},
                         ),
                       )
                     ),
                 name: imageName,
                 mimeType: imageData.mimeType,
               };
             }: HeaderAssetBundleType.imageData
           )
         );

    (
      basicMaterials |> WonderCommonlib.ArrayService.removeDuplicateItems,
      lightMaterials |> WonderCommonlib.ArrayService.removeDuplicateItems,
      textures
      |> ArrayService.removeDuplicateItems(
           (. {textureComponent}: HeaderAssetBundleType.textureData) =>
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
      imageDataMap,
    );
  };

  let generateAndDownloadSingleRAB =
      (selectTreeForGenerateSingleRAB, baseName, (editorState, engineState)) => {
    let (
      basicMaterials,
      lightMaterials,
      textures,
      geometrys,
      scriptEventFunctionDataArr,
      scriptAttributeDataArr,
      imageDataMap,
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
          textures,
          geometrys,
          scriptEventFunctionDataArr,
          scriptAttributeDataArr,
          imageDataMap,
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

  Method.renderGenerateSingleRABModal(
    languageType,
    state.selectTreeForGenerateSingleRAB,
    send,
    (closeFunc, submitFunc),
  );
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