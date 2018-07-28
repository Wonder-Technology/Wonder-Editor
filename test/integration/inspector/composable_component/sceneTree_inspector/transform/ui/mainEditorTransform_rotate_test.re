open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform;

let _ =
  describe("MainEditorTransform rotate", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("test set currentSceneTreeNode", () => {
      beforeEach(() => {
        MainEditorSceneTool.initStateAndGl(~sandbox, ());
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
        );
      });
      describe("changeX should set current gameObject local rotate's x", () => {
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
            TransformEventTool.triggerChangeRotateX(value),
          );
          BaseEventTool.triggerComponentEvent(
            component,
            TransformEventTool.triggerBlurRotateX(value),
          );

          component |> ReactTestTool.createSnapshotAndMatch;
        });
        describe("set engine x value", () => {
          describe(
            "if value's decimal digits <= 6, can set the whole value to engine",
            () => {
            test("test < 6", () => {
              let currentGameObjectTransform =
                GameObjectTool.getCurrentSceneTreeNodeTransform();
              let value = "-11.11111";
              let component =
                BuildComponentTool.buildMainEditorTransformComponent(
                  TestTool.buildEmptyAppState(),
                  currentGameObjectTransform,
                );

              BaseEventTool.triggerComponentEvent(
                component,
                TransformEventTool.triggerChangeRotateX(value),
              );
              let (xFromEngine, _, _) =
                TransformUtils.getTransformRotateData(
                  currentGameObjectTransform,
                );

              expect(xFromEngine) == (value |> float_of_string);
            });
            test("test = 6", () => {
              let currentGameObjectTransform =
                GameObjectTool.getCurrentSceneTreeNodeTransform();
              let value = "-11.111112";
              let component =
                BuildComponentTool.buildMainEditorTransformComponent(
                  TestTool.buildEmptyAppState(),
                  currentGameObjectTransform,
                );
              BaseEventTool.triggerComponentEvent(
                component,
                TransformEventTool.triggerChangeRotateX(value),
              );
              let (xFromEngine, _, _) =
                TransformUtils.getTransformRotateData(
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
                TransformEventTool.triggerChangeRotateX(value),
              );
              let (xFromEngine, _, _) =
                TransformUtils.getTransformRotateData(
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
              let value1 = "-1.111222";
              let value2 = "-14.6613123";
              BaseEventTool.triggerComponentEvent(
                component,
                TransformEventTool.triggerChangeRotateX(value1),
              );
              BaseEventTool.triggerComponentEvent(
                component,
                TransformEventTool.triggerChangeRotateX(value2),
              );
              let (xFromEngine, _, _) =
                TransformUtils.getTransformRotateData(
                  currentGameObjectTransform,
                );

              expect(xFromEngine) == (value1 |> float_of_string);
            });
          });
        });
      });
      describe("changeY should set current gameObject local rotate's y", () => {
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
            TransformEventTool.triggerChangeRotateY(value),
          );
          component |> ReactTestTool.createSnapshotAndMatch;
        });
        describe("set engine y value", () => {
          test(
            "if value's decimal digits <= 6, can set the whole value to engine",
            () => {
            let currentGameObjectTransform =
              GameObjectTool.getCurrentSceneTreeNodeTransform();
            let value = "-11.111112";
            let component =
              BuildComponentTool.buildMainEditorTransformComponent(
                TestTool.buildEmptyAppState(),
                currentGameObjectTransform,
              );
            BaseEventTool.triggerComponentEvent(
              component,
              TransformEventTool.triggerChangeRotateY(value),
            );
            let (_, yFromEngine, _) =
              TransformUtils.getTransformRotateData(
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
              TransformEventTool.triggerChangeRotateY(value),
            );
            let (_, yFromEngine, _) =
              TransformUtils.getTransformRotateData(
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
            let value1 = "-1.111222";
            let value2 = "-14.66132133";
            BaseEventTool.triggerComponentEvent(
              component,
              TransformEventTool.triggerChangeRotateY(value1),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              TransformEventTool.triggerChangeRotateY(value2),
            );
            let (_, yFromEngine, _) =
              TransformUtils.getTransformRotateData(
                currentGameObjectTransform,
              );

            expect(yFromEngine) == (value1 |> float_of_string);
          });
        });
      });
      describe("changeZ should set current gameObject local rotate's z", () => {
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
            TransformEventTool.triggerChangeRotateZ(value),
          );
          component |> ReactTestTool.createSnapshotAndMatch;
        });
        describe("set engine z value", () => {
          test(
            "if value's decimal digits <= 6, can set the whole value to engine",
            () => {
            let currentGameObjectTransform =
              GameObjectTool.getCurrentSceneTreeNodeTransform();
            let value = "-11.111112";
            let component =
              BuildComponentTool.buildMainEditorTransformComponent(
                TestTool.buildEmptyAppState(),
                currentGameObjectTransform,
              );
            BaseEventTool.triggerComponentEvent(
              component,
              TransformEventTool.triggerChangeRotateZ(value),
            );
            let (_, _, zFromEngine) =
              TransformUtils.getTransformRotateData(
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
              TransformEventTool.triggerChangeRotateZ(value1),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              TransformEventTool.triggerChangeRotateZ(value2),
            );
            let (_, _, zFromEngine) =
              TransformUtils.getTransformRotateData(
                currentGameObjectTransform,
              );

            expect(zFromEngine) == (value1 |> float_of_string);
          });
        });
      });
    });
  });