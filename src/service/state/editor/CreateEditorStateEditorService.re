open EditorType;

let create = () => {
  userDataRecord: {
    userName: None,
    profilePath: None,
    email: None,
    currentRepo: None,
    userRepos: None,
  },
  inspectorCanvasRecord: {
    containerGameObject: None,
    basicSourceTextureCacheMap:
      WonderCommonlib.ImmutableSparseMapService.createEmpty(),
    materialSphereGameObjectInInspectorCanvas: None,
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
    basicSourceTextureImageDataMapIndex: 0,
    cubemapTextureImageDataMapIndex: 0,
    tree: None,
    currentNodeId: None,
    selectedFolderNodeIdInAssetTree: None,
    basicSourceTextureImageDataMap:
      WonderCommonlib.ImmutableSparseMapService.createEmpty(),
    cubemapTextureImageDataMap:
      WonderCommonlib.ImmutableSparseMapService.createEmpty(),
    geometryData: {
      defaultCubeGeometryComponent: (-1),
      defaultSphereGeometryComponent: (-1),
    },
    materialData: {
      defaultBasicMaterialData: None,
      defaultLightMaterialData: None,
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
    eventTarget: EditorEventTargetType.Other,
    inspectorEventTarget: InspectorEventTargetType.Other,
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