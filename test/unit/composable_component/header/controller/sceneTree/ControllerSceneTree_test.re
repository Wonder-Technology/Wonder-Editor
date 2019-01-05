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
          TestTool.buildEmptyAppState(),
        )
        |> ReactTestTool.createSnapshotAndMatch
      );
      test(
        "drag treeNode into target treeNode, set dragged gameObject's parent to be target gameObject",
        () => {
          let targetGameObject =
            StateEngineService.unsafeGetState()
            |> MainEditorSceneTool.getBoxByIndex(0);
          let draggedGameObject =
            StateEngineService.unsafeGetState()
            |> MainEditorSceneTool.getBoxByIndex(1);

          MainEditorSceneTreeTool.Drag.dragGameObjectIntoGameObject(
            ~sourceGameObject=draggedGameObject,
            ~targetGameObject,
            (),
          );

          GameObjectUtils.getParent(
            draggedGameObject,
            StateEngineService.unsafeGetState(),
          )
          |> expect == targetGameObject;
        },
      );
    });
  });