open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "AddableComponent",
    () => {
      let _buildAddableComponent = (currentGameObject, addableComponentList) =>
        ReactTestRenderer.create(
          <AddableComponent
            reduxTuple=(TestTool.buildEmptyAppState(), TestTool.getDispatch())
            currentGameObject
            addableComponentList
          />
        );
      let _triggerClickAddComponentEvent = (domChildren) => {
        let button = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
        BaseEventTool.triggerClickEvent(button)
      };
      let _triggerClickErrorComponentEvent = (domChildren) => {
        let errorComponent = WonderCommonlib.ArrayService.unsafeGet(domChildren, 2);
        BaseEventTool.triggerClickEvent(errorComponent)
      };
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(~sandbox, ());
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
          )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test component arguments",
        () =>
          test(
            "show addable component list",
            () => {
              let component =
                _buildAddableComponent(
                  GameObjectTool.unsafeGetCurrentGameObject(),
                  AddableComponentTool.buildFakeAddableComponentList()
                );
              BaseEventTool.triggerComponentEvent(component, _triggerClickAddComponentEvent);
              component |> ReactTestTool.createSnapshotAndMatch
            }
          )
      );
      describe(
        "deal with specific case",
        () =>
          test(
            "if add component is error, should throw error",
            () =>
              expect(
                () => {
                  let component =
                    _buildAddableComponent(
                      GameObjectTool.unsafeGetCurrentGameObject(),
                      AddableComponentTool.buildFakeAddableComponentList()
                    );
                  BaseEventTool.triggerComponentEvent(component, _triggerClickAddComponentEvent);
                  BaseEventTool.triggerComponentEvent(component, _triggerClickErrorComponentEvent)
                }
              )
              |> toThrowMessage("the type:transformError is not find")
          )
      )
    }
  );