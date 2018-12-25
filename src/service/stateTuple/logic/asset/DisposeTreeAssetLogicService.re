open NodeAssetType;

let _removeClonedGameObjectsComponentType = (clonedGameObjects, editorState) =>
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

let _removeEditorData = (node, engineState, editorState) =>
  NodeAssetService.handleNode(
    ~node,
    ~textureNodeFunc=
      (nodeId, {imageDataIndex}) =>
        TextureNodeAssetEditorService.doesAnyTextureUseImage(
          imageDataIndex,
          editorState,
        ) ?
          editorState :
          editorState
          |> ImageDataMapAssetEditorService.removeData(imageDataIndex),
    ~materialNodeFunc=(_, _) => editorState,
    ~wdbNodeFunc=
      (_, {wdbGameObject}) => {
        let wdbGameObjects =
          GameObjectEngineService.getAllGameObjects(
            wdbGameObject,
            engineState,
          );

        editorState
        |> _removeClonedGameObjectsComponentType(
             _getClonedGameObjects(
               wdbGameObjects,
               (editorState, engineState),
             ),
           );
      },
    ~folderNodeFunc=(_, _, _) => editorState,
  );

let _removeTextureFromAllLightMaterials = (textureComponent, engineState) =>
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
     );

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

let _removeEngineData = (node, editorState, engineState) =>
  NodeAssetService.handleNode(
    ~node,
    ~textureNodeFunc=
      (nodeId, {textureComponent}) =>
        engineState |> _removeTextureFromAllLightMaterials(textureComponent),
    ~materialNodeFunc=
      (_, {materialComponent, type_}) => {
        let (defaultMaterial, defaultMaterialType) =
          MaterialDataAssetEditorService.unsafeGetDefaultMaterialDataByType(
            type_,
            editorState,
          );

        InspectorRenderGroupUtils.Dispose.replaceGameObjectsMaterialsOfTheMaterial(
          (
            (materialComponent, defaultMaterial),
            (type_, defaultMaterialType),
          ),
          engineState,
        );
      },
    ~wdbNodeFunc=
      (_, {wdbGameObject}) => {
        let wdbGameObjects =
          GameObjectEngineService.getAllGameObjects(
            wdbGameObject,
            engineState,
          );

        let engineState =
          _disposeGeometryAssets(wdbGameObjects, (editorState, engineState));

        (editorState, engineState) |> _disposeWDBGameObjects(wdbGameObjects);
      },
    ~folderNodeFunc=(_, _, _) => engineState,
  );

let disposeNode = (node, (editorState, engineState)) => {
  let editorState =
    editorState
    |> OperateTreeAssetEditorService.removeNode(node)
    |> _removeEditorData(node, engineState);

  let engineState = engineState |> _removeEngineData(node, editorState);

  (editorState, engineState);
};

let disposeTree = ((editorState, engineState)) => {
  let node = RootTreeAssetEditorService.getRootNode(editorState);
  let editorState = editorState |> _removeEditorData(node, engineState);

  let engineState = engineState |> _removeEngineData(node, editorState);

  (editorState, engineState);

  let (editorState, engineState) =
    disposeNode(
      RootTreeAssetEditorService.getRootNode(editorState),
      (editorState, engineState),
    );

  (
    editorState
    |> TreeAssetEditorService.clearTree
    |> SelectedFolderNodeInAssetTreeAssetEditorService.clearSelectedFolderNodeInAssetTree
    |> CurrentNodeAssetEditorService.clearCurrentNode,
    engineState,
  );
};