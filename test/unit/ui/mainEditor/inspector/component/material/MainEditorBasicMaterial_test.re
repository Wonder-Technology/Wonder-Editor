open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

type retainedProps = {color: string};

let _ =
  describe(
    "MainEditorBasicMaterial ui component",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _buildMaterialComponent = (materialComponent) =>
        ReactTestRenderer.create(
          <MainEditorBasicMaterial
            store=(TestTool.buildEmptyAppState())
            dispatch=(TestTool.getDispatch())
            materialComponent
          />
        );
      beforeEach(
        () => {
          sandbox := createSandbox();
          
          TestTool.initMainEditor(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test set currentGameObject",
        () => {
          beforeEach(
            () =>
              MainEditorSceneTool.prepareDefaultScene(
                MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
              )
          );
          describe(
            "change color should set current gameObject color",
            () => {
              let _triggerOnChangeEvent = (value, domChildren) => {
                let stringInput = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
                let input = WonderCommonlib.ArrayService.unsafeGet(stringInput##children, 1);
                BaseEventTool.triggerChangeEvent(input, BaseEventTool.buildFormEvent(value))
              };
              let _triggerOnBlurEvent = (value, domChildren) => {
                let stringInput = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
                let input = WonderCommonlib.ArrayService.unsafeGet(stringInput##children, 1);
                BaseEventTool.triggerBlurEvent(input, BaseEventTool.buildFormEvent(value))
              };
              describe(
                "test snapshot",
                () =>
                  test(
                    "set color value to stringInput",
                    () => {
                      let currentGameObjectMaterial =
                        MainEditorSceneTool.getCurrentGameObjectMaterial();
                      let value = "#c0c0c0";
                      let component = _buildMaterialComponent(currentGameObjectMaterial);
                      BaseEventTool.triggerComponentEvent(component, _triggerOnChangeEvent(value));
                      BaseEventTool.triggerComponentEvent(component, _triggerOnBlurEvent(value));
                      component |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
              );
              describe(
                "test logic",
                () =>
                  describe(
                    "test should update",
                    () => {
                      test(
                        "if color not change, should not update",
                        () =>
                          MainEditorBasicMaterial.shouldUpdate(
                            OldNewSelfTool.buildOldNewSelf(
                              {color: "#ffffff"},
                              {color: "#ffffff"}
                            )
                          )
                          |> expect == false
                      );
                      test(
                        "else, should update",
                        () =>
                          MainEditorBasicMaterial.shouldUpdate(
                            OldNewSelfTool.buildOldNewSelf(
                              {color: "#ffffff"},
                              {color: "#c0c0c0"}
                            )
                          )
                          |> expect == true
                      )
                    }
                  )
              )
              /* describe(
                   "set engine color value",
                   () => {
                     test(
                       "else, get the z from engine should == last value",
                       () => {
                         let currentGameObjectTransform =
                           MainEditorSceneTool.getCurrentGameObjectTransform();
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
                           getCurrentGameObjectLocalPosition(currentGameObjectMaterial)
                           |> MainEditorBasicMaterial.Method.truncateTransformValue;
                         expect(zFromEngine) == value1
                       }
                     )
                   }
                 ) */
            }
          )
        }
      )
    }
  );