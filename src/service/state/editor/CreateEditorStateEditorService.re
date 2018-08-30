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
    geometryData: {
      defaultCubeGeometryIndex: (-1),
      defaultSphereGeometryIndex: (-1),
    },
  },
  inspectorRecord: {
    componentTypeMap: WonderCommonlib.SparseMapService.createEmpty(),
  },
  gameObjectRecord: RecordGameObjectService.create(),
  currentDragSource: (None, None),
  currentSelectSource: None,
  loopId: (-1),
};