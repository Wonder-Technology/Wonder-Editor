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
        MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
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
    describe("test set transform in ee and re engine state", () => {
      test("current gameObject's tranform position should set into engine", () => {
        let currentGameObjectTransform =
          GameObjectTool.getCurrentSceneTreeNodeTransform();
        let expectValue = 155.;
        let component =
          BuildComponentTool.buildMainEditorTransformComponent(
            TestTool.buildEmptyAppState(),
            currentGameObjectTransform,
          );
        BaseEventTool.triggerComponentEvent(
          component,
          TransformEventTool.triggerChangePositionX(
            Js.Float.toString(expectValue),
          ),
        );
        (
          StateLogicService.getEditEngineState()
          |> TransformEngineService.getLocalPosition(
               DiffComponentTool.getEditEngineComponent(
                 DiffType.Transform,
                 currentGameObjectTransform,
               ),
             ),
          StateLogicService.getRunEngineState()
          |> TransformEngineService.getLocalPosition(
               currentGameObjectTransform,
             ),
        )
        |> expect == ((expectValue, 0., 0.), (expectValue, 0., 0.));
      });
      test("current gameObject's tranform scale should set into engine", () => {
        let currentGameObjectTransform =
          GameObjectTool.getCurrentSceneTreeNodeTransform();
        let expectValue = 19.;
        let component =
          BuildComponentTool.buildMainEditorTransformComponent(
            TestTool.buildEmptyAppState(),
            currentGameObjectTransform,
          );

        BaseEventTool.triggerComponentEvent(
          component,
          TransformEventTool.triggerChangeRotateX(
            expectValue |> string_of_float,
          ),
        );

        (
          StateLogicService.getEditEngineState()
          |> TransformEngineService.getLocalEulerAngles(
               DiffComponentTool.getEditEngineComponent(
                 DiffType.Transform,
                 currentGameObjectTransform,
               ),
             )
          |> TransformUtils.truncateTransformValue,
          StateLogicService.getRunEngineState()
          |> TransformEngineService.getLocalEulerAngles(
               currentGameObjectTransform,
             )
          |> TransformUtils.truncateTransformValue,
        )
        |> expect == ((expectValue, 0., 0.), (expectValue, 0., 0.));
      });
      test("current gameObject's tranform scale should set into engine", () => {
        let currentGameObjectTransform =
          GameObjectTool.getCurrentSceneTreeNodeTransform();
        let expectValue = 15.;
        let component =
          BuildComponentTool.buildMainEditorTransformComponent(
            TestTool.buildEmptyAppState(),
            currentGameObjectTransform,
          );

        BaseEventTool.triggerComponentEvent(
          component,
          TransformEventTool.triggerChangeScaleX(
            expectValue |> string_of_float,
          ),
        );

        (
          StateLogicService.getEditEngineState()
          |> TransformEngineService.getLocalScale(
               DiffComponentTool.getEditEngineComponent(
                 DiffType.Transform,
                 currentGameObjectTransform,
               ),
             ),
          StateLogicService.getRunEngineState()
          |> TransformEngineService.getLocalScale(currentGameObjectTransform),
        )
        |> expect == ((expectValue, 1., 1.), (expectValue, 1., 1.));
      });
    });
  });