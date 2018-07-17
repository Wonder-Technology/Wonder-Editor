open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: sceneTree", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("get scene tree from engine", () => {
      let _simulateTwiceDragEvent = () => {
        let firstCameraDomIndex =
          SceneTreeNodeDomTool.OperateTwoLayer.getFirstCameraDomIndex();
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
          SceneTreeEventTool.triggerDragEnter(firstCameraDomIndex),
        );
        BaseEventTool.triggerComponentEvent(
          component,
          SceneTreeEventTool.triggerDragDrop(firstCameraDomIndex),
        );

        let component2 =
          BuildComponentTool.buildSceneTree(
            TestTool.buildAppStateSceneGraphFromEngine(),
          );
        BaseEventTool.triggerComponentEvent(
          component2,
          SceneTreeEventTool.triggerDragStart(firstCubeDomIndex),
        );
        BaseEventTool.triggerComponentEvent(
          component2,
          SceneTreeEventTool.triggerDragEnter(firstCameraDomIndex),
        );
        BaseEventTool.triggerComponentEvent(
          component2,
          SceneTreeEventTool.triggerDragDrop(firstCameraDomIndex),
        );
      };
      beforeEach(() => {
        TestTool.closeContractCheck();
        MainEditorSceneTool.initStateAndGl(~sandbox, ());
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
        );
        StateHistoryToolEditor.clearAllState();
      });
      afterEach(() => TestTool.openContractCheck());
      describe("test undo operate", () => {
        test("test not undo", () => {
          _simulateTwiceDragEvent();

          BuildComponentTool.buildSceneTree(
            TestTool.buildAppStateSceneGraphFromEngine(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        });
        describe("test undo one step", () =>
          test("step which from second to first", () => {
            _simulateTwiceDragEvent();

            StateHistoryToolEditor.undo();

            BuildComponentTool.buildSceneTree(
              TestTool.buildAppStateSceneGraphFromEngine(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
        describe("test undo two step", () =>
          test("step which from second to zero", () => {
            _simulateTwiceDragEvent();
            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.undo();
            BuildComponentTool.buildSceneTree(
              TestTool.buildAppStateSceneGraphFromEngine(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
        describe("test undo three step", () =>
          test("if current step is zero, undo should do nothing", () => {
            _simulateTwiceDragEvent();
            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.undo();
            BuildComponentTool.buildSceneTree(
              TestTool.buildAppStateSceneGraphFromEngine(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
      });
      describe("test redo operate", () => {
        describe("test redo one step", () => {
          test("if not exec undo, redo one step should do nothing", () => {
            _simulateTwiceDragEvent();
            StateHistoryToolEditor.redo();
            BuildComponentTool.buildSceneTree(
              TestTool.buildAppStateSceneGraphFromEngine(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
          test(
            "undo step which from second to zero, redo step which from zero to first",
            () => {
            _simulateTwiceDragEvent();
            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.redo();
            BuildComponentTool.buildSceneTree(
              TestTool.buildAppStateSceneGraphFromEngine(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
        });
        describe("test redo two step", () =>
          test(
            "undo step which from second to zero, redo step which from zero to second",
            () => {
            _simulateTwiceDragEvent();
            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.redo();
            StateHistoryToolEditor.redo();
            BuildComponentTool.buildSceneTree(
              TestTool.buildAppStateSceneGraphFromEngine(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
        describe("test redo three step", () =>
          test("test if current step is last step, redo should do nothing", () => {
            _simulateTwiceDragEvent();

            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.redo();
            StateHistoryToolEditor.redo();
            StateHistoryToolEditor.redo();
            BuildComponentTool.buildSceneTree(
              TestTool.buildAppStateSceneGraphFromEngine(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
      });
    });
    describe("fix bug", () => {
      let execSetCurrentSceneTreeNodeWork = () => {
        let component =
          BuildComponentTool.buildSceneTree(
            TestTool.buildAppStateSceneGraphFromEngine(),
          );
        let secondCubeDomIndex =
          SceneTreeNodeDomTool.OperateTwoLayer.getSecondCubeDomIndex();

        BaseEventTool.triggerComponentEvent(
          component,
          SceneTreeEventTool.triggerClickEvent(secondCubeDomIndex),
        );
      };
      let execChangeMaterialColorWork = (currentGameObjectMaterial, newColor) =>
        MaterialEventTool.triggerChangeColor(
          currentGameObjectMaterial,
          newColor,
        );

      let execChangeTransformWork = () => {
        let currentGameObjectTransform =
          GameObjectTool.getCurrentSceneTreeNodeTransform();
        let transformComponent =
          BuildComponentTool.buildMainEditorTransformComponent(
            TestTool.buildEmptyAppState(),
            currentGameObjectTransform,
          );
        BaseEventTool.triggerComponentEvent(
          transformComponent,
          TransformEventTool.triggerChangeXEvent("11.25"),
        );
        BaseEventTool.triggerComponentEvent(
          transformComponent,
          TransformEventTool.triggerBlurXEvent("11.25"),
        );
      };

      beforeEach(() => {
        MainEditorSceneTool.initStateAndGl(~sandbox, ());
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
        );
      });
      test(
        "the workflow: click treeNote set currentSceneTreeNode -> change material color -> change transform x value -> undo, engineState is error",
        () => {
          let currentGameObjectMaterial =
            GameObjectTool.getCurrentGameObjectMaterial();
          let newColor = {
            "hex": "#7df1e8",
            "rgb": {
              "r": 125,
              "g": 241,
              "b": 232,
            },
          };

          execChangeMaterialColorWork(currentGameObjectMaterial, newColor);
          execChangeTransformWork();
          StateHistoryToolEditor.undo();

          BasicMaterialEngineService.getColor(currentGameObjectMaterial)
          |> StateLogicService.getEngineStateToGetData
          |> Color.getHexString
          |> expect == newColor##hex;
        },
      );
    });
  });