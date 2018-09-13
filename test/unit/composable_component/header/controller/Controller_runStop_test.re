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
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
      );
    });
    afterEach(() => {
      TestTool.openContractCheck();
      restoreSandbox(refJsObjToSandbox(sandbox^));
    });

    describe("test run", () =>
      test("the requestAnimationFrame is called", () => {
        let request = createEmptyStubWithJsObjSandbox(sandbox);
        ControllerTool.stubRequestAnimationFrame(request);
        ControllerTool.run();
        request |> expect |> toCalledOnce;
      })
    );
    describe("test stop", () =>
      describe("stop current loop", () => {
        test("the cancelAnimationFrame is called", () => {
          let cancel = createEmptyStubWithJsObjSandbox(sandbox);
          ControllerTool.stubCancelAnimationFrame(cancel);
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
      })
    );
  });