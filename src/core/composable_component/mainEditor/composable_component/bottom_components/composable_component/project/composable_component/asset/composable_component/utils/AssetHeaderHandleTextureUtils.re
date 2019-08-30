open NodeAssetType;

open Js.Promise;

let _handleImage =
    (
      (mimeType, fileName, imgBase64),
      (textureNodeId, selectedFolderNodeInAssetTree, textureComponent),
      (editorState, engineState),
    ) =>
  make((~resolve, ~reject) =>
    Image.onload(
      imgBase64,
      loadedImg => {
        ImageUtils.setImageName(loadedImg, fileName);

        let engineState =
          engineState
          |> BasicSourceTextureEngineService.setSource(
               loadedImg |> ImageType.convertDomToImageElement,
               textureComponent,
             );

        let (editorState, imageDataIndex) =
          BasicSourceTextureImageDataMapAssetEditorService.addImageDataIfBase64NotExist(
            imgBase64,
            fileName,
            mimeType,
            editorState,
          );

        let editorState =
          TextureNodeAssetEditorService.addTextureNodeToAssetTree(
            selectedFolderNodeInAssetTree,
            TextureNodeAssetService.buildNode(
              ~nodeId=textureNodeId,
              ~type_=NodeAssetType.BasicSource,
              ~textureContentIndex=None,
              ~textureComponent,
              ~imageDataIndex,
            ),
            editorState,
          );

        resolve(. (editorState, engineState));
      },
    )
  );

let handleTextureType =
    (
      fileResult: uploadAssetFileResultType,
      (selectedFolderNodeInAssetTree, assetNodeId),
      (editorState, engineState),
    ) => {
  let baseName = FileNameService.getBaseName(fileResult.name);
  let extName = FileNameService.getExtName(fileResult.name);

  let (textureComponent, engineState) =
    TextureUtils.createAndInitTexture(
      OperateTreeAssetLogicService.getUniqueNodeName(
        baseName,
        selectedFolderNodeInAssetTree,
        engineState,
      ),
      extName,
      StateEngineService.unsafeGetState(),
    );

  _handleImage(
    (
      ImageUtils.getImageMimeType(extName, editorState),
      fileResult.name,
      fileResult.result |> FileReader.convertResultToString,
    ),
    (assetNodeId, selectedFolderNodeInAssetTree, textureComponent),
    (editorState, engineState),
  );
};