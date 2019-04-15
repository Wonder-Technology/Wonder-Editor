open EditorType;

let create = () => {
  inspectorCanvasRecord: {
    containerGameObject: None,
  },
  imgCanvasRecord: {
    imgContext: None,
  },
  settingRecord: RecordSettingService.create(),
  sceneTreeRecord: {
    currentSceneTreeNode: None,
    isShowChildrenMap: WonderCommonlib.ImmutableSparseMapService.createEmpty(),
  },
  assetRecord: {
    nodeIndex: 0,
    imageDataMapIndex: 0,
    tree: None,
    currentNodeId: None,
    selectedFolderNodeIdInAssetTree: None,
    imageDataMap: WonderCommonlib.ImmutableSparseMapService.createEmpty(),
    geometryData: {
      defaultCubeGeometryComponent: (-1),
      defaultSphereGeometryComponent: (-1),
    },
    materialData: {
      defaultBasicMaterialData: None,
      defaultLightMaterialData: None,
      defaultMaterialSnapshotPath: "./public/img/mat.jpg",
    },
  },
  uiRecord: {
    messageIndex: 0,
    intervalId: 0,
    isHasMessage: false,
    messageArray: [||],
  },
  consoleRecord: {
    consoleMessageArray: [||],
    consoleCheckedCount: 0,
  },
  sceneViewRecord: {
    viewRect: None,
    gridPlane: None,
    editCamera: None,
    transformGizmoData: None,
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
    componentTypeMap: WonderCommonlib.ImmutableSparseMapService.createEmpty(),
  },
  transformRecord: {
    localEulerAngleMapX:
      WonderCommonlib.ImmutableSparseMapService.createEmpty(),
    localEulerAngleMapY:
      WonderCommonlib.ImmutableSparseMapService.createEmpty(),
    localEulerAngleMapZ:
      WonderCommonlib.ImmutableSparseMapService.createEmpty(),
  },
  pickingRecord: {
    sphereShapeMap: WonderCommonlib.ImmutableSparseMapService.createEmpty(),
  },
  currentDragSource: (None, None),
  currentSelectSource: None,
  loopId: (-1),
  languageType: None,
};