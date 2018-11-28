open AssetTreeNodeType;

open AssetNodeType;

open EditorType;

let _disposeAllGeometryAssets =
    (allWDBGameObjects, (editorState, engineState)) =>
  GeometryAssetLogicService.getGeometryAssetsFromWDBGameObjects(
    allWDBGameObjects,
    (editorState, engineState),
  )
  |> GeometryEngineService.batchDisposeGeometry(_, engineState);

let _disposeWDBGameObjects = (wdbGameObjects, engineState) =>
  wdbGameObjects
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. engineState, gameObject) =>
         GameObjectEngineService.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial(
           gameObject,
           engineState,
         ),
       engineState,
     );

let _clearAssetNodeMap = editorState => {
  ...editorState,
  assetRecord: {
    ...editorState.assetRecord,
    textureNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
    imageNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
    folderNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
    wdbNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
    materialNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
    materialNodeIdMap: WonderCommonlib.SparseMapService.createEmpty(),
  },
};

let deepDisposeAssetTreeRoot = ((editorState, engineState)) => {
  let editorState = editorState |> InspectorEditorService.clearComponentType;

  let allWDBGameObjects =
    GeometryAssetLogicService.getAllWDBGameObjects(editorState, engineState);

  let engineState =
    _disposeAllGeometryAssets(allWDBGameObjects, (editorState, engineState))
    |> _disposeWDBGameObjects(allWDBGameObjects);

  /* TODO dispose material asset */

  let editorState = _clearAssetNodeMap(editorState);

  (
    RemoveNodeAssetEditorService.deepDisposeAssetTreeRoot(
      IterateAssetTreeAssetEditorService.getAllChildrennNodeIds(
        editorState
        |> TreeRootAssetEditorService.getAssetTreeRoot
        |> OptionService.unsafeGet,
      ),
      editorState,
    ),
    engineState,
  );
};