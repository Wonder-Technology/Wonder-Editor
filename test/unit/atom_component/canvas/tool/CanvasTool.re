module Drag = {
  let dragWDBAsset =
      (
        ~wdbNodeId,
        ~dispatchFunc=TestTool.getDispatch(),
        ~uiState=TestTool.buildEmptyAppState(),
        ~widget=AssetWidgetService.getWidget(),
        ~effectEffectAllowd="move",
        ~dragImg=DomHelper.createElement("img"),
        ~event=BaseEventTool.buildDragEvent(.),
        (),
      ) => {
    /* DragEventUtils.handleDragStart(
         wdbNodeId,
         widget,
         dragImg,
         effectEffectAllowd,
         event,
       ); */

    let wdbGameObject =
      StateEditorService.getState()
      |> OperateTreeAssetEditorService.unsafeFindNodeById(wdbNodeId)
      |> WDBNodeAssetService.getWDBGameObject;

    MainEditor.Method.dragWDB((uiState, dispatchFunc), (), wdbGameObject);
    /* DragEventUtils.handleDragEnd(event); */
  };
};