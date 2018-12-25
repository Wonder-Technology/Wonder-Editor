let getWidget = () => EditorType.Asset;

let isWDBAssetFile = () => {
  let (widget, startNodeId) =
    StateEditorService.getState()
    |> CurrentDragSourceEditorService.getCurrentDragSource;

  switch (widget, startNodeId) {
  | (Some(widget), Some(nodeId)) =>
    widget === getWidget()
    && StateEditorService.getState()
    |> OperateTreeAssetEditorService.isNodeExistById(nodeId)
  | _ => false
  };
};

let isWidget = startWidget =>
  switch (startWidget) {
  | None => false
  | Some(startWidget) => startWidget === getWidget()
  };