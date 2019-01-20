let prepareStateAndView = (~sandbox, ~viewWidth, ~viewHeight) => {
  MainEditorSceneTool.initStateWithJob(
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
            {
              "name": "init_event_for_editor"
            },
            {
              "name": "init_camera"
            },
            {
              "name": "init_picking"
            }
          ]
        }
      ]
            |},
        ~initJobs=
          {j|
    [

        {
              "name": "init_event_for_editor"
        },
            {
              "name": "init_camera"
            },
            {
              "name": "init_picking"
            }
    ]
            |j},
        (),
      ),
    (),
  );

  PrepareRenderViewJobTool.setViewRect(
    ~width=viewWidth * 2,
    ~height=viewHeight,
    (),
  );
};

let prepareMouseEvent =
    (
      ~sandbox,
      ~viewWidth,
      ~viewHeight,
      ~offsetLeft,
      ~offsetTop,
      ~offsetParent=Js.Nullable.undefined,
      (),
    ) => {
  prepareStateAndView(~sandbox, ~viewWidth, ~viewHeight);

  MouseEventTool.prepareWithState(
    ~sandbox,
    ~canvasWidth=viewWidth,
    ~canvasHeight=viewHeight,
    ~offsetLeft,
    ~offsetTop,
    ~offsetParent,
    ~engineState=StateEngineService.unsafeGetState(),
    (),
  );
  MouseEventTool.prepareForPointerLock(sandbox);

  MouseEventTool.setPointerLocked(.);

  ((viewWidth, viewHeight), (offsetLeft, offsetTop));
};

let createGameObject = (geometry, engineState) => {
  let (engineState, lightMaterial) =
    LightMaterialEngineService.create(engineState);

  let (engineState, obj) = engineState |> GameObjectEngineService.create;

  let transform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      obj,
      engineState,
    );

  let (engineState, meshRenderer) =
    MeshRendererEngineService.create(engineState);
  let renderGroup =
    RenderGroupEngineService.buildRenderGroup(meshRenderer, lightMaterial);

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("gameObject", obj)
    |> GameObjectComponentEngineService.addGeometryComponent(obj, geometry)
    |> RenderGroupEngineService.addRenderGroupComponents(
         obj,
         renderGroup,
         (
           GameObjectComponentEngineService.addMeshRendererComponent,
           GameObjectComponentEngineService.addLightMaterialComponent,
         ),
       );

  (engineState, obj);
};

let createSphere = engineState => {
  let (engineState, geometry) =
    GeometryEngineService.createSphereGeometry(1., 10, engineState);

  createGameObject(geometry, engineState);
};

let createCube = engineState => {
  let (engineState, geometry) =
    GeometryEngineService.createCubeGeometry(engineState);

  createGameObject(geometry, engineState);
};

let prepareCamera =
    (cameraPos, (viewWidth, viewHeight), (editorState, engineState)) => {
  let (editorState, engineState, editCamera) =
    CameraEngineService.createCamera(editorState, engineState);

  let editCameraPerspectiveCameraProjection =
    GameObjectComponentEngineService.unsafeGetPerspectiveCameraProjectionComponent(
      editCamera,
      engineState,
    );

  let engineState =
    engineState
    |> PerspectiveCameraProjectionEngineService.setPerspectiveCameraAspect(
         (viewWidth |> NumberType.convertIntToFloat)
         /. (viewHeight |> NumberType.convertIntToFloat),
         editCameraPerspectiveCameraProjection,
       )
    |> PerspectiveCameraProjectionEngineService.setPerspectiveCameraFovy(
         60.,
         editCameraPerspectiveCameraProjection,
       )
    |> PerspectiveCameraProjectionEngineService.setPerspectiveCameraNear(
         0.1,
         editCameraPerspectiveCameraProjection,
       )
    |> PerspectiveCameraProjectionEngineService.setPerspectiveCameraFar(
         50000.,
         editCameraPerspectiveCameraProjection,
       );

  let editorState =
    editorState |> SceneViewEditorService.setEditCamera(editCamera);

  let editCameraTransform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      editCamera,
      engineState,
    );

  let engineState =
    engineState
    |> TransformEngineService.setLocalPosition(cameraPos, editCameraTransform);

  let engineState =
    engineState
    |> TransformEngineService.lookAt(editCameraTransform, (0., 0., 0.));

  (editCamera, (editorState, engineState));
};

let prepareGameObject =
    (gameObjectPos, gameObjectEulerAngles, createGameObjectFunc, engineState) => {
  let (engineState, gameObject) = createGameObjectFunc(engineState);

  let gameObjectTransform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    );

  let sceneGameObject = SceneEngineService.getSceneGameObject(engineState);

  let engineState =
    engineState |> GameObjectUtils.addChild(sceneGameObject, gameObject);

  let engineState =
    engineState
    |> TransformEngineService.setLocalPosition(
         gameObjectPos,
         gameObjectTransform,
       )
    |> TransformEngineService.setLocalEulerAngles(
         gameObjectEulerAngles,
         gameObjectTransform,
       );

  (gameObject, engineState);
};

let prepareState = (sandbox, editorState, engineState) => {
  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateEngineService.setState |> ignore;

  StateLogicService.getAndSetEngineState(MainUtils._handleEngineState);

  StateLogicService.getAndRefreshEngineState();

  SceneTreeEditorService.clearCurrentSceneTreeNode
  |> StateLogicService.getAndSetEditorState;

  MainEditor.Method.bindPickSuccessEvent(
    Sinon.createEmptyStubWithJsObjSandbox(sandbox),
  );
  MainEditor.Method.bindPickFailEvent(
    Sinon.createEmptyStubWithJsObjSandbox(sandbox),
  );
};

let triggerPicking = (sandbox, pageX, pageY, eventButton) => {
  let target = EventTool.buildCanvasTarget();

  EventTool.triggerDomEvent(
    "mousedown",
    EventTool.getBody(),
    MouseEventTool.buildMouseEvent(
      ~pageX,
      ~pageY,
      ~target,
      ~which=eventButton,
      (),
    ),
  );
};

let triggerPickingAndRestore = (~eventButton=1, ~sandbox, ~pageX, ~pageY, ()) => {
  triggerPicking(sandbox, pageX, pageY, eventButton);

  EventTool.restore();
};

let pickOne = gameObject => {
  open Wonder_jest;
  open Expect;
  open Expect.Operators;

  let editorState = StateEditorService.getState();

  SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState)
  |> expect == gameObject;
};

let notPick = () => {
  open Wonder_jest;
  open Expect;
  open Expect.Operators;

  let editorState = StateEditorService.getState();

  SceneTreeEditorService.getCurrentSceneTreeNode(editorState)
  |> Js.Option.isNone
  |> expect == true;
};

let prepareOneGameObject =
    (
      ~createGameObjectFunc=createSphere,
      ~sandbox,
      ~viewWidth,
      ~viewHeight,
      ~offsetLeft,
      ~offsetTop,
      ~cameraPos,
      ~gameObjectPos,
      ~gameObjectEulerAngles,
      (),
    ) => {
  let ((viewWidth, viewHeight), (offsetLeft, offsetTop)) =
    prepareMouseEvent(
      ~sandbox,
      ~viewWidth,
      ~viewHeight,
      ~offsetLeft,
      ~offsetTop,
      (),
    );

  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let (editCamera, (editorState, engineState)) =
    prepareCamera(
      cameraPos,
      (viewWidth, viewHeight),
      (editorState, engineState),
    );

  let (gameObject1, engineState) =
    prepareGameObject(
      gameObjectPos,
      gameObjectEulerAngles,
      createGameObjectFunc,
      engineState,
    );

  prepareState(sandbox, editorState, engineState);

  gameObject1;
};

let prepareTwoGameObjects =
    (
      ~createGameObjectFunc1=createSphere,
      ~createGameObjectFunc2=createSphere,
      ~sandbox,
      ~viewWidth,
      ~viewHeight,
      ~offsetLeft,
      ~offsetTop,
      ~cameraPos,
      ~gameObject1Pos,
      ~gameObject1EulerAngles,
      ~gameObject2Pos,
      ~gameObject2EulerAngles,
      (),
    ) => {
  let ((viewWidth, viewHeight), (offsetLeft, offsetTop)) =
    prepareMouseEvent(
      ~sandbox,
      ~viewWidth,
      ~viewHeight,
      ~offsetLeft,
      ~offsetTop,
      (),
    );

  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let (editCamera, (editorState, engineState)) =
    prepareCamera(
      cameraPos,
      (viewWidth, viewHeight),
      (editorState, engineState),
    );

  let (gameObject1, engineState) =
    prepareGameObject(
      gameObject1Pos,
      gameObject1EulerAngles,
      createGameObjectFunc1,
      engineState,
    );

  let (gameObject2, engineState) =
    prepareGameObject(
      gameObject2Pos,
      gameObject2EulerAngles,
      createGameObjectFunc2,
      engineState,
    );

  prepareState(sandbox, editorState, engineState);

  (gameObject1, gameObject2);
};