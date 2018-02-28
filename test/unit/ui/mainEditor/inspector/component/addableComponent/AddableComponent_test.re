open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "AddableComponent ui component",
    () => {
      let _buildAddableComponent = (currentGameObject, addableComponentList) =>
        ReactTestRenderer.create(
          <AddableComponent
            store=(TestToolUI.buildEmptyAppState())
            dispatch=(TestToolUI.getDispatch())
            currentGameObject
            addableComponentList
          />
        );
      let _triggerClickAddComponentEvent = (domChildren) => {
        let button = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 0);
        EventToolUI.triggerClickEvent(button)
      };
      let _triggerClickErrorComponentEvent = (domChildren) => {
        let errorComponent = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 2);
        EventToolUI.triggerClickEvent(errorComponent)
      };
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox);
          TestToolUI.initMainEditor(sandbox);
          MainEditorSceneToolEditor.prepareDefaultScene(
            MainEditorSceneToolEditor.setFirstBoxTobeCurrentGameObject
          )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test snapshot",
        () =>
          test(
            "show addable component list",
            () => {
              let component =
                _buildAddableComponent(
                  MainEditorSceneToolEditor.unsafeGetCurrentGameObject(),
                  AddableComponentToolUI.buildFakeAddableComponentList()
                );
              EventToolUI.triggerComponentEvent(component, _triggerClickAddComponentEvent);
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
                      MainEditorSceneToolEditor.unsafeGetCurrentGameObject(),
                      AddableComponentToolUI.buildFakeAddableComponentList()
                    );
                  EventToolUI.triggerComponentEvent(component, _triggerClickAddComponentEvent);
                  EventToolUI.triggerComponentEvent(component, _triggerClickErrorComponentEvent)
                }
              )
              |> toThrowMessage("the type:transformError is not find")
          )
      )
    }
  );