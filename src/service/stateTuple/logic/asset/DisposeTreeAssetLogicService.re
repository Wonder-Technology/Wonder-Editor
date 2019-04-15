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

let _removeTextureImageDataFromImageDataMap =
    ({imageDataIndex}: textureNodeData, editorState) =>
  TextureNodeAssetEditorService.doesAnyTextureUseImage(
    imageDataIndex,
    editorState,
  ) ?
    editorState :
    editorState |> ImageDataMapAssetEditorService.removeData(imageDataIndex);

let _disposeMaterialNodeEditorDataBeforeRemoveNode =
    ({imageDataIndex}: materialNodeData, editorState) =>
  editorState |> ImageDataMapAssetEditorService.removeData(imageDataIndex);

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

let _disposeNodeEditorDataBeforeRemoveNode = (node, engineState, editorState) =>
  NodeAssetService.handleNode(
    ~node,
    ~textureNodeFunc=
      (_, nodeData) =>
        _removeTextureImageDataFromImageDataMap(nodeData, editorState),
    ~materialNodeFunc=
      (_, nodeData) =>
        _disposeMaterialNodeEditorDataBeforeRemoveNode(nodeData, editorState),
    ~scriptEventFunctionNodeFunc=(_, _) => editorState,
    ~scriptAttributeNodeFunc=(_, _) => editorState,
    ~wdbNodeFunc=
      (_, nodeData) =>
        _disposeWDBNodeEditorDataBeforeRemoveNode(
          nodeData,
          (editorState, engineState),
        ),
    ~folderNodeFunc=(_, _, _) => editorState,
  );

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

let _disposeTextureNodeEngineData = ({textureComponent}, engineState) =>
  engineState |> _disposeTextureFromAllLightMaterials(textureComponent);

let _disposeMaterialNodeEngineData =
    ({materialComponent, type_}, (editorState, engineState)) => {
  let (defaultMaterial, defaultMaterialType) =
    MaterialDataAssetEditorService.unsafeGetDefaultMaterialDataByType(
      type_,
      editorState,
    );

  InspectorRenderGroupUtils.Dispose.replaceGameObjectsMaterialsOfTheMaterial(
    ((materialComponent, defaultMaterial), (type_, defaultMaterialType)),
    engineState,
  );
};

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

let _disposeNodeEngineData = (node, editorState, engineState) =>
  NodeAssetService.handleNode(
    ~node,
    ~textureNodeFunc=
      (_, nodeData) => _disposeTextureNodeEngineData(nodeData, engineState),
    ~materialNodeFunc=
      (_, nodeData) =>
        _disposeMaterialNodeEngineData(nodeData, (editorState, engineState)),
    ~scriptEventFunctionNodeFunc=
      (_, nodeData) =>
        _removeScriptEventFunctionFromScriptComponents(nodeData, engineState),
    ~scriptAttributeNodeFunc=
      (_, nodeData) =>
        _removeScriptAttributeFromScriptComponents(nodeData, engineState),
    ~wdbNodeFunc=
      (_, nodeData) =>
        _disposeWDBNodeEngineData(nodeData, (editorState, engineState)),
    ~folderNodeFunc=(_, _, _) => engineState,
  );

let disposeNode = (node, (editorState, engineState)) => {
  let editorState =
    editorState
    |> _disposeNodeEditorDataBeforeRemoveNode(node, engineState)
    |> OperateTreeAssetEditorService.removeNode(node);

  let engineState = engineState |> _disposeNodeEngineData(node, editorState);

  (editorState, engineState);
};

let _disposeTreeEditorData = (engineState, editorState) =>
  IterateTreeAssetService.fold(
    ~acc=editorState,
    ~tree=TreeAssetEditorService.unsafeGetTree(editorState),
    ~wdbNodeFunc=
      (editorState, _, nodeData) =>
        _disposeWDBNodeEditorDataBeforeRemoveNode(
          nodeData,
          (editorState, engineState),
        ),
    ~scriptEventFunctionNodeFunc=(editorState, _, nodeData) => editorState,
    ~scriptAttributeNodeFunc=(editorState, _, nodeData) => editorState,
    ~folderNodeFunc=(editorState, _, _, _) => editorState,
    (),
  );

let _disposeTreeEngineData = (editorState, engineState) =>
  IterateTreeAssetService.fold(
    ~acc=engineState,
    ~tree=TreeAssetEditorService.unsafeGetTree(editorState),
    ~textureNodeFunc=
      (engineState, _, nodeData) =>
        _disposeTextureNodeEngineData(nodeData, engineState),
    ~materialNodeFunc=
      (engineState, _, nodeData) =>
        _disposeMaterialNodeEngineData(nodeData, (editorState, engineState)),
    ~scriptEventFunctionNodeFunc=
      (engineState, _, nodeData) =>
        _removeScriptEventFunctionFromScriptComponents(nodeData, engineState),
    ~scriptAttributeNodeFunc=
      (engineState, _, nodeData) =>
        _removeScriptAttributeFromScriptComponents(nodeData, engineState),
    ~wdbNodeFunc=
      (engineState, _, nodeData) =>
        _disposeWDBNodeEngineData(nodeData, (editorState, engineState)),
    ~folderNodeFunc=(engineState, _, _, _) => engineState,
    (),
  );

let disposeTree = ((editorState, engineState)) => {
  let editorState = _disposeTreeEditorData(engineState, editorState);
  let engineState = _disposeTreeEngineData(editorState, engineState);

  (
    editorState
    |> TreeAssetEditorService.clearTree
    |> ImageDataMapAssetEditorService.clearMap
    |> SelectedFolderNodeIdInAssetTreeAssetEditorService.clearSelectedFolderNodeIdInAssetTree
    |> CurrentNodeIdAssetEditorService.clearCurrentNodeId,
    engineState,
  );
};