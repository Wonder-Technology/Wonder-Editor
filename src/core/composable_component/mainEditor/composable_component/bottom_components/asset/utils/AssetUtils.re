let getWidget = () => EditorType.Asset;

let isAssetWDBFile = () => {
  let (wnodeIdget, startNodeId) =
    StateEditorService.getState()
    |> CurrentDragSourceEditorService.getCurrentDragSource;

  switch (wnodeIdget, startNodeId) {
  | (Some(wnodeIdget), Some(nodeId)) =>
    wnodeIdget === getWidget()
    && StateEditorService.getState()
    |> AssetWDBNodeMapEditorService.getWDBNodeMap
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