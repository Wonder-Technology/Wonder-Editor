open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: controller engine", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      TestTool.closeContractCheck();
    });
    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));
      TestTool.openContractCheck();
    });
    describe("test undo operate", () => {
      describe("test add gameObject", () => {
        beforeEach(() => {
          MainEditorSceneTool.initState(~sandbox, ());
          CurrentSelectSourceEditorService.setCurrentSelectSource(
            EditorType.SceneTree,
          )
          |> StateLogicService.getAndSetEditorState;
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
          );
          ControllerTool.stubRequestAnimationFrame(
            createEmptyStubWithJsObjSandbox(sandbox),
          );
          ControllerTool.run();
        });
        test("test undo one step which from second to first", () => {
          HeaderTool.triggerAddBox();
          HeaderTool.triggerAddBox();

          StateHistoryToolEditor.undo();
          (
            StateLogicService.getEditEngineState()
            |> GameObjectUtils.getChildren(
                 MainEditorSceneTool.unsafeGetScene(),
               )
            |> Js.Array.length,
            StateLogicService.getRunEngineState()
            |> GameObjectUtils.getChildren(
                 MainEditorSceneTool.unsafeGetScene(),
               )
            |> Js.Array.length,
          )
          |> expect == (6, 5);
        });
      });
      describe("test dispose gameObject from engine", () => {
        beforeEach(() => {
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
          ControllerTool.stubRequestAnimationFrame(
            createEmptyStubWithJsObjSandbox(sandbox),
          );
          ControllerTool.run();
        });

        test("test undo one step which from second to first", () => {
          HeaderTool.triggerDisposeBox();
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode();

          HeaderTool.triggerDisposeBox();
          StateHistoryToolEditor.undo();
          (
            StateLogicService.getEditEngineState()
            |> GameObjectUtils.getChildren(
                 MainEditorSceneTool.unsafeGetScene(),
               )
            |> Js.Array.length,
            StateLogicService.getRunEngineState()
            |> GameObjectUtils.getChildren(
                 MainEditorSceneTool.unsafeGetScene(),
               )
            |> Js.Array.length,
          )
          |> expect == (4, 3);
        });
      });
      describe("test transform", () => {
        beforeEach(() => {
          MainEditorSceneTool.initState(~sandbox, ());
          CurrentSelectSourceEditorService.setCurrentSelectSource(
            EditorType.SceneTree,
          )
          |> StateLogicService.getAndSetEditorState;
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
          );
          ControllerTool.stubRequestAnimationFrame(
            createEmptyStubWithJsObjSandbox(sandbox),
          );
          ControllerTool.run();
        });

        test("test undo one step which from second to first", () => {
          let currentGameObjectTransform =
            GameObjectTool.getCurrentSceneTreeNodeTransform();
          let firstValue = "155";
          let secondValue = "200";
          TransformEventTool.simulateTwiceChangePosition(
            ~firstValue,
            ~secondValue,
            (),
          );
          StateHistoryToolEditor.undo();
          (
            StateLogicService.getEditEngineState()
            |> TransformEngineService.getLocalPosition(
                 DiffComponentTool.getEditEngineComponent(
                   DiffType.GameObject,
                   GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                 ),
               ),
            StateLogicService.getRunEngineState()
            |> TransformEngineService.getLocalPosition(
                 GameObjectTool.unsafeGetCurrentSceneTreeNode(),
               ),
          )
          |> expect == ((155., 0., 0.), (155., 0., 0.));
        });
      });
      describe("fix bug", () => {
        beforeEach(() => {
          MainEditorSceneTool.initState(~sandbox, ());

          CurrentSelectSourceEditorService.setCurrentSelectSource(
            EditorType.SceneTree,
          )
          |> StateLogicService.getAndSetEditorState;
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
          );
          ControllerTool.stubRequestAnimationFrame(
            createEmptyStubWithJsObjSandbox(sandbox),
          );
          ControllerTool.run();
        });
        test(
          "the undo operate should deep copy current editEngineState and runEngineState",
          () => {
          let currentGameObjectTransform =
            GameObjectTool.getCurrentSceneTreeNodeTransform();
          let firstValue = "150";
          let secondValue = "200";
          TransformEventTool.simulateTwiceChangePosition(
            ~firstValue,
            ~secondValue,
            (),
          );
          StateHistoryToolEditor.undo();
          StateHistoryToolEditor.redo();
          (
            StateLogicService.getEditEngineState()
            |> TransformEngineService.getLocalPosition(
                 DiffComponentTool.getEditEngineComponent(
                   DiffType.GameObject,
                   GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                 ),
               ),
            StateLogicService.getRunEngineState()
            |> TransformEngineService.getLocalPosition(
                 GameObjectTool.unsafeGetCurrentSceneTreeNode(),
               ),
          )
          |> expect == ((150., 200., 0.), (150., 200., 0.));
        });
      });
    });
  });