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

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("set viewport", () =>
      test("restore to full screen", () => {
        _prepareState();
        StateLogicService.getAndSetEngineState(MainUtils.handleEngineState);
        let (width, height) =
          RootToolEngine.setRoot(~width=1000, ~height=2000, ());

        StateLogicService.getAndSetEngineState(
          DirectorToolEngine.runWithDefaultTime,
        );

        DeviceManagerEngineService.getViewport(
          StateEngineService.unsafeGetState(),
        )
        |> expect == Some((0, 0, width, height));
      })
    );

    test("disable scissor test", () => {
      _prepareState();
      StateLogicService.getAndSetEngineState(MainUtils.handleEngineState);
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