open AssetNodeType;
open FileType;
open AssetTreeNodeType;
open EditorType;
open Js.Promise;

let renameNodeResult = (name, result: AssetNodeType.nodeResultType) => {
  ...result,
  name,
};

let addFolderIntoNodeMap = (index, editorState) =>
  editorState
  |> AssetNodeMapEditorService.setResult(
       index,
       AssetNodeEditorService.buildFolderResult(index, editorState),
     );

let initRootAssetTree = editorState =>
  switch (AssetTreeRootEditorService.getAssetTreeRoot(editorState)) {
  | None =>
    let rootIndex = editorState |> AssetIndexEditorService.getIndex;
    (
      rootIndex |> AssetNodeEditorService.buildAssetTreeNodeByIndex,
      editorState |> addFolderIntoNodeMap(rootIndex),
    );
  | Some(assetTreeRoot) => (assetTreeRoot, editorState)
  };

let convertFileJsObjectToFileInfoRecord = fileObject => {
  name: fileObject##name,
  type_: fileObject##_type,
  file: FileType.convertFileJsObjectToFile(fileObject),
};

let getAssetTreeAssetNodeTypeByFileType = type_ =>
  switch (type_) {
  | "application/json" => AssetNodeType.Json
  | "image/jpeg"
  | "image/png" => AssetNodeType.Image
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getAssetTreeAssetNodeTypeByFileType",
        ~description={j|the type:$type_ not exist|j},
      ),
    )
  };

let _handleSpecificFuncByType = (type_, (handleJsonFunc, handleImageFunc)) =>
  switch (type_) {
  | Json => handleJsonFunc()
  | Image => handleImageFunc()
  | _ =>
    WonderLog.Log.error(
      WonderLog.Log.buildErrorMessage(
        ~title="_handleSpecificFuncByType",
        ~description={j|the type:$type_ is not exist|j},
      ),
    )
  };

let readFileByType = (reader, fileInfo: fileInfoType) =>
  _handleSpecificFuncByType(
    getAssetTreeAssetNodeTypeByFileType(fileInfo.type_),
    (
      () => FileReader.readAsText(reader, fileInfo.file),
      () => FileReader.readAsDataURL(reader, fileInfo.file),
    ),
  );

let createNodeAndAddToCurrentNodeParent = (newIndex, editorState) =>
  editorState
  |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
  |> AssetUtils.insertSourceTreeNodeToTargetTreeNodeChildren(
       editorState |> AssetUtils.getTargetTreeNodeId,
       newIndex |> AssetNodeEditorService.buildAssetTreeNodeByIndex,
     )
  |. AssetTreeRootEditorService.setAssetTreeRoot(editorState);

let handleFileByType = (fileResult: nodeResultType) => {
  let editorState =
    AssetIndexEditorService.increaseIndex |> StateLogicService.getEditorState;
  let newIndex = editorState |> AssetIndexEditorService.getIndex;

  make((~resolve, ~reject) =>
    _handleSpecificFuncByType(
      fileResult.type_,
      (
        () => {
          editorState
          |> AssetNodeMapEditorService.setResult(newIndex, fileResult)
          |> createNodeAndAddToCurrentNodeParent(newIndex)
          |> StateEditorService.setState
          |> ignore;

          resolve(. "resolve");
        },
        () => {
          let (fileName, _postfix) =
            FileNameUtils.handleFileName(fileResult.name);

          let (texture, editEngineState, runEngineState) =
            TextureUtils.createAndInitTexture(
              fileName,
              StateLogicService.getEditEngineState(),
              StateLogicService.getRunEngineState(),
            );

          Image.onload(
            fileResult.result |> OptionService.unsafeGet,
            loadedImg => {
              editEngineState
              |> BasicSourceTextureEngineService.setSource(
                   loadedImg |> TextureUtils.convertDomToImageElement,
                   texture,
                 )
              |> StateLogicService.setEditEngineState;

              runEngineState
              |> BasicSourceTextureEngineService.setSource(
                   loadedImg |> TextureUtils.convertDomToImageElement,
                   texture,
                 )
              |> StateLogicService.setRunEngineState;

              editorState
              |> AssetNodeMapEditorService.setResult(
                   newIndex,
                   TextureUtils.buildTextureNodeResult(None, texture),
                 )
              |> createNodeAndAddToCurrentNodeParent(newIndex)
              |> StateEditorService.setState
              |> ignore;

              resolve(. "resolve");
            },
          );
        },
      ),
    )
  );
};

/* let getAssetNodeTypeById = (fileId, editorState) =>
   switch (
     editorState
     |> AssetNodeMapEditorService.unsafeGetNodeMap
     |> WonderCommonlib.SparseMapService.get(fileId)
   ) {
   | Some(fileResult) => fileResult.type_
   | None =>
     WonderLog.Log.fatal(
       WonderLog.Log.buildFatalMessage(
         ~title="getAssetNodeTypeByFileId",
         ~description={j|the fileId:$fileId not exist in nodeMap|j},
         ~reason="",
         ~solution={j||j},
         ~params={j||j},
       ),
     )
   }; */