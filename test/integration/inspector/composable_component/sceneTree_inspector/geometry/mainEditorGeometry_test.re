open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform;

let _ =
  describe("MainEditorGeometry component", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentSceneTreeNode", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
        );

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState;
      });

      test("test show select geometry group widget", () => {
        let currentGameObjectGeometry =
          GameObjectTool.getCurrentGameObjectGeometry();

        let component =
          BuildComponentTool.buildGeometry(
            TestTool.buildEmptyAppState(),
            currentGameObjectGeometry,
          );

        BaseEventTool.triggerComponentEvent(
          component,
          MainEditorGeometryTool.triggerClickShowGeometryGroup,
        );

        component |> ReactTestTool.createSnapshotAndMatch;
      });
      test("test hide select geometry group widget", () => {
        let currentGameObjectGeometry =
          GameObjectTool.getCurrentGameObjectGeometry();

        let component =
          BuildComponentTool.buildGeometry(
            TestTool.buildEmptyAppState(),
            currentGameObjectGeometry,
          );

        BaseEventTool.triggerComponentEvent(
          component,
          MainEditorGeometryTool.triggerClickShowGeometryGroup,
        );
        BaseEventTool.triggerComponentEvent(
          component,
          MainEditorGeometryTool.triggerClickHideGeometryGroup,
        );

        component |> ReactTestTool.createSnapshotAndMatch;
      });
    });
  });