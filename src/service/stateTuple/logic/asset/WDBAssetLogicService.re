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
  |> ImageDataMapAssetEditorService.setData(
       newImageDataIndex,
       ImageDataMapAssetService.buildData(
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

let importAssetWDB =
    (
      (name, wdbArrayBuffer),
      (wdbNodeId, parentFolderNode),
      isLoadImage,
      (editorState, engineState),
    ) => {
  let allGameObjectsRef = ref([||]);
  let imageUint8ArrayDataMapRef =
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
       ((engineState, (imageUint8ArrayDataMap, _), gameObject)) => {
       let allGameObjects =
         HierarchyGameObjectEngineService.getAllGameObjects(
           gameObject,
           engineState,
         );

       /* TODO need test */
       (editorState, StateInspectorEngineService.unsafeGetState())
       |> AssetTreeInspectorUtils.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory
       |> WDBInspectorEngineUtils.createWDBIntoInspectorCanvas(
            gameObject,
            (
              StateEditorService.getState(),
              StateEngineService.unsafeGetState(),
            ),
          )
       |> AssetTreeInspectorUtils.setCameraDefaultDistance
       |> StateLogicService.refreshInspectorEngineState;

       editorState
       |> _createWDBNodeAndSnapshot(
            parentFolderNode,
            (wdbNodeId, name, gameObject),
          )
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
       imageUint8ArrayDataMapRef := imageUint8ArrayDataMap;
     })
  |> WonderBsMost.Most.drain
  |> then_(_ =>
       resolve((
         (allGameObjectsRef^, imageUint8ArrayDataMapRef^),
         (StateEditorService.getState(), StateEngineService.unsafeGetState()),
       ))
     );
};