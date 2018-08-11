open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform;


let _ =
  describe("MainEditorTransform rotation", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("test set currentSceneTreeNode", () => {
      beforeEach(() => {
        MainEditorSceneTool.initState(~sandbox, ());
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
        );
      });
      describe("changeX should set current gameObject local rotation's x", () => {
        test("set x value to floatInput", () => {
          let currentGameObjectTransform =
            GameObjectTool.getCurrentSceneTreeNodeTransform();
          let value = "-10.1213";
          let component =
            BuildComponentTool.buildMainEditorTransformComponent(
              TestTool.buildEmptyAppState(),
              currentGameObjectTransform,
            );

          BaseEventTool.triggerComponentEvent(
            component,
            TransformEventTool.triggerChangeRotationX(value),
          );
          BaseEventTool.triggerComponentEvent(
            component,
            TransformEventTool.triggerBlurRotationX(value),
          );

          component |> ReactTestTool.createSnapshotAndMatch;
        });
        describe("set engine x value", () => {
          describe(
            "if value's decimal digits <= 5, can set the whole value to engine",
            () => {
            test("test < 5", () => {
              let currentGameObjectTransform =
                GameObjectTool.getCurrentSceneTreeNodeTransform();
              let value = "-11.1111";
              let component =
                BuildComponentTool.buildMainEditorTransformComponent(
                  TestTool.buildEmptyAppState(),
                  currentGameObjectTransform,
                );

              BaseEventTool.triggerComponentEvent(
                component,
                TransformEventTool.triggerChangeRotationX(value),
              );
              let (xFromEngine, _, _) =
                TransformUtils.getTransformRotationData(
                  currentGameObjectTransform,
                );

              expect(xFromEngine) == (value |> float_of_string);
            });
            test("test = 5", () => {
              let currentGameObjectTransform =
                GameObjectTool.getCurrentSceneTreeNodeTransform();
              let value = "-11.11112";
              let component =
                BuildComponentTool.buildMainEditorTransformComponent(
                  TestTool.buildEmptyAppState(),
                  currentGameObjectTransform,
                );
              BaseEventTool.triggerComponentEvent(
                component,
                TransformEventTool.triggerChangeRotationX(value),
              );
              let (xFromEngine, _, _) =
                TransformUtils.getTransformRotationData(
                  currentGameObjectTransform,
                );
              expect(xFromEngine) == (value |> float_of_string);
            });
          });
          describe("else", () => {
            test("can't set the value to engine", () => {
              let currentGameObjectTransform =
                GameObjectTool.getCurrentSceneTreeNodeTransform();
              let value = "-14.6613123";
              let component =
                BuildComponentTool.buildMainEditorTransformComponent(
                  TestTool.buildEmptyAppState(),
                  currentGameObjectTransform,
                );
              BaseEventTool.triggerComponentEvent(
                component,
                TransformEventTool.triggerChangeRotationX(value),
              );
              let (xFromEngine, _, _) =
                TransformUtils.getTransformRotationData(
                  currentGameObjectTransform,
                );

              expect(xFromEngine) == 0.;
            });
            test("get the x from engine should == last value", () => {
              let currentGameObjectTransform =
                GameObjectTool.getCurrentSceneTreeNodeTransform();
              let component =
                BuildComponentTool.buildMainEditorTransformComponent(
                  TestTool.buildEmptyAppState(),
                  currentGameObjectTransform,
                );
              let value1 = "-1.11222";
              let value2 = "-14.6613123";
              BaseEventTool.triggerComponentEvent(
                component,
                TransformEventTool.triggerChangeRotationX(value1),
              );
              BaseEventTool.triggerComponentEvent(
                component,
                TransformEventTool.triggerChangeRotationX(value2),
              );
              let (xFromEngine, _, _) =
                TransformUtils.getTransformRotationData(
                  currentGameObjectTransform,
                );

              expect(xFromEngine) == (value1 |> float_of_string);
            });
          });
        });
      });
      describe("changeY should set current gameObject local rotation's y", () => {
        test("set y value to floatInput", () => {
          let currentGameObjectTransform =
            GameObjectTool.getCurrentSceneTreeNodeTransform();
          let value = "25.21246";
          let component =
            BuildComponentTool.buildMainEditorTransformComponent(
              TestTool.buildEmptyAppState(),
              currentGameObjectTransform,
            );
          BaseEventTool.triggerComponentEvent(
            component,
            TransformEventTool.triggerChangeRotationY(value),
          );
          component |> ReactTestTool.createSnapshotAndMatch;
        });
        describe("set engine y value", () => {
          test(
            "if value's decimal digits <= 5, can set the whole value to engine",
            () => {
            let currentGameObjectTransform =
              GameObjectTool.getCurrentSceneTreeNodeTransform();
            let value = "-11.11112";
            let component =
              BuildComponentTool.buildMainEditorTransformComponent(
                TestTool.buildEmptyAppState(),
                currentGameObjectTransform,
              );
            BaseEventTool.triggerComponentEvent(
              component,
              TransformEventTool.triggerChangeRotationY(value),
            );
            let (_, yFromEngine, _) =
              TransformUtils.getTransformRotationData(
                currentGameObjectTransform,
              );

            expect(yFromEngine) == (value |> float_of_string);
          });
          test("if value is empty ", () => {
            let currentGameObjectTransform =
              GameObjectTool.getCurrentSceneTreeNodeTransform();
            let value = "";
            let component =
              BuildComponentTool.buildMainEditorTransformComponent(
                TestTool.buildEmptyAppState(),
                currentGameObjectTransform,
              );
            BaseEventTool.triggerComponentEvent(
              component,
              TransformEventTool.triggerChangeRotationY(value),
            );
            let (_, yFromEngine, _) =
              TransformUtils.getTransformRotationData(
                currentGameObjectTransform,
              );

            expect(yFromEngine) == 0.;
          });
          test("else, get the y from engine should == last value", () => {
            let currentGameObjectTransform =
              GameObjectTool.getCurrentSceneTreeNodeTransform();
            let component =
              BuildComponentTool.buildMainEditorTransformComponent(
                TestTool.buildEmptyAppState(),
                currentGameObjectTransform,
              );
            let value1 = "-1.11222";
            let value2 = "-14.66132133";
            BaseEventTool.triggerComponentEvent(
              component,
              TransformEventTool.triggerChangeRotationY(value1),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              TransformEventTool.triggerChangeRotationY(value2),
            );
            let (_, yFromEngine, _) =
              TransformUtils.getTransformRotationData(
                currentGameObjectTransform,
              );

            expect(yFromEngine) == (value1 |> float_of_string);
          });
        });
      });
      describe("changeZ should set current gameObject local rotation's z", () => {
        test("set z value to floatInput", () => {
          let currentGameObjectTransform =
            GameObjectTool.getCurrentSceneTreeNodeTransform();
          let value = "155.2164";
          let component =
            BuildComponentTool.buildMainEditorTransformComponent(
              TestTool.buildEmptyAppState(),
              currentGameObjectTransform,
            );
          BaseEventTool.triggerComponentEvent(
            component,
            TransformEventTool.triggerChangeRotationZ(value),
          );
          component |> ReactTestTool.createSnapshotAndMatch;
        });
        describe("set engine z value", () => {
          test(
            "if value's decimal digits <= 5, can set the whole value to engine",
            () => {
            let currentGameObjectTransform =
              GameObjectTool.getCurrentSceneTreeNodeTransform();
            let value = "-11.11112";
            let component =
              BuildComponentTool.buildMainEditorTransformComponent(
                TestTool.buildEmptyAppState(),
                currentGameObjectTransform,
              );
            BaseEventTool.triggerComponentEvent(
              component,
              TransformEventTool.triggerChangeRotationZ(value),
            );
            let (_, _, zFromEngine) =
              TransformUtils.getTransformRotationData(
                currentGameObjectTransform,
              );

            expect(zFromEngine) == (value |> float_of_string);
          });
          test("else, get the z from engine should == last value", () => {
            let currentGameObjectTransform =
              GameObjectTool.getCurrentSceneTreeNodeTransform();
            let component =
              BuildComponentTool.buildMainEditorTransformComponent(
                TestTool.buildEmptyAppState(),
                currentGameObjectTransform,
              );
            let value1 = "-1.23435";
            let value2 = "-24.6613123";
            BaseEventTool.triggerComponentEvent(
              component,
              TransformEventTool.triggerChangeRotationZ(value1),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              TransformEventTool.triggerChangeRotationZ(value2),
            );
            let (_, _, zFromEngine) =
              TransformUtils.getTransformRotationData(
                currentGameObjectTransform,
              );

            expect(zFromEngine) == (value1 |> float_of_string);
          });
        });
      });
    });
  });