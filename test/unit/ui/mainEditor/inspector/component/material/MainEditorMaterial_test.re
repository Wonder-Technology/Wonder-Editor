open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

type retainedProps = {color: string};

let _ =
  describe(
    "MainEditorMaterial ui component",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _buildMaterialComponent = (materialComponent) =>
        ReactTestRenderer.create(
          <MainEditorMaterial
            store=(TestToolUI.buildEmptyAppState())
            dispatch=(TestToolUI.getDispatch())
            materialComponent
          />
        );
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox);
          TestToolUI.initMainEditor(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test set currentGameObject",
        () => {
          beforeEach(
            () =>
              MainEditorSceneToolEditor.prepareDefaultScene(
                MainEditorSceneToolEditor.setFirstBoxTobeCurrentGameObject
              )
          );
          describe(
            "change color should set current gameObject color",
            () => {
              let _triggerOnChangeEvent = (value, domChildren) => {
                let stringInput = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 0);
                let input = WonderCommonlib.ArraySystem.unsafeGet(stringInput##children, 1);
                EventToolUI.triggerChangeEvent(input, EventToolUI.buildFormEvent(value))
              };
              let _triggerOnBlurEvent = (value, domChildren) => {
                let stringInput = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 0);
                let input = WonderCommonlib.ArraySystem.unsafeGet(stringInput##children, 1);
                EventToolUI.triggerBlurEvent(input, EventToolUI.buildFormEvent(value))
              };
              describe(
                "test snapshot",
                () =>
                  test(
                    "set color value to stringInput",
                    () => {
                      let currentGameObjectMaterial =
                        MainEditorSceneToolEditor.getCurrentGameObjectMaterial();
                      let value = "#c0c0c0";
                      let component = _buildMaterialComponent(currentGameObjectMaterial);
                      EventToolUI.triggerComponentEvent(component, _triggerOnChangeEvent(value));
                      EventToolUI.triggerComponentEvent(component, _triggerOnBlurEvent(value));
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
                          MainEditorMaterial.shouldUpdate(
                            OldNewSelfToolUI.buildOldNewSelf(
                              {color: "#ffffff"},
                              {color: "#ffffff"}
                            )
                          )
                          |> expect == false
                      );
                      test(
                        "else, should update",
                        () =>
                          MainEditorMaterial.shouldUpdate(
                            OldNewSelfToolUI.buildOldNewSelf(
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
                           MainEditorSceneToolEditor.getCurrentGameObjectTransform();
                         let component =
                           _buildMainEditorTransformComponent(currentGameObjectTransform);
                         let value1 = "-1.23435";
                         let value2 = "-24.6613123";
                         EventToolUI.triggerComponentEvent(
                           component,
                           TransformEventTool.triggerChangeZEvent(value1)
                         );
                         EventToolUI.triggerComponentEvent(
                           component,
                           TransformEventTool.triggerChangeZEvent(value2)
                         );
                         let (_, _, zFromEngine) =
                           getCurrentGameObjectLocalPosition(currentGameObjectMaterial)
                           |> MainEditorMaterial.Method.truncateTransformValue;
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