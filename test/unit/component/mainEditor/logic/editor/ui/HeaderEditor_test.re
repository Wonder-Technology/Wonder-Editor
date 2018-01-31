open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "engine:Header component",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _getFromArray = (array, index) => OperateArrayUtils.getNth(index, array);
      let _buildHeaderComponent = () =>
        ReactTestRenderer.create(
          <Header
            store=(SceneTreeToolUI.buildAppStateSceneGraphFromEngine())
            dispatch=(TestToolUI.getDispatch())
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
          beforeEach(() => TestToolEditor.closeContractCheck());
          afterEach(() => TestToolEditor.openContractCheck());
          describe(
            "test operate gameObject",
            () =>
              describe(
                "test dispose gameObject",
                () => {
                  let _triggerClickDispose = (domChildren) => {
                    let addBoxDiv = _getFromArray(domChildren, 3);
                    let addBoxButton = _getFromArray(addBoxDiv##children, 0);
                    EventToolUI.triggerClickEvent(addBoxButton)
                  };
                  beforeEach(
                    () =>
                      MainEditorSceneToolEditor.unsafeGetCurrentGameObject()
                      |> MainEditorSceneToolEditor.addFakeVboBufferForGameObject
                  );
                  test(
                    "if not set current gameObject, log error message and continue",
                    () => {
                      let error =
                        createMethodStubWithJsObjSandbox(sandbox, Console.console, "error");
                      MainEditorSceneToolEditor.clearCurrentGameObject();
                      let component = _buildHeaderComponent();
                      EventToolUI.triggerComponentEvent(component, _triggerClickDispose);
                      LogToolUI.getErrorMessage(error)
                      |> expect
                      |> toContain("current gameObject is None")
                    }
                  );
                  test(
                    "else, remove current gameObject from editorState",
                    () => {
                      let component = _buildHeaderComponent();
                      EventToolUI.triggerComponentEvent(component, _triggerClickDispose);
                      MainEditorSceneToolEditor.getCurrentGameObject()
                      |> Js.Option.isNone
                      |> expect == true
                    }
                  )
                }
              )
          )
        }
      )
    }
  );