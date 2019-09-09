open NodeAssetType;

let _disposeClonedGameObjectsComponentType = (clonedGameObjects, editorState) =>
  clonedGameObjects
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. editorState, wdbGameObject) =>
         editorState
         |> InspectorEditorService.removeComponentTypeToMap(
              wdbGameObject,
              InspectorComponentType.Geometry,
            ),
       editorState,
     );

let _getClonedGameObjects = (wdbGameObjects, (editorState, engineState)) =>
  (editorState, engineState)
  |> GeometryAssetLogicService.getGeometryAssetsFromWDBGameObjects(
       wdbGameObjects,
     )
  |> Js.Array.map(geometry =>
       engineState
       |> GeometryEngineService.unsafeGetGeometryGameObjects(geometry)
     )
  |> WonderCommonlib.ArrayService.flatten
  |> ArrayService.exclude(wdbGameObjects);

let _disposeRelatedSkinData = (textureContentIndexOpt, editorState) =>
  switch (textureContentIndexOpt) {
  | Some(textureContentIndex) =>
    switch (
      IMGUICustomImageTypeTextureNodeAssetEditorService.getIdByTextureContentIndex(
        textureContentIndex,
        editorState,
      )
    ) {
    | None => editorState
    | Some(id) =>
      IMGUICustomImageTypeTextureNodeAssetEditorService.removeRelatedSkinDataByCustomImageId(
        id,
        editorState,
      )
    }
  | _ => editorState
  };

let _disposeTextureContentData = (type_, textureContentIndexOpt, editorState) =>
  switch (type_) {
  | NodeAssetType.BasicSource => editorState
  | NodeAssetType.IMGUICustomImage =>
    editorState
    |> _disposeRelatedSkinData(textureContentIndexOpt)
    |> TextureContentTextureNodeAssetEditorService.removeTextureContent(
         textureContentIndexOpt,
       )
  };

let _disposeTextureNodeEditorDataBeforeRemoveNode =
    (
      {imageDataIndex, textureComponent, type_, textureContentIndex}: NodeAssetType.textureNodeData,
      engineState,
      editorState,
    ) => {
  let editorState =
    TextureNodeAssetEditorService.doesAnyTextureUseImage(
      imageDataIndex,
      editorState,
    ) ?
      editorState :
      editorState
      |> BasicSourceTextureImageDataMapAssetEditorService.removeData(
           imageDataIndex,
         );

  editorState
  |> _disposeTextureContentData(type_, textureContentIndex)
  |> SourceTextureCacheInspectorCanvasLogicService.removeCache(
       textureComponent,
       engineState,
     );
};

let _disposeCubemapNodeEditorDataBeforeRemoveNode =
    ({imageDataIndex}: NodeAssetType.cubemapNodeData, editorState) =>
  editorState
  |> CubemapTextureImageDataMapAssetEditorService.removeData(imageDataIndex);

let _disposeMaterialNodeEditorDataBeforeRemoveNode =
    ({snapshotImageDataIndex}: materialNodeData, editorState) =>
  editorState
  |> BasicSourceTextureImageDataMapAssetEditorService.removeData(
       snapshotImageDataIndex,
     );

let _disposeWDBNodeEditorDataBeforeRemoveNode =
    ({wdbGameObject}, (editorState, engineState)) => {
  let wdbGameObjects =
    HierarchyGameObjectEngineService.getAllGameObjects(
      wdbGameObject,
      engineState,
    );

  editorState
  |> _disposeClonedGameObjectsComponentType(
       _getClonedGameObjects(wdbGameObjects, (editorState, engineState)),
     );
};

let _disposeTextureFromAllLightMaterials = (textureComponent, engineState) =>
  LightMaterialEngineService.getAllLightMaterials(engineState)
  |> Js.Array.filter(lightMaterial =>
       LightMaterialEngineService.isDiffuseMap(
         lightMaterial,
         textureComponent,
         engineState,
       )
     )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. engineState, lightMaterial) =>
         OperateTextureLogicService.handleLightMaterialComponentFromHasDiffuseMapToNoMap(
           lightMaterial,
           engineState,
         ),
       engineState,
     )
  |> BasicSourceTextureEngineService.disposeBasicSourceTexture(
       textureComponent,
       false,
     );

let _disposeTextureNodeEngineData =
    (
      {textureComponent, textureContentIndex, type_}: NodeAssetType.textureNodeData,
      editorState,
      engineState,
    ) =>
  engineState
  |> _disposeTextureFromAllLightMaterials(textureComponent)
  |> IMGUIAssetLogicService.removeSettedAssets(
       (type_, textureContentIndex, textureComponent),
       editorState,
       engineState =>
       engineState
     );

let _disposeCubemapFromSceneSkybox = (textureComponent, engineState) =>
  switch (SceneEngineService.getCubemapTexture(engineState)) {
  | Some(skyboxCubemapTexture) when skyboxCubemapTexture === textureComponent =>
    engineState
    |> SceneEngineService.removeCubemapTexture
    |> CubemapTextureEngineService.disposeCubemapTexture(
         textureComponent,
         false,
       )
  | _ => engineState
  };

let _disposeCubemapNodeEngineData =
    ({textureComponent}: NodeAssetType.cubemapNodeData, engineState) =>
  engineState |> _disposeCubemapFromSceneSkybox(textureComponent);

let _disposeMaterialNodeEngineData =
    ({materialComponent, type_}, (editorState, engineState)) => {
  let (defaultMaterial, defaultMaterialType) =
    MaterialDataAssetEditorService.unsafeGetDefaultMaterialDataByType(
      type_,
      editorState,
    );

  InspectorRenderGroupUtils.Dispose.disposeMaterialOrReplaceGameObjectsMaterialsOfTheMaterial(
    ((materialComponent, defaultMaterial), (type_, defaultMaterialType)),
    engineState,
  );
};

let _disposeGeometryAssets = (wdbGameObjects, (editorState, engineState)) =>
  GeometryAssetLogicService.getGeometryAssetsFromWDBGameObjects(
    wdbGameObjects,
    (editorState, engineState),
  )
  |> GeometryEngineService.batchDisposeGeometry(_, engineState);

let _disposeWDBGameObjects = (wdbGameObjects, (editorState, engineState)) =>
  wdbGameObjects
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. engineState, gameObject) =>
         GameObjectEngineService.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial(
           gameObject,
           engineState,
         ),
       engineState,
     );

let _disposeWDBNodeEngineData =
    ({wdbGameObject}, (editorState, engineState)) => {
  let wdbGameObjects =
    HierarchyGameObjectEngineService.getAllGameObjects(
      wdbGameObject,
      engineState,
    );

  let engineState =
    _disposeGeometryAssets(wdbGameObjects, (editorState, engineState));

  (editorState, engineState) |> _disposeWDBGameObjects(wdbGameObjects);
};

let _removeScriptEventFunctionFromScriptComponents =
    ({name}: NodeAssetType.scriptEventFunctionNodeData, engineState) =>
  ScriptEngineService.removeEventFunctionInAllScriptComponents(
    name,
    engineState,
  );

let _removeScriptAttributeFromScriptComponents =
    ({name}: NodeAssetType.scriptAttributeNodeData, engineState) =>
  ScriptEngineService.removeAttributeInAllScriptComponents(name, engineState);

let _disposeNodeEditorAndEngineDataBeforeRemoveNode =
    (node, (editorState, engineState)) =>
  NodeAssetService.handleNode2(
    ~node,
    ~textureNodeFunc=
      (_, nodeData) => {
        let engineState =
          _disposeTextureNodeEngineData(nodeData, editorState, engineState);

        let editorState =
          _disposeTextureNodeEditorDataBeforeRemoveNode(
            nodeData,
            engineState,
            editorState,
          );

        (editorState, engineState);
      },
    ~cubemapNodeFunc=
      (_, nodeData) => (
        _disposeCubemapNodeEditorDataBeforeRemoveNode(nodeData, editorState),
        _disposeCubemapNodeEngineData(nodeData, engineState),
      ),
    ~materialNodeFunc=
      (_, nodeData) => {
        let engineState =
          _disposeMaterialNodeEngineData(
            nodeData,
            (editorState, engineState),
          );

        let editorState =
          _disposeMaterialNodeEditorDataBeforeRemoveNode(
            nodeData,
            editorState,
          );

        (editorState, engineState);
      },
    ~scriptEventFunctionNodeFunc=
      (_, nodeData) => (
        editorState,
        _removeScriptEventFunctionFromScriptComponents(nodeData, engineState),
      ),
    ~scriptAttributeNodeFunc=
      (_, nodeData) => (
        editorState,
        _removeScriptAttributeFromScriptComponents(nodeData, engineState),
      ),
    ~wdbNodeFunc=
      (_, nodeData) => {
        let editorState =
          _disposeWDBNodeEditorDataBeforeRemoveNode(
            nodeData,
            (editorState, engineState),
          );

        let engineState =
          _disposeWDBNodeEngineData(nodeData, (editorState, engineState));

        (editorState, engineState);
      },
    ~assetBundleNodeFunc=(_, _) => (editorState, engineState),
    ~folderNodeFunc=(_, _, _) => (editorState, engineState),
  );

let disposeNode = (node, (editorState, engineState)) => {
  let (editorState, engineState) =
    (editorState, engineState)
    |> _disposeNodeEditorAndEngineDataBeforeRemoveNode(node);

  let editorState =
    editorState |> OperateTreeAssetEditorService.removeNode(node);

  (editorState, engineState);
};

let _disposeTreeEditorAndEngineData = (editorState, engineState) =>
  IterateTreeAssetService.fold(
    ~acc=(editorState, engineState),
    ~tree=TreeAssetEditorService.unsafeGetTree(editorState),
    ~textureNodeFunc=
      ((editorState, engineState), _, nodeData) => (
        editorState,
        _disposeTextureNodeEngineData(nodeData, editorState, engineState),
      ),
    ~cubemapNodeFunc=
      ((editorState, engineState), _, nodeData) => (
        editorState,
        _disposeCubemapNodeEngineData(nodeData, engineState),
      ),
    ~materialNodeFunc=
      ((editorState, engineState), _, nodeData) => (
        editorState,
        _disposeMaterialNodeEngineData(nodeData, (editorState, engineState)),
      ),
    ~wdbNodeFunc=
      ((editorState, engineState), _, nodeData) => {
        let editorState =
          _disposeWDBNodeEditorDataBeforeRemoveNode(
            nodeData,
            (editorState, engineState),
          );

        let engineState =
          _disposeWDBNodeEngineData(nodeData, (editorState, engineState));

        (editorState, engineState);
      },
    ~scriptEventFunctionNodeFunc=
      ((editorState, engineState), _, nodeData) => (
        editorState,
        _removeScriptEventFunctionFromScriptComponents(nodeData, engineState),
      ),
    ~scriptAttributeNodeFunc=
      ((editorState, engineState), _, nodeData) => (
        editorState,
        _removeScriptAttributeFromScriptComponents(nodeData, engineState),
      ),
    ~assetBundleNodeFunc=
      ((editorState, engineState), _, nodeData) => (
        editorState,
        engineState,
      ),
    ~folderNodeFunc=
      ((editorState, engineState), _, _, _) => (editorState, engineState),
    (),
  );

let disposeTree = ((editorState, engineState)) => {
  let (editorState, engineState) =
    _disposeTreeEditorAndEngineData(editorState, engineState);

  (
    editorState
    |> SourceTextureCacheInspectorCanvasEditorService.clearCache
    |> TreeAssetEditorService.clearTree
    |> BasicSourceTextureImageDataMapAssetEditorService.clearMap
    |> IMGUICustomImageTextureContentMapAssetEditorService.clearMap
    |> SelectedFolderNodeIdInAssetTreeAssetEditorService.clearSelectedFolderNodeIdInAssetTree
    |> CurrentNodeIdAssetEditorService.clearCurrentNodeId,
    engineState,
  );
};