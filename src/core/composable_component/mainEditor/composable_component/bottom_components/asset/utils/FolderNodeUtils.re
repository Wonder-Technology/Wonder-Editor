open AssetNodeType;

open FileType;

open Js.Promise;

let getAssetTreeRootName = () => "Assets";

let getNewFolderName = () => "New Folder";

let getNoNameFolderName = () => "NoName Folder";

let getNoNameFolderNameByNodeId = (nodeId, editorState) =>
  nodeId === (editorState |> AssetTreeRootEditorService.getRootTreeNodeId) ?
    getAssetTreeRootName() : getNoNameFolderName();

let addFolderIntoNodeMap =
    (nodeId, parentFolderNodeId, name, (editorState, engineState)) =>
  name
  |. IterateAssetTreeAssetEditorService.getUniqueTreeNodeName(
       Folder,
       parentFolderNodeId,
       (editorState, engineState),
     )
  |> AssetFolderNodeMapEditorService.buildFolderNodeResult(
       parentFolderNodeId,
     )
  |> AssetFolderNodeMapEditorService.setResult(nodeId, _, editorState);

let addMaterialIntoNodeMap =
    (nodeId, parentFolderNodeId, material, editorState) =>
  editorState
  |> AssetMaterialNodeMapEditorService.setResult(
       nodeId,
       AssetMaterialNodeMapEditorService.buildMaterialNodeResult(
         parentFolderNodeId,
         AssetMaterialDataType.LightMaterial,
         material,
       ),
     );

let addTextureIntoNodeMap =
    (nodeId, parentFolderNodeId, texture, imageNodeId, editorState) =>
  editorState
  |> AssetTextureNodeMapEditorService.setResult(
       nodeId,
       AssetTextureNodeMapEditorService.buildTextureNodeResult(
         texture,
         parentFolderNodeId,
         imageNodeId,
       ),
     );

/* let getParentFolderNodeId = (folderNodeId, editorState) =>
   switch (
     folderNodeId
     |> AssetFolderNodeMapEditorService.getFolderParentId(
          _,
          AssetFolderNodeMapEditorService.getFolderNodeMap(editorState),
        )
   ) {
   | Some(parentFolderNodeId) => parentFolderNodeId
   | None => AssetTreeRootEditorService.getRootTreeNodeId(editorState)
   }; */