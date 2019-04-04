open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("material inspector: inspector canvas", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.initInspectorEngineState(
        ~sandbox,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~initJobs=
              {|
                [{
                    "name": "init_inspectorEngine"
                }]
              |},
            ~initPipelines=
              {|
                   [
                       {
                           "name": "default",
                           "jobs": [
                               {
                                   "name": "init_inspectorEngine"
                               }
                           ]
                       }
                   ]
               |},
            (),
          ),
        (),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test init inspector canvas ", () =>
      test("11j", () =>
        expect(1) == 1
      )
    );
  });