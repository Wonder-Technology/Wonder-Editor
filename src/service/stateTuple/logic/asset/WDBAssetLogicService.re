open Js.Promise;

let _createWDBNodeAndSnapshot =
    (parentFolderNode, (wdbNodeId, name, gameObject), editorState) => {
  let (editorState, newImageDataIndex) =
    editorState |> IndexAssetEditorService.generateImageDataMapIndex;

  editorState
  |> OperateTreeAssetEditorService.insertNode(
       NodeAssetService.getNodeId(~node=parentFolderNode),
       WDBNodeAssetService.buildNode(
         ~nodeId=wdbNodeId,
         ~name,
         ~wdbGameObject=gameObject,
         ~imageDataIndex=newImageDataIndex,
       ),
     )
  |> BasicSourceTextureImageDataMapAssetEditorService.setData(
       newImageDataIndex,
       BasicSourceTextureImageDataMapAssetService.buildData(
         ~base64=None,
         ~uint8Array=None,
         ~blobObjectURL=None,
         ~name,
         ~mimeType=ImageUtils.getDefaultMimeType(),
         (),
       ),
     )
  |> ImgCanvasUtils.clipTargetCanvasSnapshotAndSetToImageDataMapByWDBNodeId(
       DomHelper.getElementById("inspector-canvas"),
       DomHelper.getElementById("img-canvas"),
       wdbNodeId,
     );
};

let createWDBNodeUseImageDataMapSnapshot =
    (
      (imageDataIndexMap, snapshot),
      (wdbNodeId, name, gameObject, parentFolderNode),
      editorState,
    ) =>
  editorState
  |> OperateTreeAssetEditorService.insertNode(
       NodeAssetService.getNodeId(~node=parentFolderNode),
       WDBNodeAssetService.buildNode(
         ~nodeId=wdbNodeId,
         ~name,
         ~wdbGameObject=gameObject,
         ~imageDataIndex=
           imageDataIndexMap
           |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(snapshot),
       ),
     );

let createWDBNodeUseCreatedSnapshot =
    ((wdbNodeId, name, gameObject, parentFolderNode), editorState) => {
  let (newWDBGameObject, editorState, inspectorEngineState) =
    (editorState, StateInspectorEngineService.unsafeGetState())
    |> InspectorCanvasUtils.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory
    |> WDBInspectorEngineUtils.createWDBIntoInspectorCanvas(
         gameObject,
         editorState,
         StateEngineService.unsafeGetState(),
       );

  let inspectorEngineState =
    inspectorEngineState
    |> WDBInspectorEngineUtils.setCameraFocusWDBGameObject(newWDBGameObject)
    |> InspectorCanvasUtils.restoreArcballCameraControllerAngle
    |> StateLogicService.renderInspectorEngineStateAndReturnState;

  let editorState =
    editorState
    |> _createWDBNodeAndSnapshot(
         parentFolderNode,
         (wdbNodeId, name, gameObject),
       );

  (editorState, inspectorEngineState)
  |> InspectorCanvasUtils.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory
  |> InspectorCanvasUtils.setCameraDefaultDistance
  |> StateInspectorEngineService.setState;

  editorState;
};

let importAssetWDB =
    (
      (name, wdbArrayBuffer),
      (wdbNodeId, parentFolderNode, isLoadImage),
      createWDBNodeFunc,
      (editorState, engineState),
    ) => {
  let allGameObjectsRef = ref([||]);
  let skyboxCubemapOptRef = ref(None);
  let basicSourceTextureImageUint8ArrayDataMapRef =
    ref(WonderCommonlib.ImmutableSparseMapService.createEmpty());
  let cubemapTextureImageUint8ArrayDataMapRef =
    ref(WonderCommonlib.ImmutableSparseMapService.createEmpty());

  engineState
  |> AssembleWDBEngineService.assembleWDB(
       wdbArrayBuffer,
       false,
       false,
       false,
       false,
       isLoadImage,
     )
  |> WonderBsMost.Most.tap(
       (
         (
           engineState,
           (
             (
               basicSourceTextureImageUint8ArrayDataMap,
               cubemapTextureImageUint8ArrayDataMap,
             ),
             _,
           ),
           (gameObject, skyboxCubemapOpt),
         ),
       ) => {
       let allGameObjects =
         HierarchyGameObjectEngineService.getAllGameObjects(
           gameObject,
           engineState,
         );

       editorState
       |> createWDBNodeFunc((wdbNodeId, name, gameObject, parentFolderNode))
       |> StateEditorService.setState
       |> ignore;

       engineState
       |> GameObjectEngineService.setAllGameObjectsIsRenderIfHasMeshRenderer(
            false,
            gameObject,
          )
       |> GameObjectEngineService.setGameObjectName(name, gameObject)
       |> StateEngineService.setState
       |> ignore;

       allGameObjectsRef := allGameObjects;
       skyboxCubemapOptRef := skyboxCubemapOpt;
       basicSourceTextureImageUint8ArrayDataMapRef :=
         basicSourceTextureImageUint8ArrayDataMap;
       cubemapTextureImageUint8ArrayDataMapRef :=
         cubemapTextureImageUint8ArrayDataMap;
     })
  |> WonderBsMost.Most.drain
  |> then_(_ =>
       resolve((
         (
           allGameObjectsRef^,
           skyboxCubemapOptRef^,
           basicSourceTextureImageUint8ArrayDataMapRef^,
           cubemapTextureImageUint8ArrayDataMapRef^,
         ),
         (StateEditorService.getState(), StateEngineService.unsafeGetState()),
       ))
     );
};