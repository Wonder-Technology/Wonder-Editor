open EditorType;

let create = () => {
  settingRecord: RecordSettingService.create(),
  sceneRecord: {
    currentSceneTreeNode: None,
  },
  assetRecord: {
    nodeIndex: 0,
    imageDataMapIndex: 0,
    tree: None,
    currentNodeId: None,
    selectedFolderNodeIdInAssetTree: None,
    imageDataMap: WonderCommonlib.SparseMapService.createEmpty(),
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
    eventTarget: EventType.Other,
  },
  imguiRecord: {
    gameViewIMGUIFunc: None,
    gameViewCustomData: None,
  },
  inspectorRecord: {
    componentTypeMap: WonderCommonlib.SparseMapService.createEmpty(),
  },
  transformRecord: {
    localEulerAngleMapX: WonderCommonlib.SparseMapService.createEmpty(),
    localEulerAngleMapY: WonderCommonlib.SparseMapService.createEmpty(),
    localEulerAngleMapZ: WonderCommonlib.SparseMapService.createEmpty(),
  },
  pickingRecord: {
    sphereShapeMap: WonderCommonlib.SparseMapService.createEmpty(),
  },
  currentDragSource: (None, None),
  currentSelectSource: None,
  loopId: (-1),
};