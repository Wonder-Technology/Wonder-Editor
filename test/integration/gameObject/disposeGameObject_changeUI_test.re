open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("test dispose gameObject", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~loopPipelines=
              {|
                [
                    {
                        "name": "default",
                        "jobs": [
                            {
                                "name": "dispose"
                            }
                        ]
                    }
                ]
            |},
            (),
          ),
        (),
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
      );

    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe(
      "remove currentSceneTreeNode should change sceneTree and inspector", () => {
      test("change sceneTree ui component", () => {
        let oldSnapShotJson =
          BuildComponentTool.buildSceneTree(
            TestTool.buildAppStateSceneGraphFromEngine(),
          )
          |> ReactTestTool.createSnapshotJsonStringify;
        BaseEventTool.triggerComponentEvent(
          BuildComponentTool.buildHeader(
            TestTool.buildAppStateSceneGraphFromEngine(),
          ),
          OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
        );
        let newSnapShotJson =
          BuildComponentTool.buildSceneTree(
            TestTool.buildAppStateSceneGraphFromEngine(),
          )
          |> ReactTestTool.createSnapshotJsonStringify;
        expect(oldSnapShotJson) != newSnapShotJson;
      });
      test("change inspector ui component", () => {
        let oldSnapShotJson =
          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotJsonStringify;
        BaseEventTool.triggerComponentEvent(
          BuildComponentTool.buildHeader(
            TestTool.buildAppStateSceneGraphFromEngine(),
          ),
          OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
        );
        let newSnapShotJson =
          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotJsonStringify;
        expect(oldSnapShotJson) != newSnapShotJson;
      });
    });
  });