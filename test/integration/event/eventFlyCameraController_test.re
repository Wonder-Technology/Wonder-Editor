open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open EventType;

open Wonderjs;

open FlyCameraControllerType;

let _ =
  describe("test fly cameraController event", () => {
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

    let _prepareMouseEventForTestKeyboardEvent =
        (~sandbox, ~bindEventFunc, ()) => {
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
      let moveSpeed = 0.8;
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

      (cameraController, moveSpeed, pos);
    };

    let _prepareForPointerLock = sandbox =>
      MouseEventTool.prepareForPointerLock(~sandbox, ());

    let _testPointDragStartEvent =
        (sandbox, (pageX, pageY, eventButton), (judgeFunc, bindEventFunc)) => {
      _prepareMouseEvent(~sandbox, ());

      let requestPointerLockStub = _prepareForPointerLock(sandbox);
      let engineState = StateEngineService.unsafeGetState();
      let (engineState, _, _, (cameraController, _, _)) =
        FlyCameraControllerToolEngine.createGameObject(engineState);

      let engineState = bindEventFunc(cameraController, engineState);

      engineState |> StateEngineService.setState |> ignore;

      PrepareRenderViewJobTool.setViewRect(~width=100, ~height=50, ());
      StateLogicService.getAndSetEngineState(MainUtils._handleEngineState);

      EventTool.triggerDomEvent(
        "mousedown",
        EventTool.getBody(),
        MouseEventTool.buildMouseDomEvent(
          ~pageX,
          ~pageY,
          ~which=eventButton,
          (),
        ),
      );
      EventTool.restore();

      judgeFunc(requestPointerLockStub);
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
      EventTool.restore();
    };

    let _testKeydownEvent =
        (sandbox, (pageX, pageY), prepareMouseEventFunc, directionArray) => {
      let (cameraController, moveSpeed, (posX, posY, posZ)) =
        prepareMouseEventFunc(~sandbox, ());

      _execKeydownEvent(~pageX, ~pageY, ~ctrlKey=false, ~keyCode=65, ());

      let engineState = StateEngineService.unsafeGetState();

      engineState
      |> FlyCameraEngineService.unsafeGetFlyCameraControllerDirectionArray(
           cameraController,
         )
      |> expect == directionArray;
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test bind for scene view", () => {
      describe("test bind point drag start event", () => {
        let _test = (sandbox, (pageX, pageY, eventButton), judgeFunc) =>
          _testPointDragStartEvent(
            sandbox,
            (pageX, pageY, eventButton),
            (
              judgeFunc,
              FlyCameraControllerLogicService.bindFlyCameraControllerEventForSceneView,
            ),
          );

        test("if mouse button isn't right button, not trigger", () =>
          _test(sandbox, (10, 20, 1), requestPointerLockStub =>
            requestPointerLockStub |> expect |> not_ |> toCalled
          )
        );

        describe("else", () => {
          test("if eventTarget is scene view, request canvas pointerLock", () =>
            _test(sandbox, (10, 20, 3), requestPointerLockStub =>
              requestPointerLockStub |> expect |> toCalledOnce
            )
          );
          test(
            "if eventTarget is game view, not request canvas pointerLock", () =>
            _test(sandbox, (60, 20, 3), requestPointerLockStub =>
              requestPointerLockStub |> expect |> not_ |> toCalled
            )
          );
        });
      });

      describe("test bind point scale start event", () => {
        let _testPointScaleEvent =
            (sandbox, (wheelDelta, eventButton), (judgeFunc, bindEventFunc)) => {
          _prepareMouseEvent(~sandbox, ());

          let engineState = StateEngineService.unsafeGetState();
          let (engineState, _, _, (cameraController, _, _)) =
            FlyCameraControllerToolEngine.createGameObject(engineState);

          let engineState = bindEventFunc(cameraController, engineState);

          engineState |> StateEngineService.setState |> ignore;

          PrepareRenderViewJobTool.setViewRect(~width=100, ~height=50, ());
          StateLogicService.getAndSetEngineState(
            MainUtils._handleEngineState,
          );

          EventTool.triggerDomEvent(
            "mousewheel",
            EventTool.getBody(),
            MouseEventTool.buildMouseDomEvent(
              ~wheelDelta,
              ~which=eventButton,
              (),
            ),
          );
          EventTool.restore();

          judgeFunc(cameraController);
        };

        let _test = (sandbox, (wheelDelta, eventButton), judgeFunc) =>
          _testPointScaleEvent(
            sandbox,
            (wheelDelta, eventButton),
            (
              judgeFunc,
              FlyCameraControllerLogicService.bindFlyCameraControllerEventForSceneView,
            ),
          );

        test("if mouse button isn't right button, still trigger", () =>
          _test(
            sandbox,
            (Js.Nullable.return(200), 1),
            cameraController => {
              let engineState = StateEngineService.unsafeGetState();
              let transform =
                engineState
                |> FlyCameraEngineService.unsafeGetFlyCameraControllerGameObject(
                     cameraController,
                   )
                |> GameObjectComponentEngineService.unsafeGetTransformComponent(
                     _,
                     engineState,
                   );

              engineState
              |> TransformEngineService.getLocalPosition(transform)
              |> expect == (0., 0., (-2.5));
            },
          )
        );
      });

      describe("test bind keydown event", () => {
        let _prepareMouseEvent = (~sandbox, ()) =>
          _prepareMouseEventForTestKeyboardEvent(
            ~sandbox,
            ~bindEventFunc=FlyCameraControllerLogicService.bindFlyCameraControllerEventForSceneView,
            (),
          );

        beforeEach(() => ControllerTool.setIsRun(false));

        test("if is combined key, not prevent default", () => {
          let (cameraController, moveSpeed, (posX, posY, posZ)) =
            _prepareMouseEvent(~sandbox, ());
          let preventDefaultFunc = createEmptyStubWithJsObjSandbox(sandbox);

          _execKeydownEvent(
            ~pageX=10,
            ~pageY=20,
            ~ctrlKey=true,
            ~keyCode=65,
            ~preventDefaultFunc,
            (),
          );

          preventDefaultFunc |> expect |> not_ |> toCalled;
        });

        describe("else", () =>
          describe("if key affect flyCameraController", () =>
            test("prevent default", () => {
              let (cameraController, moveSpeed, (posX, posY, posZ)) =
                _prepareMouseEvent(~sandbox, ());
              let preventDefaultFunc =
                createEmptyStubWithJsObjSandbox(sandbox);

              _execKeydownEvent(
                ~pageX=10,
                ~pageY=20,
                ~ctrlKey=false,
                ~keyCode=65,
                ~preventDefaultFunc,
                (),
              );

              preventDefaultFunc |> expect |> toCalled;
            })
          )
        );

        describe("test set target", () => {
          test("if eventTarget is scene view, move", () =>
            _testKeydownEvent(
              sandbox,
              (10, 20),
              _prepareMouseEvent,
              [|Left|],
            )
          );
          test("if eventTarget is game view, not move", () =>
            _testKeydownEvent(sandbox, (60, 20), _prepareMouseEvent, [||])
          );
        });
      });
    });

    describe("test bind for game view", () => {
      describe("test bind point drag start event", () => {
        let _test = (sandbox, (pageX, pageY, eventButton), judgeFunc) =>
          _testPointDragStartEvent(
            sandbox,
            (pageX, pageY, eventButton),
            (
              judgeFunc,
              FlyCameraEngineService.bindFlyCameraControllerEventForGameView,
            ),
          );

        test(
          "if eventTarget is scene view, not request canvas pointerLock", () =>
          _test(sandbox, (10, 20, 3), requestPointerLockStub =>
            requestPointerLockStub |> expect |> not_ |> toCalled
          )
        );

        describe("if eventTarget is game view", () => {
          test("if mouse button isn't right button, still trigger", () =>
            _test(sandbox, (60, 20, 1), requestPointerLockStub =>
              requestPointerLockStub |> expect |> toCalledOnce
            )
          );
          test("if eventTarget is game view, request canvas pointerLock", () =>
            _test(sandbox, (60, 20, 3), requestPointerLockStub =>
              requestPointerLockStub |> expect |> toCalledOnce
            )
          );
        });
      });
      describe("test bind keydown event", () => {
        let _prepareMouseEvent = (~sandbox, ()) =>
          _prepareMouseEventForTestKeyboardEvent(
            ~sandbox,
            ~bindEventFunc=FlyCameraEngineService.bindFlyCameraControllerEventForGameView,
            (),
          );

        describe("test set target", () => {
          test("if eventTarget is scene view, not move", () =>
            _testKeydownEvent(sandbox, (10, 20), _prepareMouseEvent, [||])
          );

          test("if eventTarget is game view, move", () =>
            _testKeydownEvent(
              sandbox,
              (60, 20),
              _prepareMouseEvent,
              [|Left|],
            )
          );
        });
      });
    });
  });