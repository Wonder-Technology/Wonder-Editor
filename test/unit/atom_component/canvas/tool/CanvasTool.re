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

let stubMainCanvasAndInspectorCanvasDom =
    (
      ~sandbox,
      ~offsetWidth=300,
      ~offsetHeight=500,
      ~canvasWidth=0,
      ~canvasHeight=0,
      (),
    ) => {
  open Sinon;

  let mainParentDom = _getParentDom(offsetWidth, offsetHeight);
  let mainCanvasDom =
    BuildCanvasTool.getFakeCanvasDom(
      "a",
      (canvasWidth, canvasHeight),
      sandbox,
    );

  let inspectorParentDom = _getParentDom(offsetWidth, offsetHeight);
  let inspectorCanvasDom =
    BuildCanvasTool.getFakeCanvasDom(
      "a",
      (canvasWidth, canvasHeight),
      sandbox,
    );
  let getElementStub =
    SinonTool.createMethodStub(
      sandbox^,
      BuildCanvasTool.documentToJsObj(BuildCanvasTool.document),
      "getElementById",
    );

  getElementStub
  |> withOneArg("mainCanvasParent")
  |> returns(mainParentDom)
  |> ignore;

  getElementStub
  |> withOneArg("inspectorCanvasParent")
  |> returns(inspectorParentDom)
  |> ignore;

  getElementStub
  |> withOneArg("main-canvas")
  |> returns(mainCanvasDom)
  |> stubToJsObj
  |> ignore;

  getElementStub
  |> withOneArg("inspector-canvas")
  |> returns(inspectorCanvasDom)
  |> stubToJsObj
  |> ignore;

  (mainParentDom, mainCanvasDom, inspectorParentDom, inspectorCanvasDom);
};