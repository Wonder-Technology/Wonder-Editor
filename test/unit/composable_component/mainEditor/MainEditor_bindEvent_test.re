open Wonder_jest;
open Expect;
open Expect.Operators;
open Sinon;

let _ =
  describe("test mainEditor->bind event", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareState = () => MainEditorSceneTool.initState(~sandbox, ());

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("bind refresh_inspector event", () =>
      test("should dispatch", () => {
        _prepareState();
        let dispatchFunc = createEmptyStubWithJsObjSandbox(sandbox);
        MainEditor.Method.bindRefreshInspectorEvent(dispatchFunc);

        let engineState = StateEngineService.unsafeGetState();
        let (engineState, _) =
          ManageEventEngineService.triggerCustomGlobalEvent(
            CreateCustomEventEngineService.create(
              EventEditorService.getRefreshInspectorEventName(),
              None,
            ),
            engineState,
          );

        dispatchFunc |> expect |> toCalledOnce;
      })
    );
  });