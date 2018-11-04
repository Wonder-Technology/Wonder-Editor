open EditorType;

let create = () => {
  sceneRecord: {
    currentSceneTreeNode: None,
    isRun: false,
  },
  assetRecord: {
    assetTreeRoot: None,
    index: 0,
    imageIndex: (-1),
    removedAssetIdArray: [||],
    currentNodeData: None,
    currentNodeParentId: None,
    textureNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
    imageNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
    folderNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
    wdbNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
    materialNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
    materialNodeIdMap: WonderCommonlib.SparseMapService.createEmpty(),
    geometryData: {
      defaultCubeGeometryComponent: (-1),
      defaultSphereGeometryComponent: (-1),
    },
    materialData: {
      defaultBasicMaterialData: None,
      defaultLightMaterialData: None,
    },
  },
  consoleRecord: {
    consoleMessageArray: [||],
    consoleCheckedCount: 0,
  },
  sceneViewRecord: {
    viewRect: None,
    gridPlane: None,
    editCamera: None,
  },
  gameViewRecord: {
    viewRect: None,
    activedBasicCameraView: None,
  },
  eventRecord: {
    eventTarget: EventType.Scene,
  },
  imguiRecord: {
    gameViewIMGUIFunc: None,
    gameViewCustomData: None,
  },
  inspectorRecord: {
    componentTypeMap: WonderCommonlib.SparseMapService.createEmpty(),
  },
  uiRecord: {
    isFileInputOpen: false,
  },
  currentDragSource: (None, None),
  currentSelectSource: None,
  loopId: (-1),
};