open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller inspector transform", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      TestTool.closeContractCheck();
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );
      ControllerTool.stubRequestAnimationFrame(
        createEmptyStubWithJsObjSandbox(sandbox),
      );
      ControllerTool.run();
    });
    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));
      TestTool.openContractCheck();
    });

    describe("test set transform in engine state", () =>
      test("current gameObject's tranform position should set into engine", () => {
        let currentGameObjectTransform =
          GameObjectTool.getCurrentSceneTreeNodeTransform();
        let expectValue = 155.;

        MainEditorTransformTool.changePositionXAndBlur(
          ~transform=currentGameObjectTransform,
          ~value=expectValue,
          (),
        );

        StateEngineService.unsafeGetState()
        |> TransformEngineService.getLocalPosition(
             currentGameObjectTransform,
           )
        |> expect == (expectValue, 0., 0.);
      })
    );
  });