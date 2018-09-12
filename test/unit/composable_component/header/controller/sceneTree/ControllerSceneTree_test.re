open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller sceneTree", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
      );

      ControllerTool.stubRequestAnimationFrame(
        createEmptyStubWithJsObjSandbox(sandbox),
      );
      ControllerTool.run();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set parent in engine", () => {
      test("no drag", () =>
        BuildComponentTool.buildSceneTree(
          TestTool.buildAppStateSceneGraphFromEngine(),
        )
        |> ReactTestTool.createSnapshotAndMatch
      );
      test(
        "drag treeNode into target treeNode, set draged gameObject's parent to be target gameObject",
        () => {
          let targetGameObject =
            StateEngineService.unsafeGetState()
            |> MainEditorSceneTool.getBoxByIndex(0);
          let dragedGameObject =
            StateEngineService.unsafeGetState()
            |> MainEditorSceneTool.getBoxByIndex(1);
          let firstCubeDomIndex =
            SceneTreeNodeDomTool.OperateDefaultScene.getFirstCubeDomIndex();
          let secondCubeDomIndex =
            SceneTreeNodeDomTool.OperateDefaultScene.getSecondCubeDomIndex();

          let component =
            BuildComponentTool.buildSceneTree(
              TestTool.buildAppStateSceneGraphFromEngine(),
            );

          BaseEventTool.triggerComponentEvent(
            component,
            SceneTreeEventTool.triggerDragStart(secondCubeDomIndex),
          );
          BaseEventTool.triggerComponentEvent(
            component,
            SceneTreeEventTool.triggerDragEnter(firstCubeDomIndex),
          );
          BaseEventTool.triggerComponentEvent(
            component,
            SceneTreeEventTool.triggerDragDrop(firstCubeDomIndex),
          );

          GameObjectUtils.getParent(
            dragedGameObject,
            StateEngineService.unsafeGetState(),
          )
          |> expect == targetGameObject;
        },
      );
    });
  });