open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "engine:operate gameObject",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _getFromArray = (array, index) => OperateArrayUtils.getNth(index, array);
      let _buildInspectorComponent = (allShowComponentConfig) =>
        ReactTestRenderer.create(
          <MainEditorInspector
            store=(TestToolUI.buildEmptyAppState())
            dispatch=(TestToolUI.getDispatch())
            allShowComponentConfig
          />
        );
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
        "test logic",
        () => {
          let _triggerClickAddComponentEvent = (domChildren) => {
            let article = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 2);
            let button = WonderCommonlib.ArraySystem.unsafeGet(article##children, 0);
            EventToolUI.triggerClickEvent(button)
          };
          let _triggerClickAddSourceInstanceEvent = (domChildren) => {
            let article = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 2);
            let sourceInstanceDiv = WonderCommonlib.ArraySystem.unsafeGet(article##children, 1);
            EventToolUI.triggerClickEvent(sourceInstanceDiv)
          };
          beforeEach(() => TestToolEditor.closeContractCheck());
          afterEach(() => TestToolEditor.openContractCheck());
          describe(
            "test operate component",
            () =>
              describe(
                "test add component",
                () => {
                  test(
                    "current gameObject should haven't sourceInstance before add it",
                    () =>
                      expect(
                        MainEditorSceneToolEditor.unsafeGetCurrentGameObject()
                        |> MainEditorComponentToolEngine.hasSourceInstanceComponent
                      )
                      == false
                  );
                  test(
                    "current gameObject should have sourceInstance component after add it",
                    () => {
                      let component =
                        _buildInspectorComponent(
                          InspectorToolUI.buildFakeAllShowComponentConfig()
                        );
                      EventToolUI.triggerComponentEvent(component, _triggerClickAddComponentEvent);
                      EventToolUI.triggerComponentEvent(
                        component,
                        _triggerClickAddSourceInstanceEvent
                      );
                      expect(
                        MainEditorSceneToolEditor.unsafeGetCurrentGameObject()
                        |> MainEditorComponentToolEngine.hasSourceInstanceComponent
                      )
                      == true
                    }
                  )
                }
              )
          )
        }
      )
    }
  );