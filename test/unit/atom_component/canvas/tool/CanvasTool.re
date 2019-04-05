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
  };
};

let _getParentDom = (offsetWidth, offsetHeight) =>
  {
    "offsetWidth": offsetWidth,
    "offsetHeight": offsetHeight,
    "style": {
      "display": "block",
    },
  }
  |> Obj.magic;

let stubCanvasAndInspectorCanvasDom =
    (~sandbox, ~offsetWidth=300, ~offsetHeight=500, ()) => {
  open Sinon;

  let parentDom = _getParentDom(offsetWidth, offsetHeight);
  let canvasDom = BuildCanvasTool.getFakeCanvasDom("a", sandbox);

  let inspectorParentDom = _getParentDom(offsetWidth, offsetHeight);
  let inspectorCanvasDom = BuildCanvasTool.getFakeCanvasDom("a", sandbox);
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
  |> withOneArg("inspectorCanvasParent")
  |> returns(inspectorParentDom)
  |> ignore;

  getElementStub
  |> withOneArg("canvas")
  |> returns(canvasDom)
  |> stubToJsObj
  |> ignore;

  getElementStub
  |> withOneArg("inspector-canvas")
  |> returns(inspectorCanvasDom)
  |> stubToJsObj
  |> ignore;

  (parentDom, canvasDom, inspectorParentDom, inspectorCanvasDom);
};