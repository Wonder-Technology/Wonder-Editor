let _buildImageUint8ArrayMap = editorState =>
  editorState
  |> TextureNodeMapAssetEditorService.getValidValues
  |> SparseMapService.reduce(
       (. map, {textureComponent, image}: AssetNodeType.textureResultType) => {
         let {mimeType, uint8Array}: AssetNodeType.imageResultType =
           ImageNodeMapAssetEditorService.unsafeGetResult(image, editorState);

         switch (uint8Array) {
         | Some(uint8Array) =>
           map
           |> WonderCommonlib.SparseMapService.set(
                textureComponent,
                (mimeType, uint8Array),
              )
         | None => map
         };
       },
       WonderCommonlib.SparseMapService.createEmpty(),
     );

let generateWDB = (rootGameObject, (editorState, engineState)) => {
  let isRun = StateEditorService.getIsRun();
  let engineState =
    isRun ?
      engineState :
      engineState
      |> ArcballCameraControllerLogicService.bindGameViewActiveCameraArcballCameraControllerEvent;

  let (engineState, _, wdbArrayBuffer) =
    GenerateSceneGraphEngineService.generateWDBForWPK(
      rootGameObject,
      _buildImageUint8ArrayMap(editorState),
      engineState,
    );

  let engineState =
    isRun ?
      engineState :
      engineState
      |> ArcballCameraControllerLogicService.unbindGameViewActiveCameraArcballCameraControllerEvent;

  (engineState, wdbArrayBuffer);
};

let generateSceneWDB = (editorState, engineState) =>
  generateWDB(
    SceneEngineService.getSceneGameObject(engineState),
    (editorState, engineState),
  );