open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("Header", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      TestTool.closeContractCheck();
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
    });
    afterEach(() => {
      TestTool.openContractCheck();
      restoreSandbox(refJsObjToSandbox(sandbox^));
    });
    describe("test operate gameObject", () => {
      describe("test dispose gameObject", () => {
        beforeEach(() => {
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
          );
          GameObjectTool.unsafeGetCurrentSceneTreeNode()
          |> GameObjectTool.addFakeVboBufferForGameObject;
        });
        test(
          "if not set current gameObject, log error message and continue", () => {
          let error =
            createMethodStubWithJsObjSandbox(
              sandbox,
              Console.console,
              "error",
            );
          GameObjectTool.clearCurrentSceneTreeNode();
          let component =
            BuildComponentTool.buildHeader(
              TestTool.buildAppStateSceneGraphFromEngine(),
            );
          BaseEventTool.triggerComponentEvent(
            component,
            OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
          );
          LogTool.getMessage(error)
          |> expect
          |> toContain("current gameObject should exist, but actual is None");
        });
        test("else, remove current gameObject from editorState", () => {
          let component =
            BuildComponentTool.buildHeader(
              TestTool.buildAppStateSceneGraphFromEngine(),
            );
          BaseEventTool.triggerComponentEvent(
            component,
            OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
          );
          GameObjectTool.getCurrentSceneTreeNode()
          |> Js.Option.isNone
          |> expect == true;
        });
      });
      describe(
        "fix bug
      remove gameObject has children;
      the children should remove together;",
        () => {
          let buildFourLayerSceneAndGetBox = () => {
            let (box1, box2, box3, box4) =
              SceneTreeTool.buildFourLayerSceneGraphToEngine();

            let firstLayerFirstCubeDomIndex =
              SceneTreeNodeDomTool.OperateFourLayer.getFirstLayerFirstCubeDomIndex();

            SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject(
              firstLayerFirstCubeDomIndex,
            );

            GameObjectTool.unsafeGetCurrentSceneTreeNode()
            |> GameObjectTool.addFakeVboBufferForGameObject;

            (box1, box2, box3, box4);
          };

          test(
            "remove gameObject has children;
            the children should remove together;",
            () => {
              let (box1, box2, box3, box4) = buildFourLayerSceneAndGetBox();

              let engineStateToGetData = StateLogicService.getRunEngineState();
              let currentGameObject =
                GameObjectTool.unsafeGetCurrentSceneTreeNode();

              let component =
                BuildComponentTool.buildHeader(
                  TestTool.buildAppStateSceneGraphFromEngine(),
                );
              BaseEventTool.triggerComponentEvent(
                component,
                OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
              );

              (
                engineStateToGetData
                |> GameObjectTool.isAlive(box1),
                engineStateToGetData
                |> GameObjectTool.isAlive(box3),
                engineStateToGetData
                |> GameObjectTool.isAlive(box4),
              )
              |> expect == (false, false, false);
            },
          );
        },
      );
    });
  });