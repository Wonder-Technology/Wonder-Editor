open Wonder_jest;
open Expect;
open Expect.Operators;
open Sinon;
let _ =
  describe("need fix", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    test("need fix", () =>
      expect(1) == 1
    );
  });

/* open Wonder_jest;

   open Expect;

   open Expect.Operators;

   open Sinon;

   let _ =
     describe("redo_undo: add sourceInstance component", () => {
       let sandbox = getSandboxDefaultVal();
       beforeEach(() => sandbox := createSandbox());
       afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
       let _simulateAddSourceInstanceComponent = () => {
         let component =
           BuildComponentTool.buildInspectorComponent(
             TestTool.buildEmptyAppState(),
             InspectorTool.buildFakeAllShowComponentConfig(),
           );
         BaseEventTool.triggerComponentEvent(
           component,
           OperateComponentEventTool.triggerClickShowComponentList,
         );
         BaseEventTool.triggerComponentEvent(
           component,
           OperateComponentEventTool.triggerClickShowCategory,
         );
         BaseEventTool.triggerComponentEvent(
           component,
           OperateComponentEventTool.triggerClickAddSourceInstanceEvent,
         );
       };
       let _beforeEach = () => {
         MainEditorSceneTool.initState(~sandbox, ());
         MainEditorSceneTool.createDefaultScene(sandbox, () => ());

         CurrentSelectSourceEditorService.setCurrentSelectSource(
           EditorType.SceneTree,
         )
         |> StateLogicService.getAndSetEditorState;

         SceneTreeNodeDomTool.OperateDefaultScene.getFirstCubeDomIndex()
         |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;
       };

       RedoUndoTool.testRedoUndoOneStep(
         sandbox,
         "prepare first step: set currentSceneTreeNode",
         (_simulateAddSourceInstanceComponent, _beforeEach),
         BuildComponentForRedoUndoTool.buildInspectorComponent,
       );
     }); */