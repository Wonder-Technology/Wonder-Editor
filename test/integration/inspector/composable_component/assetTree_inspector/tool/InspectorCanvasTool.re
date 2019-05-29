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

  MainUtils._handleInspectorEngineState
  |> StateLogicService.getAndSetInspectorEngineState;
};

let disposeContainerGameObjectAllChildrenAndReallocateCPUMemory = () =>
  (
    StateEditorService.getState(),
    StateInspectorEngineService.unsafeGetState(),
  )
  |> InspectorCanvasUtils.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory
  |> StateInspectorEngineService.setState
  |> ignore;

module Material = {
  let judgeNotCreateMaterialSphere = () => {
    open Wonder_jest;
    open Expect;
    open Sinon;

    let editorState = StateEditorService.getState();
    let imgContext =
      editorState |> ImgContextImgCanvasEditorService.unsafeGetImgContext;
    CanvasType.convertContextToJsObj(imgContext)##clearRect
    |> expect
    |> not_
    |> toCalled;
  };
};

module ArcballCameraController = {
  let unsafeGetArcballCameraControllerComponent = inspectorEngineState =>
    GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
      GameObjectInspectorEngineService.unsafeGetCamera(inspectorEngineState),
      inspectorEngineState,
    );

  let setAngleData = inspectorEngineState => {
    let cameraController =
      unsafeGetArcballCameraControllerComponent(inspectorEngineState);

    inspectorEngineState
    |> ArcballCameraEngineService.setArcballCameraControllerPhi(
         cameraController,
         0.9,
       )
    |> ArcballCameraEngineService.setArcballCameraControllerTheta(
         cameraController,
         0.8,
       );
  };

  let getAngleData = inspectorEngineState => {
    let cameraController =
      unsafeGetArcballCameraControllerComponent(inspectorEngineState);
    (
      ArcballCameraEngineService.unsafeGetArcballCameraControllerPhi(
        cameraController,
        inspectorEngineState,
      ),
      ArcballCameraEngineService.unsafeGetArcballCameraControllerTheta(
        cameraController,
        inspectorEngineState,
      ),
    );
  };

  let getDefaultAngleData = () => (Js.Math._PI /. 2., 1.5);

  let getGameObjectTransformLocalPosition = inspectorEngineState => {
    let cameraControllerGameObjectTransform =
      unsafeGetArcballCameraControllerComponent(inspectorEngineState)
      |> ArcballCameraEngineService.unsafeGetArcballCameraControllerGameObject(
           _,
           inspectorEngineState,
         )
      |> GameObjectComponentEngineService.unsafeGetTransformComponent(
           _,
           inspectorEngineState,
         );
    TransformEngineService.getLocalPosition(
      cameraControllerGameObjectTransform,
      inspectorEngineState,
    )
    |> Vector3Service.truncate(2);
  };
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