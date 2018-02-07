open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "Header ui component",
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
      let _buildEngineSceneTree = () =>
        ReactTestRenderer.create(
          <MainEditorSceneTree
            store=(SceneTreeToolUI.buildAppStateSceneGraphFromEngine())
            dispatch=(TestToolUI.getDispatch())
          />
        );
      let _buildInspectorComponent = () =>
        ReactTestRenderer.create(
          <MainEditorInspector
            store=(TestToolUI.buildEmptyAppState())
            dispatch=(TestToolUI.getDispatch())
            allShowComponentConfig=(InspectorToolUI.buildFakeAllShowComponentConfig())
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
        "test snapshot",
        () => {
          beforeEach(() => TestToolEditor.closeContractCheck());
          afterEach(() => TestToolEditor.openContractCheck());
          describe(
            "no operate gameObject",
            () => {
              test(
                "header ui component",
                () => {
                  let component = _buildHeaderComponent();
                  let json = ReactTestRenderer.toJSON(component);
                  toMatchSnapshot(expect(json))
                }
              );
              test(
                "sceneTree ui component",
                () => {
                  let component = _buildEngineSceneTree();
                  let json = ReactTestRenderer.toJSON(component);
                  toMatchSnapshot(expect(json))
                }
              );
              test(
                "inspector ui component",
                () => {
                  let component = _buildInspectorComponent();
                  let json = ReactTestRenderer.toJSON(component);
                  toMatchSnapshot(expect(json))
                }
              )
            }
          );
          describe(
            "operate gameObject",
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
                    "should only change sceneTree ui component",
                    () => {
                      let component = _buildHeaderComponent();
                      EventToolUI.triggerComponentEvent(component, _triggerClickAddBox);
                      let component2 = _buildEngineSceneTree();
                      let json = ReactTestRenderer.toJSON(component2);
                      toMatchSnapshot(expect(json))
                    }
                  )
                }
              );
              describe(
                "test dispose gameObject",
                () => {
                  let _triggerClickDispose = (domChildren) => {
                    let addBoxDiv = _getFromArray(domChildren, 3);
                    let addBoxButton = _getFromArray(addBoxDiv##children, 0);
                    EventToolUI.triggerClickEvent(addBoxButton)
                  };
                  test(
                    "change sceneTree ui component",
                    () => {
                      let component = _buildHeaderComponent();
                      EventToolUI.triggerComponentEvent(component, _triggerClickDispose);
                      let component2 = _buildEngineSceneTree();
                      let json = ReactTestRenderer.toJSON(component2);
                      toMatchSnapshot(expect(json))
                    }
                  );
                  test(
                    "change inspector ui component",
                    () => {
                      let component = _buildHeaderComponent();
                      EventToolUI.triggerComponentEvent(component, _triggerClickDispose);
                      let component2 = _buildInspectorComponent();
                      let json = ReactTestRenderer.toJSON(component2);
                      toMatchSnapshot(expect(json))
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