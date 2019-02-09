open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open EventType;

let _ =
  describe("test arcball cameraController event", () => {
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
      MouseEventTool.prepareForPointerLock(sandbox);

      let engineState = StateEngineService.unsafeGetState();
      let (
        engineState,
        gameObject,
        transform,
        (cameraController, basicCameraView, perspectiveCameraProjection),
      ) =
        ArcballCameraControllerToolEngine.createGameObject(engineState);

      let (posX, posY, posZ) as pos = (1., 2., 3.);
      let engineState =
        engineState |> TransformEngineService.setLocalPosition(pos, transform);
      let target = pos;
      let moveSpeedX = 0.1;
      let moveSpeedY = 0.2;
      let engineState =
        engineState
        |> ArcballCameraEngineService.setArcballCameraControllerTarget(
             cameraController,
             target,
           )
        |> ArcballCameraEngineService.setArcballCameraControllerMoveSpeedX(
             cameraController,
             moveSpeedX,
           )
        |> ArcballCameraEngineService.setArcballCameraControllerMoveSpeedY(
             cameraController,
             moveSpeedY,
           );

      PrepareRenderViewJobTool.setViewRect(~width=100, ~height=50, ());
      let engineState = engineState |> MainUtils._handleEngineState;

      let engineState = bindEventFunc(cameraController, engineState);

      engineState |> StateEngineService.setState |> ignore;

      (cameraController, (moveSpeedX, moveSpeedY), pos);
    };

    let _prepareForPointerLock = sandbox =>
      MouseEventTool.prepareForPointerLock(sandbox);

    let _testPointDragStartEvent =
        (sandbox, (pageX, pageY, eventButton), (judgeFunc, bindEventFunc)) => {
      _prepareMouseEvent(~sandbox, ());

      let requestPointerLockStub = _prepareForPointerLock(sandbox);
      let engineState = StateEngineService.unsafeGetState();
      let (engineState, _, _, (cameraController, _, _)) =
        ArcballCameraControllerToolEngine.createGameObject(engineState);

      let engineState = bindEventFunc(cameraController, engineState);

      engineState |> StateEngineService.setState |> ignore;

      PrepareRenderViewJobTool.setViewRect(~width=100, ~height=50, ());
      StateLogicService.getAndSetEngineState(MainUtils._handleEngineState);

      /* EventTool.triggerDomEvent(
           "click",
           EventTool.getBody(),
           MouseEventTool.buildMouseEvent(~pageX, ~pageY, ()),
         ); */
      EventTool.triggerDomEvent(
        "mousedown",
        EventTool.getBody(),
        MouseEventTool.buildMouseEvent(
          ~pageX,
          ~pageY,
          ~which=eventButton,
          (),
        ),
      );
      EventTool.restore();

      judgeFunc(requestPointerLockStub);
    };

    let _testKeydownEvent =
        (
          sandbox,
          (pageX, pageY),
          (getResultTargetFunc, prepareMouseEventFunc),
        ) => {
      let (cameraController, (moveSpeedX, moveSpeedY), (posX, posY, posZ)) =
        prepareMouseEventFunc(~sandbox, ());

      EventTool.triggerDomEvent(
        "mousedown",
        EventTool.getBody(),
        MouseEventTool.buildMouseEvent(~pageX, ~pageY, ()),
      );
      EventTool.triggerDomEvent(
        "keydown",
        EventTool.getKeyboardEventBindedDom(),
        KeyboardEventTool.buildKeyboardEvent(~keyCode=65, ()),
      );
      EventTool.restore();

      let engineState = StateEngineService.unsafeGetState();
      engineState
      |> ArcballCameraEngineService.unsafeGetArcballCameraControllerTarget(
           cameraController,
         )
      |>
      expect == getResultTargetFunc(
                  (moveSpeedX, moveSpeedY),
                  (posX, posY, posZ),
                );
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test bind for scene view", () =>
      describe("test bind point drag start event", ()
        => {
          let _test = (sandbox, (pageX, pageY, eventButton), judgeFunc) =>
            _testPointDragStartEvent(
              sandbox,
              (pageX, pageY, eventButton),
              (
                judgeFunc,
                ArcballCameraControllerLogicService.bindArcballCameraControllerEventForSceneView,
              ),
            );

          test("if mouse button isn't right button, not trigger", () =>
            _test(sandbox, (10, 20, 1), requestPointerLockStub =>
              requestPointerLockStub |> expect |> not_ |> toCalled
            )
          );

          describe("else", () => {
            test(
              "if eventTarget is scene view, request canvas pointerLock", () =>
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
        })
        /* describe("test bind keydown event", () =>
             describe("test set target", () => {
               let _prepareMouseEvent = (~sandbox, ()) =>
                 _prepareMouseEventForTestKeyboardEvent(
                   ~sandbox,
                   ~bindEventFunc=ArcballCameraControllerLogicService.bindArcballCameraControllerEventForSceneView,
                   (),
                 );

               test("if eventTarget is scene view, move", () =>
                 _testKeydownEvent(
                   sandbox,
                   (10, 20),
                   (
                     ((moveSpeedX, moveSpeedY), (posX, posY, posZ)) => (
                       posX -. moveSpeedX,
                       posY,
                       posZ,
                     ),
                     _prepareMouseEvent,
                   ),
                 )
               );
               test("if eventTarget is game view, not move", () =>
                 _testKeydownEvent(
                   sandbox,
                   (60, 20),
                   (
                     ((moveSpeedX, moveSpeedY), (posX, posY, posZ)) => (
                       posX,
                       posY,
                       posZ,
                     ),
                     _prepareMouseEvent,
                   ),
                 )
               );
             })
           ); */
    );

    describe("test bind for game view", () =>
      describe("test bind point drag start event", ()
        => {
          let _test = (sandbox, (pageX, pageY, eventButton), judgeFunc) =>
            _testPointDragStartEvent(
              sandbox,
              (pageX, pageY, eventButton),
              (
                judgeFunc,
                ArcballCameraEngineService.bindArcballCameraControllerEventForGameView,
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
        })
        /* describe("test bind keydown event", () =>
             describe("test set target", () => {
               let _prepareMouseEvent = (~sandbox, ()) =>
                 _prepareMouseEventForTestKeyboardEvent(
                   ~sandbox,
                   ~bindEventFunc=ArcballCameraEngineService.bindArcballCameraControllerEventForGameView,
                   (),
                 );

               test("if eventTarget is scene view, not move", () =>
                 _testKeydownEvent(
                   sandbox,
                   (10, 20),
                   (
                     ((moveSpeedX, moveSpeedY), (posX, posY, posZ)) => (
                       posX,
                       posY,
                       posZ,
                     ),
                     _prepareMouseEvent,
                   ),
                 )
               );
               test("if eventTarget is game view, move", () =>
                 _testKeydownEvent(
                   sandbox,
                   (60, 20),
                   (
                     ((moveSpeedX, moveSpeedY), (posX, posY, posZ)) => (
                       posX -. moveSpeedX,
                       posY,
                       posZ,
                     ),
                     _prepareMouseEvent,
                   ),
                 )
               );
             })
           ); */
    );
  });