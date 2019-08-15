open Sinon;

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

let stubMainCanvasAndInspectorCanvasDom =
    (
      ~sandbox,
      ~offsetWidth=300,
      ~offsetHeight=500,
      ~canvasWidth=0,
      ~canvasHeight=0,
      ~getElementStub=SinonTool.createMethodStub(
                        sandbox^,
                        BuildCanvasTool.documentToJsObj(
                          BuildCanvasTool.document,
                        ),
                        "getElementById",
                      ),
      (),
    ) => {
  open Sinon;

  let mainParentDom = DomTool.buildFakeDiv(~offsetWidth, ~offsetHeight, ());
  let mainCanvasDom =
    BuildCanvasTool.getFakeCanvasDom(
      "a",
      (canvasWidth, canvasHeight),
      sandbox,
    );

  let inspectorParentDom =
    DomTool.buildFakeDiv(~offsetWidth, ~offsetHeight, ());

  let inspectorCanvasDom =
    BuildCanvasTool.getFakeCanvasDom(
      "a",
      (canvasWidth, canvasHeight),
      sandbox,
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

  getElementStub
  |> withOneArg("appMessage")
  |> returns(DomTool.buildFakeDiv())
  |> stubToJsObj
  |> ignore;

  (mainParentDom, mainCanvasDom, inspectorParentDom, inspectorCanvasDom);
};

let stubImgCanvasDom =
    (
      ~sandbox,
      ~canvasWidth=50,
      ~canvasHeight=50,
      ~getElementStub=SinonTool.createMethodStub(
                        sandbox^,
                        BuildCanvasTool.documentToJsObj(
                          BuildCanvasTool.document,
                        ),
                        "getElementById",
                      ),
      (),
    ) => {
  open Sinon;

  let imgCanvasDom =
    BuildCanvasTool.getFakeCanvasDom(
      "a",
      (canvasWidth, canvasHeight),
      sandbox,
    );

  getElementStub
  |> withOneArg("img-canvas")
  |> returns(imgCanvasDom)
  |> stubToJsObj
  |> ignore;

  imgCanvasDom;
};
let restoreMainCanvasAndInspectorCanvasDom = [%bs.raw
  (. param) => {|
  document.getElementById = (id) => {
    return undefined;
  };
  |}
];

let prepareInspectorCanvasAndImgCanvas = sandbox => {
  let getElementStub =
    SinonTool.createMethodStub(
      sandbox^,
      BuildCanvasTool.documentToJsObj(BuildCanvasTool.document),
      "getElementById",
    );
  let (
    _mainParentDom,
    _mainCanvasDom,
    _inspectorParentDom,
    inspectorCanvasDom,
  ) =
    stubMainCanvasAndInspectorCanvasDom(~sandbox, ~getElementStub, ());

  let imgCanvasDom = stubImgCanvasDom(~sandbox, ~getElementStub, ());
  let imgCanvasFakeBase64Str = BuildCanvasTool.getImgCanvasFakeBase64Str();

  inspectorCanvasDom##toDataURL
  |> returns(BuildCanvasTool.getInspectorCanvasFakeBase64Str());
  imgCanvasDom##toDataURL |> returns(imgCanvasFakeBase64Str);

  (imgCanvasFakeBase64Str, (inspectorCanvasDom, imgCanvasDom));
};