open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "operate gameObject: header and sceneTree",
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
                  describe(
                    "should only change sceneTree ui component",
                    () => {
                      test(
                        "change sceneTree ui component",
                        () => {
                          let oldSnapShotJson =
                            _buildEngineSceneTree() |> ReactTestTool.createSnapshotJsonStringify;
                          EventToolUI.triggerComponentEvent(
                            _buildHeaderComponent(),
                            _triggerClickAddBox
                          );
                          let newSnapShotJson =
                            _buildEngineSceneTree() |> ReactTestTool.createSnapshotJsonStringify;
                          expect(oldSnapShotJson) != newSnapShotJson
                        }
                      );
                      test(
                        "not change inspector ui component",
                        () => {
                          let oldSnapShotJson =
                            _buildInspectorComponent() |> ReactTestTool.createSnapshotJsonStringify;
                          EventToolUI.triggerComponentEvent(
                            _buildHeaderComponent(),
                            _triggerClickAddBox
                          );
                          let newSnapShotJson =
                            _buildInspectorComponent() |> ReactTestTool.createSnapshotJsonStringify;
                          expect(oldSnapShotJson) == newSnapShotJson
                        }
                      )
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
                  describe(
                    "remove currentGameObject should change sceneTree and inspector",
                    () => {
                      test(
                        "change sceneTree ui component",
                        () => {
                          let oldSnapShotJson =
                            _buildEngineSceneTree() |> ReactTestTool.createSnapshotJsonStringify;
                          EventToolUI.triggerComponentEvent(
                            _buildHeaderComponent(),
                            _triggerClickDispose
                          );
                          let newSnapShotJson =
                            _buildEngineSceneTree() |> ReactTestTool.createSnapshotJsonStringify;
                          expect(oldSnapShotJson) != newSnapShotJson
                        }
                      );
                      test(
                        "change inspector ui component",
                        () => {
                          let oldSnapShotJson =
                            _buildInspectorComponent() |> ReactTestTool.createSnapshotJsonStringify;
                          EventToolUI.triggerComponentEvent(
                            _buildHeaderComponent(),
                            _triggerClickDispose
                          );
                          let newSnapShotJson =
                            _buildInspectorComponent() |> ReactTestTool.createSnapshotJsonStringify;
                          expect(oldSnapShotJson) != newSnapShotJson
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
      describe(
        "test logic",
        () =>
          test(
            "the buildSceneGraphDataWithNewGameObject function shouldn't change original array",
            () => {
              let originSceneGraphArray = OperateGameObjectTool.getSceneGraphFromEngine();
              let oldSceneGraphArray = OperateGameObjectTool.getSceneGraphFromEngine();
              OperateGameObjectTool.buildSceneGraphDataWithNewGameObject(
                OperateGameObjectTool.addBoxGameObject(),
                oldSceneGraphArray
              );
              expect(oldSceneGraphArray) == originSceneGraphArray
            }
          )
      )
    }
  );