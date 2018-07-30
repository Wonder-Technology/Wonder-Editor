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
        MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
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
          let targetRunGameObject =
            StateLogicService.getRunEngineState()
            |> MainEditorSceneTool.getBoxByIndex(0);
          let dragedRunGameObject =
            StateLogicService.getRunEngineState()
            |> MainEditorSceneTool.getBoxByIndex(1);
          let targetEditGameObject =
            StateLogicService.getEditEngineState()
            |> MainEditorSceneTool.getBoxByIndex(0);
          let dragedEditGameObject =
            StateLogicService.getEditEngineState()
            |> MainEditorSceneTool.getBoxByIndex(1);
          let firstCubeDomIndex =
            SceneTreeNodeDomTool.OperateTwoLayer.getFirstCubeDomIndex();
          let secondCubeDomIndex =
            SceneTreeNodeDomTool.OperateTwoLayer.getSecondCubeDomIndex();

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
          (
            GameObjectUtils.getParent(
              dragedRunGameObject,
              StateLogicService.getRunEngineState(),
            ),
            GameObjectUtils.getParent(
              dragedEditGameObject,
              StateLogicService.getEditEngineState(),
            ),
          )
          |> expect == (targetRunGameObject, targetEditGameObject);
        },
      );
    });
  });