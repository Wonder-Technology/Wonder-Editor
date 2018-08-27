open EditorType;

let create = () => {
  sceneRecord: {
    diffMap: None,
    currentSceneTreeNode: None,
    isRun: false,
  },
  assetRecord: {
    assetTreeRoot: None,
    index: 0,
    lastDefaultComponentIndex: 0,
    removedAssetIdArray: [||],
    currentNodeData: None,
    currentNodeParentId: None,
    textureNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
    jsonNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
    imageBase64Map: WonderCommonlib.SparseMapService.createEmpty(),
    folderNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
    wdbNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
    materialNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
    geometryNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
    geometryData: {
      cubeGeometryAssetId: (-1),
      sphereGeometryAssetId: (-1),
    },
  },
  inspectorRecord: {
    componentTypeMap: WonderCommonlib.SparseMapService.createEmpty(),
  },
  currentDragSource: (None, None),
  currentSelectSource: None,
  loopId: (-1),
};