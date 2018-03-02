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
            () => {
              beforeEach(
                () =>
                  MainEditorSceneToolEditor.unsafeGetCurrentGameObject()
                  |> MainEditorSceneToolEditor.addFakeVboBufferForGameObject
              );
              describe(
                "test add gameObject",
                () => {
                  let _triggerClickAddBox = (domChildren) => {
                    let addBoxDiv = _getFromArray(domChildren, 2);
                    let addBoxButton = _getFromArray(addBoxDiv##children, 0);
                    EventToolUI.triggerClickEvent(addBoxButton)
                  };
                  test(
                    "add one box gameObject into scene, scene children length should == 5",
                    () => {
                      let component = _buildHeaderComponent();
                      EventToolUI.triggerComponentEvent(component, _triggerClickAddBox);
                      MainEditorSceneToolEngine.unsafeGetScene()
                      |> MainEditorSceneToolEngine.getChildren
                      |> Js.Array.length
                      |> expect == 5
                    }
                  );
                  test(
                    "add two box gameObject into scene, scene children length should == 6",
                    () => {
                      let component = _buildHeaderComponent();
                      EventToolUI.triggerComponentEvent(component, _triggerClickAddBox);
                      EventToolUI.triggerComponentEvent(component, _triggerClickAddBox);
                      MainEditorSceneToolEngine.unsafeGetScene()
                      |> MainEditorSceneToolEngine.getChildren
                      |> Js.Array.length
                      |> expect == 6
                    }
                  )
                }
              );
              describe(
                "test dispose gameObject from engine",
                () => {
                  let _triggerClickDispose = (domChildren) => {
                    let addBoxDiv = _getFromArray(domChildren, 3);
                    let addBoxButton = _getFromArray(addBoxDiv##children, 0);
                    EventToolUI.triggerClickEvent(addBoxButton)
                  };
                  test(
                    "removed current gameObject shouldn't in scene children",
                    () => {
                      let currentGameObject =
                        MainEditorSceneToolEditor.unsafeGetCurrentGameObject();
                      let component = _buildHeaderComponent();
                      EventToolUI.triggerComponentEvent(component, _triggerClickDispose);
                      MainEditorSceneToolEngine.unsafeGetScene()
                      |> MainEditorSceneToolEngine.getChildren
                      |> Js.Array.includes(currentGameObject)
                      |> expect == false
                    }
                  )
                }
              )
            }
          )
        }
      )
    }
  );