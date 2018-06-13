open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

type retainedProps = {color: string};

let _ =
  describe(
    "MainEditorBasicMaterial",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(~sandbox, ());
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode
          )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test set currentSceneTreeNode",
        () =>
          describe(
            "change color should set current gameObject color",
            () => {
              test(
                "set color value to stringInput",
                () => {
                  let currentGameObjectMaterial = GameObjectTool.getCurrentSceneTreeNodeMaterial();
                  let value = "#c0c0c0";
                  let component =
                    BuildComponentTool.buildMaterialComponent(currentGameObjectMaterial);
                  MaterialEventTool.triggerChangeAndBlurMaterialEvent(component, value);
                  component |> ReactTestTool.createSnapshotAndMatch
                }
              );
              describe(
                "test should update",
                () => {
                  test(
                    "if color not change, should not update",
                    () =>
                      MainEditorBasicMaterial.shouldUpdate(
                        OldNewSelfTool.buildOldNewSelf({color: "#ffffff"}, {color: "#ffffff"})
                      )
                      |> expect == false
                  );
                  test(
                    "else, should update",
                    () =>
                      MainEditorBasicMaterial.shouldUpdate(
                        OldNewSelfTool.buildOldNewSelf({color: "#ffffff"}, {color: "#c0c0c0"})
                      )
                      |> expect == true
                  )
                }
              )
              /* describe(
                   "set engine color value",
                   () => {
                     test(
                       "else, get the z from engine should == last value",
                       () => {
                         let currentGameObjectTransform =
                           MainEditorSceneTool.getCurrentSceneTreeNodeTransform();
                         let component =
                           BuildComponentTool.buildMainEditorTransformComponent(TestTool.buildEmptyAppState(),currentGameObjectTransform);
                         let value1 = "-1.23435";
                         let value2 = "-24.6613123";
                         BaseEventTool.triggerComponentEvent(
                           component,
                           TransformEventTool.triggerChangeZEvent(value1)
                         );
                         BaseEventTool.triggerComponentEvent(
                           component,
                           TransformEventTool.triggerChangeZEvent(value2)
                         );
                         let (_, _, zFromEngine) =
                           getCurrentSceneTreeNodeLocalPosition(currentGameObjectMaterial)
                           |> MainEditorBasicMaterial.Method.truncateTransformValue;
                         expect(zFromEngine) == value1
                       }
                     )
                   }
                 ) */
            }
          )
      )
    }
  );