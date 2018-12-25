let findChild = (folderNode, targetNode) =>
  folderNode
  |> FolderNodeAssetService.getChildren
  |> UIStateAssetService.find(Js.Array.find, childNode =>
       NodeAssetService.isNodeEqualById(~sourceNode=childNode, ~targetNode)
     );

let _setNodeData = (nodeId, nodeData, editorState) =>
  NodeAssetEditorService.setNodeData(
    nodeId,
    nodeData,
    FolderNodeAssetService.buildNodeByNodeData(
      ~children=
        FolderNodeAssetService.getChildren(
          OperateTreeAssetEditorService.unsafeFindNodeById(
            nodeId,
            editorState,
          ),
        ),
    ),
    editorState,
  );

let getFolderName = (nodeId, editorState) =>
  NodeNameAssetLogicService.getFolderNodeName(
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState),
  );

let setFolderName = (nodeId, name, editorState) =>
  editorState
  |> _setNodeData(
       nodeId,
       FolderNodeAssetService.rename(
         ~name,
         ~nodeData=
           OperateTreeAssetEditorService.unsafeFindNodeById(
             nodeId,
             editorState,
           )
           |> FolderNodeAssetService.getNodeData,
       ),
     );

let getNoNameFolderName = () => FolderNodeAssetService.getNoNameFolderName();