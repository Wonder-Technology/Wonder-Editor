let getNoNameFolderName = () => "NoName Folder";

let findChild = FolderNodeAssetService.findChild;

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

let getIsShowChildren = (nodeId, editorState) =>
  FolderNodeAssetService.getIsShowChildren(
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState),
  );