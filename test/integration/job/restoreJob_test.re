open Wonderjs;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("restore job", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareState = () => {
      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~isInitJob=false,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~loopPipelines=
              {|
             [
         {
           "name": "default",
           "jobs": [
{"name": "restore" }
           ]
         }
       ]
             |},
            ~loopJobs=
              {|
             [
{"name": "restore" }
             ]
             |},
            (),
          ),
        (),
      );

      MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);
    };

    let _updateView = () => {
      let x1 = 10;
      let x2 = 110;
      let y = 20;
      let width1 = 100;
      let width2 = 50;
      let height = 200;

      StateEditorService.setState(
        StateEditorService.getState()
        |> SceneViewEditorService.updateViewRect((x1, y, width1, height))
        |> GameViewEditorService.updateViewRect((x2, y, width2, height)),
      );

      ((x1, y, width1, height), (x2, y, width2, height));
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("set viewport", () =>
      test("restore to view", () => {
        _prepareState();
        StateLogicService.getAndSetEngineState(MainUtils._handleEngineState);

        let ((x1, y1, width1, height1), (x2, y2, width2, height2)) =
          _updateView();
        /* let (width, height) =
           RootToolEngine.setRoot(~width=1000, ~height=2000, ()); */

        StateLogicService.getAndSetEngineState(
          DirectorToolEngine.runWithDefaultTime,
        );

        DeviceManagerEngineService.getViewport(
          StateEngineService.unsafeGetState(),
        )
        |> expect == Some((x1, y1, width1 + width2, height1));
      })
    );

    test("disable scissor test", () => {
      _prepareState();
      StateLogicService.getAndSetEngineState(MainUtils._handleEngineState);
      let _ = _updateView();
      StateLogicService.getAndSetEngineState(
        DeviceManagerEngineService.setScissorTest(true),
      );
      let gl = FakeGlToolEngine.getEngineStateGl();
      let disable = gl##disable;
      let test = 3;
      FakeGlToolEngine.setScissorTest(test, gl) |> ignore;

      StateLogicService.getAndSetEngineState(
        DirectorToolEngine.runWithDefaultTime,
      );

      disable |> withOneArg(test) |> expect |> toCalledOnce;
    });
  });