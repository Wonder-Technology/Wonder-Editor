open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform;

let _ =
  describe("MainEditorTransform scale", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    MainEditorTransformBaseTestTool.transformBaseTest(
      sandbox,
      "test change scale value",
      (1., TransformUtils.getTransformScaleData),
      (
        TransformEventTool.triggerChangeScaleX,
        TransformEventTool.triggerChangeScaleY,
        TransformEventTool.triggerChangeScaleZ,
      ),
    );

    describe("deal with specific case", () => {
      beforeEach(() => {
        MainEditorSceneTool.initStateWithJob(
          ~sandbox,
          ~noWorkerJobRecord=
            NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
          (),
        );

        EventListenerTool.buildFakeDom()
        |> EventListenerTool.stubGetElementByIdReturnFakeDom;

        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
        );
        DirectorToolEngine.prepareAndInitAllEnginState();
      });

      describe("the scale value in engineState can't be 0", () =>
        test("if input 0, set origin value to engineState instead of 0", () => {
          let currentGameObjectTransform =
            GameObjectTool.getCurrentSceneTreeNodeTransform();
          let value = "0";
          let component =
            BuildComponentTool.buildMainEditorTransformComponent(
              TestTool.buildEmptyAppState(),
              currentGameObjectTransform,
            );
          BaseEventTool.triggerComponentEvent(
            component,
            TransformEventTool.triggerChangeScaleZ(value),
          );
          let (_, _, zFromEngine) =
            TransformUtils.getTransformScaleData(currentGameObjectTransform);

          expect(zFromEngine) == 1.;
        })
      );
    });
  });