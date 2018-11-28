let getWidget = () => EditorType.Asset;

let isWDBAssetFile = () => {
  let (widget, startNodeId) =
    StateEditorService.getState()
    |> CurrentDragSourceEditorService.getCurrentDragSource;

  switch (widget, startNodeId) {
  | (Some(widget), Some(nodeId)) =>
    widget === getWidget()
    && StateEditorService.getState()
    |> WDBNodeMapAssetEditorService.getWDBNodeMap
    |> WonderCommonlib.SparseMapService.get(nodeId)
    |> Js.Option.isSome
  | _ => false
  };
};

let isWidget = startWidget =>
  switch (startWidget) {
  | None => false
  | Some(startWidget) => startWidget === getWidget()
  };