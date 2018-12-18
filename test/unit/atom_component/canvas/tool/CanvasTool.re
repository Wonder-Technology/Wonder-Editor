module Drag = {
  let dragWDBAsset =
      (
        ~wdbNodeId,
        ~dispatchFunc=TestTool.getDispatch(),
        ~store=TestTool.buildEmptyAppState(),
        ~widget=AssetUtils.getWidget(),
        ~effectEffectAllowd="move",
        ~dragImg=DomHelper.createElement("img"),
        ~event=BaseEventTool.buildDragEvent(.),
        (),
      ) => {
    DragEventUtils.handleDragStart(
      wdbNodeId,
      widget,
      dragImg,
      effectEffectAllowd,
      event,
    );

    let wdbGameObjectUid =
      StateEditorService.getState()
      |> WDBNodeMapAssetEditorService.getWDBNodeMap
      |> WonderCommonlib.SparseMapService.unsafeGet(wdbNodeId)
      |> (({wdbGameObject}) => wdbGameObject);
    MainEditor.Method.dragWDB((store, dispatchFunc), (), wdbGameObjectUid);

    DragEventUtils.handleDrageEnd(event);
  };
};