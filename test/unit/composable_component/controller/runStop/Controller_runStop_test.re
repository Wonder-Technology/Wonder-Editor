open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller run and stop", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      TestTool.closeContractCheck();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.initInspectorEngineState(
        ~sandbox,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
        (),
      );

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );
    });
    afterEach(() => {
      TestTool.openContractCheck();
      restoreSandbox(refJsObjToSandbox(sandbox^));
    });

    describe("test run", () => {
      test("the requestAnimationFrame is called", () => {
        let request = createEmptyStubWithJsObjSandbox(sandbox);
        ControllerTool.stubRequestAnimationFrame(request);
        ControllerTool.run();
        request |> expect |> toCalledOnce;
      });

      describe(
        "bind game view active camera->arcball camera controller event", () =>
        test("test", () => {
          ControllerTool.stubRequestAnimationFrame(
            createEmptyStubWithJsObjSandbox(sandbox),
          );
          let (
            engineState,
            gameObject,
            transform,
            (cameraController, basicCameraView, perspectiveCameraProjection),
          ) =
            ArcballCameraControllerToolEngine.createGameObject(
              StateEngineService.unsafeGetState(),
            );
          GameViewEditorService.setActivedBasicCameraView(basicCameraView)
          |> StateLogicService.getAndSetEditorState;
          engineState |> StateEngineService.setState |> ignore;

          ControllerTool.run();

          let engineState = StateEngineService.unsafeGetState();
          ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
            cameraController,
            engineState,
          )
          |> expect == true;
        })
      );
    });

    describe("test stop", () => {
      describe("stop current loop", () => {
        test("the cancelAnimationFrame is called", () => {
          let cancel = createEmptyStubWithJsObjSandbox(sandbox);
          ControllerTool.stubCancelAnimationFrame(cancel);
          ControllerTool.run();
          ControllerTool.stop();
          cancel |> expect |> toCalledOnce;
        });
        describe("cancelAnimationFrame should called with current loopId", () => {
          test("test run once", () => {
            let loopId = 10;
            let cancel = createEmptyStubWithJsObjSandbox(sandbox);
            let request = createEmptyStubWithJsObjSandbox(sandbox);
            ControllerTool.stubRequestAnimationFrame(request);
            ControllerTool.stubCancelAnimationFrame(cancel);
            returns(loopId, request);
            ControllerTool.run();
            ControllerTool.stop();
            cancel |> expect |> toCalledWith([|loopId|]);
          });
          test("test run twice", () => {
            let loopId1 = 10;
            let loopId2 = 11;
            let cancel = createEmptyStubWithJsObjSandbox(sandbox);
            let request = createEmptyStubWithJsObjSandbox(sandbox);
            ControllerTool.stubRequestAnimationFrame(request);
            ControllerTool.stubCancelAnimationFrame(cancel);
            request |> onCall(0) |> returns(loopId1);
            request |> onCall(1) |> returns(loopId2);
            ControllerTool.run();
            ControllerTool.stop();
            ControllerTool.run();
            ControllerTool.stop();
            cancel |> getCall(1) |> expect |> toCalledWith([|loopId2|]);
          });
        });
      });

      describe(
        "unbind game view active camera->arcball camera controller event", () =>
        test("test", () => {
          ControllerTool.stubRequestAnimationFrame(
            createEmptyStubWithJsObjSandbox(sandbox),
          );
          ControllerTool.stubCancelAnimationFrame(
            createEmptyStubWithJsObjSandbox(sandbox),
          );
          let (
            engineState,
            gameObject,
            transform,
            (cameraController, basicCameraView, perspectiveCameraProjection),
          ) =
            ArcballCameraControllerToolEngine.createGameObject(
              StateEngineService.unsafeGetState(),
            );
          GameViewEditorService.setActivedBasicCameraView(basicCameraView)
          |> StateLogicService.getAndSetEditorState;
          engineState |> StateEngineService.setState |> ignore;

          ControllerTool.run();
          ControllerTool.stop();

          let engineState = StateEngineService.unsafeGetState();
          ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
            cameraController,
            engineState,
          )
          |> expect == false;
        })
      );
    });

    describe("fix bug", () =>
      test("if view size changed when run, resize screen when stop", () => {
        ControllerTool.stubRequestAnimationFrame(
          createEmptyStubWithJsObjSandbox(sandbox),
        );
        ControllerTool.stubCancelAnimationFrame(
          createEmptyStubWithJsObjSandbox(sandbox),
        );
        let (mainParentDom, mainCanvasDom, _, _) =
          CanvasTool.stubMainCanvasAndInspectorCanvasDom(
            ~sandbox,
            ~offsetWidth=300,
            ~offsetHeight=500,
            (),
          );
        ResizeUtils.resizeMainCanvasScreen();

        ControllerTool.run();
        let (mainParentDom, mainCanvasDom, _, _) =
          CanvasTool.stubMainCanvasAndInspectorCanvasDom(
            ~sandbox,
            ~offsetWidth=400,
            ~offsetHeight=500,
            (),
          );
        ResizeUtils.resizeMainCanvasScreen();
        let resizedViewport =
          StateEngineService.unsafeGetState()
          |> DeviceManagerEngineService.getViewport
          |> OptionService.unsafeGet;
        ControllerTool.stop();

        let viewportAfterStop =
          StateEngineService.unsafeGetState()
          |> DeviceManagerEngineService.getViewport
          |> OptionService.unsafeGet;
        viewportAfterStop |> expect == resizedViewport;
      })
    );
  });