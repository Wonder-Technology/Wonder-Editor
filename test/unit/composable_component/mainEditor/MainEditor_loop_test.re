open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open EventType;

open Wonderjs;

open FlyCameraControllerType;

let _ =
  describe("test mainEditor loop", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareMouseEvent = (~sandbox, ()) => {
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
              "name": "init_editor"
            },
            {
              "name": "init_event_for_editor"
            },
            {
              "name": "init_camera"
            }
          ]
        }
      ]
            |},
            ~initJobs=
              {j|
    [

            {
              "name": "init_editor"
            },
            {
               "name": "init_event_for_editor"
            },
            {
              "name": "init_camera"
            }
    ]
            |j},
            (),
          ),
        (),
      );

      MouseEventTool.prepareWithState(
        ~sandbox,
        ~engineState=StateEngineService.unsafeGetState(),
        (),
      );
      MouseEventTool.setPointerLocked(.);
    };

    let _prepareEvent = (~sandbox, ~bindEventFunc, ()) => {
      _prepareMouseEvent(~sandbox, ());
      MouseEventTool.prepareForPointerLock(~sandbox, ());

      let engineState = StateEngineService.unsafeGetState();
      let (
        engineState,
        gameObject,
        transform,
        (cameraController, basicCameraView, perspectiveCameraProjection),
      ) =
        FlyCameraControllerToolEngine.createGameObject(engineState);

      let (posX, posY, posZ) as pos = (1., 2., 3.);
      let engineState =
        engineState |> TransformEngineService.setLocalPosition(pos, transform);

      let moveSpeed = 1.2;
      let engineState =
        engineState
        |> FlyCameraEngineService.setFlyCameraControllerMoveSpeed(
             cameraController,
             moveSpeed,
           );

      PrepareRenderViewJobTool.setViewRect(~width=100, ~height=50, ());
      let engineState = engineState |> MainUtils._handleEngineState;

      let engineState = bindEventFunc(cameraController, engineState);

      engineState |> StateEngineService.setState |> ignore;

      (cameraController, transform, moveSpeed, pos);
    };

    let _execKeydownEvent =
        (
          ~pageX,
          ~pageY,
          ~keyCode,
          ~ctrlKey=false,
          ~preventDefaultFunc=createEmptyStubWithJsObjSandbox(sandbox),
          (),
        ) => {
      EventTool.triggerDomEvent(
        "mousedown",
        EventTool.getBody(),
        MouseEventTool.buildMouseDomEvent(~pageX, ~pageY, ()),
      );
      EventTool.triggerDomEvent(
        "keydown",
        EventTool.getKeyboardEventBindedDom(),
        KeyboardEventTool.buildKeyboardDomEvent(
          ~keyCode,
          ~ctrlKey,
          ~preventDefaultFunc,
          (),
        ),
      );
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));

      EventTool.restore();
    });

    describe("test add flyCameraController into editCamera", () =>
      describe("eventTarget is scene view", () =>
        describe("bind keydown event", () => {
          describe("trigger keydown event when stop", () => {
            beforeEach(() => ControllerTool.setIsRun(false));

            test("if key is a, should update editCamera transform", () => {
              let (
                cameraController,
                transform,
                moveSpeed,
                (posX, posY, posZ),
              ) =
                _prepareEvent(
                  ~sandbox,
                  ~bindEventFunc=FlyCameraControllerLogicService.bindFlyCameraControllerEventForSceneView,
                  (),
                );

              _execKeydownEvent(
                ~pageX=10,
                ~pageY=20,
                ~ctrlKey=false,
                ~keyCode=65,
                (),
              );

              let engineState =
                StateEngineService.unsafeGetState()
                |> MainEditorLoopTool.startLoopForCameraChangeDirection;

              engineState
              |> TransformEngineService.getLocalPosition(transform)
              |> WonderEditor.Vector3Service.truncate(1)
              |> expect
              == (
                   (posX -. moveSpeed, posY, posZ)
                   |> WonderEditor.Vector3Service.truncate(1)
                 );
            });
          });

          describe("trigger keydown event when run", () => {
            beforeEach(() => ControllerTool.setIsRun(true));

            test("if key is a, shouldn't update editCamera transform", () => {
              let (
                cameraController,
                transform,
                moveSpeed,
                (posX, posY, posZ) as pos,
              ) =
                _prepareEvent(
                  ~sandbox,
                  ~bindEventFunc=FlyCameraControllerLogicService.bindFlyCameraControllerEventForSceneView,
                  (),
                );

              _execKeydownEvent(
                ~pageX=10,
                ~pageY=20,
                ~ctrlKey=false,
                ~keyCode=65,
                (),
              );

              let engineState =
                StateEngineService.unsafeGetState()
                |> MainEditorLoopTool.startLoopForCameraChangeDirection;

              engineState
              |> TransformEngineService.getLocalPosition(transform)
              |> WonderEditor.Vector3Service.truncate(1)
              |> expect == (pos |> WonderEditor.Vector3Service.truncate(1));
            });
          });
        })
      )
    );
  });