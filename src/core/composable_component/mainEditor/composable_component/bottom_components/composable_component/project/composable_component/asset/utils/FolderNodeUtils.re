open AssetNodeType;

open FileType;

open Js.Promise;

let getAssetTreeRootName = () => "Assets";

let getNewFolderName = () => "New Folder";

let getNoNameFolderName = () => "NoName Folder";

let getNoNameFolderNameByNodeId = (nodeId, editorState) =>
  nodeId === (editorState |> TreeRootAssetEditorService.getRootTreeNodeId) ?
    getAssetTreeRootName() : getNoNameFolderName();

let addFolderIntoNodeMap =
    (nodeId, parentFolderNodeId, name, (editorState, engineState)) =>
  name
  |. IterateAssetTreeAssetEditorService.getUniqueTreeNodeName(
       Folder,
       parentFolderNodeId,
       (editorState, engineState),
     )
  |> FolderNodeMapAssetEditorService.buildFolderNodeResult(
       parentFolderNodeId,
     )
  |> FolderNodeMapAssetEditorService.setResult(nodeId, _, editorState);

let addMaterialIntoNodeMap =
    (nodeId, parentFolderNodeId, material, editorState) =>
  editorState
  |> MaterialNodeMapAssetEditorService.setResult(
       nodeId,
       MaterialNodeMapAssetEditorService.buildMaterialNodeResult(
         ~parentFolderNodeId,
         ~type_=AssetMaterialDataType.LightMaterial,
         ~materialComponent=material,
         (),
       ),
     );

let addTextureIntoNodeMap =
    (nodeId, parentFolderNodeId, texture, imageNodeId, editorState) =>
  editorState
  |> TextureNodeMapAssetEditorService.setResult(
       nodeId,
       TextureNodeMapAssetEditorService.buildTextureNodeResult(
         ~textureComponent=texture,
         ~parentFolderNodeId,
         ~image=imageNodeId,
         (),
       ),
     );

/* let getParentFolderNodeId = (folderNodeId, editorState) =>
   switch (
     folderNodeId
     |> FolderNodeMapAssetEditorService.getFolderParentId(
          _,
          FolderNodeMapAssetEditorService.getFolderNodeMap(editorState),
        )
   ) {
   | Some(parentFolderNodeId) => parentFolderNodeId
   | None => TreeRootAssetEditorService.getRootTreeNodeId(editorState)
   }; */