type state = {
  isShowGenerateSingleRABModal: bool,
  selectTreeForGenerateSingleRAB: option(SelectTreeType.tree),
  isShowGenerateSingleSABModal: bool,
};

type action =
  | ShowGenerateSingleRABModal
  | HideGenerateSingleRABModal
  | UpdateSelectTreeForGenerateSingleRAB(SelectTreeType.tree)
  | ShowGenerateSingleSABModal
  | HideGenerateSingleSABModal;

module Method = {
  let generateSingleSAB = ((editorState, engineState)) =>
    GenerateAssetBundleEngineService.generateSingleSAB(
      SceneEngineService.getSceneGameObject(engineState),
      Uint8ArrayAssetEditorService.buildImageUint8ArrayMap(editorState),
      engineState,
    );

  let downloadAB = (name, ab) => HeaderExportUtils.download(ab, name, "");

  let buildAssetBundleComponentSelectNav = (send, languageType) =>
    <div className="item-content item-help">
      <div
        className="content-section"
        onClick={_e => send(ShowGenerateSingleRABModal)}>
        <span className="section-header">
          {
            DomHelper.textEl(
              LanguageUtils.getHeaderLanguageDataByType(
                "generate-single-rab",
                languageType,
              ),
            )
          }
        </span>
      </div>
      <div
        className="content-section"
        onClick={
          _e =>
            /* generateSingleSAB |> StateLogicService.getStateToGetData */
            send(ShowGenerateSingleSABModal)
        }>
        <span className="section-header">
          {
            DomHelper.textEl(
              LanguageUtils.getHeaderLanguageDataByType(
                "generate-single-sab",
                languageType,
              ),
            )
          }
        </span>
      </div>
    </div>;

  let _unsafeGetSelectTreeNodeIdFromFolderTreeMap =
      (assetTreeNode, folderTreeMap) =>
    folderTreeMap
    |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
         NodeAssetService.getNodeId(~node=assetTreeNode),
       );

  let _setToFolderTreeMap = (assetTreeNode, selectTreeNode, folderTreeMap) =>
    folderTreeMap
    |> WonderCommonlib.ImmutableSparseMapService.set(
         NodeAssetService.getNodeId(~node=assetTreeNode),
         NodeSelectTreeService.getNodeId(selectTreeNode),
       );

  let _handleFoldAssetNode =
      (
        parentFolderNode,
        (currentSelectTreeNodeId, folderTreeMap, selectTree),
        (assetNode, type_, value),
        engineState,
      ) => {
    let newNodeId =
      IdSelectTreeService.generateNodeId(currentSelectTreeNodeId);

    let selectTree =
      selectTree
      |> OperateTreeSelectTreeService.insertNode(
           _unsafeGetSelectTreeNodeIdFromFolderTreeMap(
             parentFolderNode,
             folderTreeMap,
           ),
           ValueNodeSelectTreeService.buildNode(
             ~nodeId=newNodeId,
             ~name=
               NodeNameAssetLogicService.getNodeName(assetNode, engineState),
             ~isSelect=false,
             ~type_,
             ~value,
           ),
         );

    (newNodeId, folderTreeMap, selectTree);
  };

  let _getGeometryName = (geometry, engineState) =>
    GeometryEngineService.getGeometryName(geometry, engineState)
    |> Js.Option.getWithDefault({j|geometry_$geometry|j});

  let _buildGeometryFolderChildren = (assetNode, folderNodeId, engineState) =>
    HierarchyGameObjectEngineService.getAllGameObjects(
      WDBNodeAssetService.getWDBGameObject(assetNode),
      engineState,
    )
    |> Js.Array.filter(gameObject =>
         GameObjectComponentEngineService.hasGeometryComponent(
           gameObject,
           engineState,
         )
       )
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (newNodeId, childNodeArr), gameObject) => {
           let geometry =
             GameObjectComponentEngineService.unsafeGetGeometryComponent(
               gameObject,
               engineState,
             );

           let newNodeId = IdSelectTreeService.generateNodeId(newNodeId);

           let childNodeArr =
             childNodeArr
             |> ArrayService.push(
                  ValueNodeSelectTreeService.buildNode(
                    ~nodeId=newNodeId,
                    ~name=_getGeometryName(geometry, engineState),
                    ~isSelect=false,
                    ~type_="geometry",
                    ~value=
                      geometry
                      |> HeaderAssetBundleType.convertGeometryComponentToValue,
                  ),
                );

           (newNodeId, childNodeArr);
         },
         (folderNodeId, WonderCommonlib.ArrayService.createEmpty()),
       );

  let _buildWDBGeometryFolderName = wdbAssetNodeName => {j|$(wdbAssetNodeName)_Geometrys|j};

  let buildSelectTreeForGenerateSingleRAB = ((editorState, engineState)) => {
    open HeaderAssetBundleType;

    let initNodeId = 0;
    let rootNode =
      FolderNodeSelectTreeService.buildNode(
        ~nodeId=initNodeId,
        ~name=RootTreeAssetService.getAssetTreeRootName(),
        ~isSelect=false,
        ~children=[||],
        (),
      );
    let selectTree = rootNode;

    let (_, _, selectTree) =
      IterateTreeAssetService.foldWithParentFolderNodeWithoutRootNode(
        ~acc=(
          initNodeId,
          _setToFolderTreeMap(
            RootTreeAssetEditorService.getRootNode(editorState),
            rootNode,
            WonderCommonlib.ImmutableSparseMapService.createEmpty(),
          ),
          selectTree,
        ),
        ~tree=TreeAssetEditorService.unsafeGetTree(editorState),
        ~folderNodeFunc=
          (
            parentFolderNode,
            (currentSelectTreeNodeId, folderTreeMap, selectTree),
            nodeId,
            nodeData,
            children,
          ) => {
            let newNodeId =
              IdSelectTreeService.generateNodeId(currentSelectTreeNodeId);

            let newSelectTreeFolderNode =
              FolderNodeSelectTreeService.buildNode(
                ~nodeId=newNodeId,
                ~name=FolderNodeAssetService.getNodeName(nodeData),
                ~isSelect=false,
                ~children=[||],
                (),
              );

            let selectTree =
              selectTree
              |> OperateTreeSelectTreeService.insertNode(
                   _unsafeGetSelectTreeNodeIdFromFolderTreeMap(
                     parentFolderNode,
                     folderTreeMap,
                   ),
                   newSelectTreeFolderNode,
                 );

            (
              newNodeId,
              folderTreeMap
              |> _setToFolderTreeMap(
                   FolderNodeAssetService.buildNodeByNodeData(
                     ~nodeId,
                     ~nodeData,
                     ~children,
                   ),
                   newSelectTreeFolderNode,
                 ),
              selectTree,
            );
          },
        ~textureNodeFunc=
          (
            parentFolderNode,
            (currentSelectTreeNodeId, folderTreeMap, selectTree),
            nodeId,
            nodeData,
          ) => {
            let assetNode =
              TextureNodeAssetService.buildNodeByNodeData(~nodeId, ~nodeData);

            _handleFoldAssetNode(
              parentFolderNode,
              (currentSelectTreeNodeId, folderTreeMap, selectTree),
              (
                assetNode,
                "texture",
                (
                  {
                    textureComponent:
                      TextureNodeAssetService.getTextureComponent(assetNode),
                    imageDataIndex:
                      TextureNodeAssetService.getImageDataIndex(assetNode),
                  }: textureData
                )
                |> convertTextureDataToValue,
              ),
              engineState,
            );
          },
        ~materialNodeFunc=
          (
            parentFolderNode,
            (currentSelectTreeNodeId, folderTreeMap, selectTree),
            nodeId,
            nodeData,
          ) => {
            let assetNode =
              MaterialNodeAssetService.buildNodeByNodeData(
                ~nodeId,
                ~nodeData,
              );

            _handleFoldAssetNode(
              parentFolderNode,
              (currentSelectTreeNodeId, folderTreeMap, selectTree),
              (
                assetNode,
                switch (MaterialNodeAssetService.getMaterialType(assetNode)) {
                | MaterialDataAssetType.BasicMaterial => "basicMaterial"
                | MaterialDataAssetType.LightMaterial => "lightMaterial"
                },
                (
                  {
                    materialComponent:
                      MaterialNodeAssetService.getMaterialComponent(
                        assetNode,
                      ),
                    imageDataIndex:
                      MaterialNodeAssetService.getImageDataIndex(assetNode),
                  }: materialData
                )
                |> convertMaterialDataToValue,
              ),
              engineState,
            );
          },
        ~scriptEventFunctionNodeFunc=
          (
            parentFolderNode,
            (currentSelectTreeNodeId, folderTreeMap, selectTree),
            nodeId,
            nodeData,
          ) => {
            let assetNode =
              ScriptEventFunctionNodeAssetService.buildNodeByNodeData(
                ~nodeId,
                ~nodeData,
              );

            _handleFoldAssetNode(
              parentFolderNode,
              (currentSelectTreeNodeId, folderTreeMap, selectTree),
              (
                assetNode,
                "scriptEventFunction",
                (
                  {
                    name:
                      ScriptEventFunctionNodeAssetService.getNodeName(
                        assetNode,
                      ),
                    eventFunctionData:
                      ScriptEventFunctionNodeAssetService.getEventFunctionData(
                        assetNode,
                      ),
                  }: scriptEventFunctionData
                )
                |> convertScriptEventFunctionDataToValue,
              ),
              engineState,
            );
          },
        ~scriptAttributeNodeFunc=
          (
            parentFolderNode,
            (currentSelectTreeNodeId, folderTreeMap, selectTree),
            nodeId,
            nodeData,
          ) => {
            let assetNode =
              ScriptAttributeNodeAssetService.buildNodeByNodeData(
                ~nodeId,
                ~nodeData,
              );

            _handleFoldAssetNode(
              parentFolderNode,
              (currentSelectTreeNodeId, folderTreeMap, selectTree),
              (
                assetNode,
                "scriptAttribute",
                (
                  {
                    name:
                      ScriptAttributeNodeAssetService.getNodeName(assetNode),
                    attribute:
                      ScriptAttributeNodeAssetService.getAttribute(assetNode),
                  }: scriptAttributeData
                )
                |> convertScriptAttributeDataToValue,
              ),
              engineState,
            );
          },
        ~wdbNodeFunc=
          (
            parentFolderNode,
            (currentSelectTreeNodeId, folderTreeMap, selectTree),
            nodeId,
            nodeData,
          ) => {
            let assetNode =
              WDBNodeAssetService.buildNodeByNodeData(~nodeId, ~nodeData);

            let assetNodeName =
              NodeNameAssetLogicService.getNodeName(assetNode, engineState);

            let folderNodeId =
              IdSelectTreeService.generateNodeId(currentSelectTreeNodeId);

            let (newNodeId, children) =
              _buildGeometryFolderChildren(
                assetNode,
                folderNodeId,
                engineState,
              );

            let selectTree =
              selectTree
              |> OperateTreeSelectTreeService.insertNode(
                   _unsafeGetSelectTreeNodeIdFromFolderTreeMap(
                     parentFolderNode,
                     folderTreeMap,
                   ),
                   FolderNodeSelectTreeService.buildNode(
                     ~nodeId=folderNodeId,
                     ~name=_buildWDBGeometryFolderName(assetNodeName),
                     ~isSelect=false,
                     ~children,
                     (),
                   ),
                 );

            (newNodeId, folderTreeMap, selectTree);
          },
        (),
      );

    selectTree;
  };

  let updateSelectTreeForGenerateSingleRAB = ((send, state), selectTree) =>
    send(
      UpdateSelectTreeForGenerateSingleRAB(selectTree),
      /* ReasonReact.null; */
    );

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
      (selectTreeForGenerateSingleRAB, (editorState, engineState)) => {
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

    /* TODO feat: name should be edit */
    downloadAB("WonderSingleRAB.rab", rab);
  };

  let hideGenerateSingleRABModal = send => send(HideGenerateSingleRABModal);

  let renderGenerateSingleRABModal =
      (languageType, selectTreeForGenerateSingleRAB, send) =>
    <Modal
      title={
        LanguageUtils.getHeaderLanguageDataByType(
          "generate-single-rab",
          languageType,
        )
      }
      closeFunc={() => hideGenerateSingleRABModal(send)}
      submitFunc={
        () => {
          generateAndDownloadSingleRAB(selectTreeForGenerateSingleRAB)
          |> StateLogicService.getStateToGetData;

          hideGenerateSingleRABModal(send);
        }
      }
      content=[|
        buildGenerateSingleRABUI(send, selectTreeForGenerateSingleRAB),
      |]
    />;
};

let component = ReasonReact.reducerComponent("HeaderAssetBundle");

let reducer = (action, state) =>
  switch (action) {
  | ShowGenerateSingleRABModal =>
    ReasonReact.Update({...state, isShowGenerateSingleRABModal: true})

  | HideGenerateSingleRABModal =>
    ReasonReact.Update({
      ...state,
      isShowGenerateSingleRABModal: false,
      selectTreeForGenerateSingleRAB: None,
    })
  | UpdateSelectTreeForGenerateSingleRAB(selectTree) =>
    ReasonReact.Update({
      ...state,
      selectTreeForGenerateSingleRAB: Some(selectTree),
    })
  | ShowGenerateSingleSABModal =>
    ReasonReact.Update({...state, isShowGenerateSingleSABModal: true})
  | HideGenerateSingleSABModal =>
    ReasonReact.Update({...state, isShowGenerateSingleSABModal: false})
  };

let render =
    (
      _,
      (isAssetBundleNav, toggleShowNavFunc, hoverNavFunc),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) => {
  let className = isAssetBundleNav ? "item-title item-active" : "item-title";
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <div className="header-item">
    <div className="component-item">
      <span
        className
        onClick={e => toggleShowNavFunc()}
        onMouseOver={e => hoverNavFunc()}>
        {
          DomHelper.textEl(
            LanguageUtils.getHeaderLanguageDataByType(
              "header-asset-bundle",
              languageType,
            ),
          )
        }
      </span>
    </div>
    {
      isAssetBundleNav ?
        Method.buildAssetBundleComponentSelectNav(send, languageType) :
        ReasonReact.null
    }
    {
      state.isShowGenerateSingleRABModal ?
        switch (state.selectTreeForGenerateSingleRAB) {
        | None => ReasonReact.null
        | Some(selectTreeForGenerateSingleRAB) =>
          Method.renderGenerateSingleRABModal(
            languageType,
            selectTreeForGenerateSingleRAB,
            send,
          )
        } :
        ReasonReact.null
    }
    {
      state.isShowGenerateSingleSABModal ?
        <SingleInputModal
          title={
            LanguageUtils.getHeaderLanguageDataByType(
              "generate-single-sab",
              languageType,
            )
          }
          defaultValue="WonderSingleSAB"
          closeFunc={() => send(HideGenerateSingleSABModal)}
          submitFunc={
            baseName => {
              Method.generateSingleSAB
              |> StateLogicService.getStateToGetData
              |> Method.downloadAB({j|$(baseName).sab|j});

              send(HideGenerateSingleSABModal);
            }
          }
        /> :
        ReasonReact.null
    }
  </div>;
};

let make =
    (
      ~uiState: AppStore.appState,
      ~dispatchFunc,
      ~isAssetBundleNav,
      ~toggleShowNavFunc,
      ~hoverNavFunc,
      _children,
    ) => {
  ...component,
  initialState: () => {
    isShowGenerateSingleRABModal: false,
    selectTreeForGenerateSingleRAB: None,
    isShowGenerateSingleSABModal: false,
  },
  reducer,
  didUpdate: ({oldSelf, newSelf}) => {
    let state = oldSelf.state;
    let send = oldSelf.send;

    state.isShowGenerateSingleRABModal
    && Js.Option.isNone(state.selectTreeForGenerateSingleRAB) ?
      Method.buildSelectTreeForGenerateSingleRAB
      |> StateLogicService.getStateToGetData
      |> Method.updateSelectTreeForGenerateSingleRAB((send, state)) :
      ();
  },
  render: self =>
    render(
      (uiState, dispatchFunc),
      (isAssetBundleNav, toggleShowNavFunc, hoverNavFunc),
      self,
    ),
};