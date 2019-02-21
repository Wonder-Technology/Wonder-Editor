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

let stubCanvasParentAndCanvas =
    (~sandbox, ~offsetWidth=300, ~offsetHeight=500, ()) => {
  open Sinon;

  let parentDom =
    {"offsetWidth": offsetWidth, "offsetHeight": offsetHeight} |> Obj.magic;
  let canvasDom = BuildCanvasTool.getFakeCanvasDom("a", sandbox);
  let getElementStub =
    SinonTool.createMethodStub(
      sandbox^,
      BuildCanvasTool.documentToJsObj(BuildCanvasTool.document),
      "getElementById",
    );

  getElementStub
  |> withOneArg("canvasParent")
  |> returns(parentDom)
  |> ignore;

  getElementStub
  |> withOneArg("canvas")
  |> returns(canvasDom)
  |> stubToJsObj
  |> ignore;

  (parentDom, canvasDom);
};