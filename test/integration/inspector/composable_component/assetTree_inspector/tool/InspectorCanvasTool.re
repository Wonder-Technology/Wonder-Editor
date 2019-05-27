let prepareInspectorAndImgCanvasAndReturnAllData =
    (~sandbox, ~inspectorCanvasWidth=300, ~inspectorCanvasHeight=300, ()) => {
  open Sinon;

  let getElementStub =
    SinonTool.createMethodStub(
      sandbox^,
      BuildCanvasTool.documentToJsObj(BuildCanvasTool.document),
      "getElementById",
    );
  let (mainParentDom, mainCanvasDom, inspectorParentDom, inspectorCanvasDom) =
    CanvasTool.stubMainCanvasAndInspectorCanvasDom(
      ~sandbox,
      ~getElementStub,
      ~canvasWidth=inspectorCanvasWidth,
      ~canvasHeight=inspectorCanvasHeight,
      (),
    );
  let imgCanvasDom =
    CanvasTool.stubImgCanvasDom(~sandbox, ~getElementStub, ());
  let imgCanvasFakeBase64Str = BuildCanvasTool.getImgCanvasFakeBase64Str();

  inspectorCanvasDom##toDataURL
  |> returns(BuildCanvasTool.getInspectorCanvasFakeBase64Str());
  imgCanvasDom##toDataURL |> returns(imgCanvasFakeBase64Str);

  (
    imgCanvasFakeBase64Str,
    (
      mainParentDom,
      mainCanvasDom,
      inspectorParentDom,
      inspectorCanvasDom,
      imgCanvasDom,
    ),
  );
};

let prepareInspectorAndImgCanvas =
    (~sandbox, ~inspectorCanvasWidth=300, ~inspectorCanvasHeight=300, ()) => {
  let (
    imgCanvasFakeBase64Str,
    (
      mainParentDom,
      mainCanvasDom,
      inspectorParentDom,
      inspectorCanvasDom,
      imgCanvasDom,
    ),
  ) =
    prepareInspectorAndImgCanvasAndReturnAllData(
      ~sandbox,
      ~inspectorCanvasWidth,
      ~inspectorCanvasHeight,
      (),
    );

  (imgCanvasFakeBase64Str, (inspectorCanvasDom, imgCanvasDom));
};

let prepareInspectorEngineState = sandbox => {
  MainEditorSceneTool.initInspectorEngineState(
    ~sandbox,
    ~isInitJob=false,
    ~noWorkerJobRecord=
      NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
        ~initPipelines=
          {|
                [
                 {
                   "name": "default",
                   "jobs": [
                       {"name": "init_inspector_engine" }
                   ]
                 }
               ]
                |},
        ~initJobs=
          {|
                [
                   {"name": "init_inspector_engine" }
                ]
                |},
        (),
      ),
    (),
  );

  StateInspectorEngineService.unsafeGetState()
  |> MainUtils._handleInspectorEngineState
  |> StateInspectorEngineService.setState
  |> ignore;
};

module TextureCache = {
  let setFakeCaches = () => {
    let editorState = StateEditorService.getState();

    {
      ...editorState,
      inspectorCanvasRecord: {
        ...editorState.inspectorCanvasRecord,
        basicSourceTextureCacheMap:
          editorState.inspectorCanvasRecord.basicSourceTextureCacheMap
          |> WonderCommonlib.ImmutableSparseMapService.set(0, 10)
          |> WonderCommonlib.ImmutableSparseMapService.set(1, 11),
      },
    }
    |> StateEditorService.setState
    |> ignore;
  };

  let isCacheMapEmpty = (editorState: EditorType.editorState) =>
    editorState.inspectorCanvasRecord.basicSourceTextureCacheMap
    |> WonderCommonlib.ImmutableSparseMapService.length === 0;
};