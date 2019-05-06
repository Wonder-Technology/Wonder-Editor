type state = {
  isShowGenerateSingleRABModal: bool,
  isShowGenerateSingleSABModal: bool,
};

type action =
  | ShowGenerateSingleRABModal
  | HideGenerateSingleRABModal
  | ShowGenerateSingleSABModal
  | HideGenerateSingleSABModal;

module Method = {
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
        onClick={_e => send(ShowGenerateSingleSABModal)}>
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
};

let component = ReasonReact.reducerComponent("HeaderAssetBundle");

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
        <HeaderAssetBundleGenerateSingleRAB
          selectTreeForGenerateSingleRAB={
            Method.buildSelectTreeForGenerateSingleRAB
            |> StateLogicService.getStateToGetData
          }
          closeFunc={() => send(HideGenerateSingleRABModal)}
          submitFunc={() => send(HideGenerateSingleRABModal)}
        /> :
        ReasonReact.null
    }
    {
      state.isShowGenerateSingleSABModal ?
        <HeaderAssetBundleGenerateSingleSAB
          closeFunc={() => send(HideGenerateSingleSABModal)}
          submitFunc={() => send(HideGenerateSingleSABModal)}
        /> :
        ReasonReact.null
    }
  </div>;
};

let reducer = (action, state) =>
  switch (action) {
  | ShowGenerateSingleRABModal =>
    ReasonReact.Update({...state, isShowGenerateSingleRABModal: true})
  | HideGenerateSingleRABModal =>
    ReasonReact.Update({...state, isShowGenerateSingleRABModal: false})
  | ShowGenerateSingleSABModal =>
    ReasonReact.Update({...state, isShowGenerateSingleSABModal: true})
  | HideGenerateSingleSABModal =>
    ReasonReact.Update({...state, isShowGenerateSingleSABModal: false})
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
    isShowGenerateSingleSABModal: false,
  },
  reducer,
  render: self =>
    render(
      (uiState, dispatchFunc),
      (isAssetBundleNav, toggleShowNavFunc, hoverNavFunc),
      self,
    ),
};