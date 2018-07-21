open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: add component", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("prepare first step: set currentSceneTreeNode", () => {
      let _simulateAddSourceInstanceComponent = () => {
        let component =
          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          );
        BaseEventTool.triggerComponentEvent(
          component,
          OperateComponentEventTool.triggerClickAddComponentEvent,
        );
        BaseEventTool.triggerComponentEvent(
          component,
          OperateComponentEventTool.triggerClickAddSourceInstanceEvent,
        );
      };
      beforeEach(() => {
        TestTool.closeContractCheck();
        MainEditorSceneTool.initStateAndGl(~sandbox, ());
        MainEditorSceneTool.createDefaultScene(sandbox, () => ());

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState;

        SceneTreeNodeDomTool.OperateTwoLayer.getFirstCubeDomIndex()
        |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;
      });
      afterEach(() => TestTool.openContractCheck());
      describe("test undo operate", () => {
        test("test not undo", () =>
          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch
        );
        describe("test undo one step", () =>
          test("undo step which from first to zero", () => {
            _simulateAddSourceInstanceComponent();
            StateHistoryToolEditor.undo();
            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
      });
      describe("test redo operate", () =>
        describe("test redo one step", () =>
          test(
            "undo step which from first to zero, redo step which from zero to first",
            () => {
            _simulateAddSourceInstanceComponent();
            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.redo();
            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        )
      );
    });
  });