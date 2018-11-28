let onDoubleClick =
    (
      ~nodeId,
      ~dispatchFunc=TestTool.getDispatch(),
      ~nodeType=AssetNodeType.Folder,
      (),
    ) =>
  FolderBox.Method.onDoubleClick(dispatchFunc, nodeType, nodeId);