let onDoubleClick =
    (
      ~nodeId,
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  FolderBox.Method.onDoubleClick(dispatchFunc, nodeId);