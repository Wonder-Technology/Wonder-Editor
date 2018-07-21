open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: rename", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      
    });
    let _simulateTwiceChangeName = () => {
      let inspectorComponent =
        BuildComponentTool.buildInspectorComponent(
          TestTool.buildAppStateSceneGraphFromEngine(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        );
      let name1 = "gameObject1";
      BaseEventTool.triggerComponentEvent(
        inspectorComponent,
        GameObjectRenameTool.triggerRenameChangeEvent(name1),
      );
      BaseEventTool.triggerComponentEvent(
        inspectorComponent,
        GameObjectRenameTool.triggerRenameBlurEvent(name1),
      );
      let name2 = "gameObject2";
      BaseEventTool.triggerComponentEvent(
        inspectorComponent,
        GameObjectRenameTool.triggerRenameChangeEvent(name2),
      );
      BaseEventTool.triggerComponentEvent(
        inspectorComponent,
        GameObjectRenameTool.triggerRenameBlurEvent(name2),
      );
    };

    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("test simulate set currentSceneTreeNode", () => {
      beforeEach(() => {
        TestTool.closeContractCheck();
        MainEditorSceneTool.initStateAndGl(~sandbox, ());
        MainEditorSceneTool.createDefaultScene(sandbox, () => ());

        SceneTreeNodeDomTool.OperateTwoLayer.getFirstCubeDomIndex()
        |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;
      });
      afterEach(() => TestTool.openContractCheck());

      describe("test undo operate", () => {
        test("test not undo", () => {
          _simulateTwiceChangeName();

          BuildComponentTool.buildInspectorComponent(
            TestTool.buildAppStateSceneGraphFromEngine(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        });
        describe("test undo one step", () =>
          test("step which from second to first", () => {
            _simulateTwiceChangeName();

            StateHistoryToolEditor.undo();

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildAppStateSceneGraphFromEngine(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
        describe("test undo two step", () =>
          test("step which from second to zero", () => {
            _simulateTwiceChangeName();

            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.undo();

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildAppStateSceneGraphFromEngine(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
      });
      describe("test redo operate", () => {
        describe("test redo one step", () => {
          test("if not exec undo, redo one step, not change", () => {
            _simulateTwiceChangeName();

            StateHistoryToolEditor.redo();

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildAppStateSceneGraphFromEngine(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
          test(
            "undo step which from second to zero, redo step which from zero to first",
            () => {
            _simulateTwiceChangeName();

            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.redo();

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildAppStateSceneGraphFromEngine(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
        });
        describe("test redo two step", () =>
          test(
            "undo step which from second to zero, redo step which from zero to second",
            () => {
            _simulateTwiceChangeName();

            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.redo();
            StateHistoryToolEditor.redo();

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildAppStateSceneGraphFromEngine(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
        describe("test redo three step", () =>
          test(
            "test if current step is last step, execute redo, not change", () => {
            _simulateTwiceChangeName();

            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.redo();
            StateHistoryToolEditor.redo();
            StateHistoryToolEditor.redo();

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildAppStateSceneGraphFromEngine(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
      });
    });
  });