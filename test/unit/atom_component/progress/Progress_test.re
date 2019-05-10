open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("Progress component", () => {
    let sandbox = getSandboxDefaultVal();
    let _buildProgressComponent = (percent, completeFunc) =>
      ReactTestRenderer.create(<Progress percent completeFunc />);

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test progress component", () => {
      test("test snapshot", () =>
        _buildProgressComponent(50, (.) => ())
        |> ReactTestTool.createSnapshotAndMatch
      );
      describe("test execute completeFunc", () => {
        test("if percent < 100, not execute completeFunc", () => {
          let completeFunc = createEmptyStubWithJsObjSandbox(sandbox);

          _buildProgressComponent(80, completeFunc);

          let engineState = StateEngineService.unsafeGetState();

          let (engineState, _) =
            ManageEventEngineService.triggerCustomGlobalEvent(
              CreateCustomEventEngineService.create(
                ProgressUtils.getProgressCustomGlobalEventName(),
                Some(90 |> EventType.convertIntToUserData),
              ),
              engineState,
            );

          engineState |> StateEngineService.setState |> ignore;

          completeFunc |> expect |> not_ |> toCalled;
        });
        test("if percent === 100, execute completeFunc", () => {
          let completeFunc = createEmptyStubWithJsObjSandbox(sandbox);

          _buildProgressComponent(80, completeFunc);

          let engineState = StateEngineService.unsafeGetState();

          let (engineState, _) =
            ManageEventEngineService.triggerCustomGlobalEvent(
              CreateCustomEventEngineService.create(
                ProgressUtils.getProgressCustomGlobalEventName(),
                Some(100 |> EventType.convertIntToUserData),
              ),
              engineState,
            );

          engineState |> StateEngineService.setState |> ignore;

          completeFunc |> expect |> toCalledOnce;
        });
      });
    });
  });