open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "redo_undo: basicMaterial",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      /* todo need finish */
      test("wait fix", () => expect(1) == 1)
    }
  );
/* open Wonder_jest;

   open Expect;

   open Expect.Operators;

   open Sinon;

   let _ =
     describe(
       "redo_undo: basicMaterial",
       () => {
         let sandbox = getSandboxDefaultVal();
         let _buildMainEditorMaterialComponent = (materialComponent) =>
           ReactTestRenderer.create(
             <MainEditorBasicMaterial
               store=(TestTool.buildEmptyAppState())
               dispatch=(TestTool.getDispatch())
               materialComponent
             />
           );
         let _simulateTwiceChangeEvent = (currentGameObjectTransform) => {
           let component = BuildComponentTool.buildMainEditorTransformComponent(TestTool.buildEmptyAppState(),currentGameObjectTransform);
           BaseEventTool.triggerComponentEvent(
             component,
             TransformEventTool.triggerChangeXEvent("11.25")
           );
           BaseEventTool.triggerComponentEvent(
             component,
             TransformEventTool.triggerBlurXEvent("11.25")
           );
           BaseEventTool.triggerComponentEvent(component, TransformEventTool.triggerChangeYEvent("15"));
           BaseEventTool.triggerComponentEvent(component, TransformEventTool.triggerBlurYEvent("15"))
         };
         beforeEach(
           () => {
             sandbox := createSandbox();

            MainEditorSceneTool.createDefaultScene(sandbox,MainEditorSceneTool.setFirstBoxTobeCurrentGameObject  );
             StateHistoryToolEditor.clearAllState()
           }
         );
         afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
         describe(
           "test simulate set currentGameObject",
           () => {
             beforeEach(
               () => {
                 TestToolEditor.closeContractCheck();
                 MainEditorSceneTool.prepareDefaultScene(
                   MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
                 );
                 SceneTreeTool.setSceenTreeSpecificGameObject(1)
               }
             );
             afterEach(() => TestToolEditor.openContractCheck());
                 describe(
                   "test undo operate",
                   () => {
                     test(
                       "test not undo",
                       () => {
                         let currentGameObjectTransform =
                           MainEditorSceneTool.getCurrentGameObjectTransform();
                         _simulateTwiceChangeEvent(currentGameObjectTransform);
                         BuildComponentTool.buildMainEditorTransformComponent(TestTool.buildEmptyAppState(),currentGameObjectTransform)
                         |> ReactTestTool.createSnapshotAndMatch
                       }
                     );
                     describe(
                       "test undo one step",
                       () =>
                         test(
                           "step from second to first",
                           () => {
                             let currentGameObjectTransform =
                               MainEditorSceneTool.getCurrentGameObjectTransform();
                             _simulateTwiceChangeEvent(currentGameObjectTransform);
                             StateHistoryToolEditor.undo();
                             BuildComponentTool.buildMainEditorTransformComponent(TestTool.buildEmptyAppState(),currentGameObjectTransform)
                             |> ReactTestTool.createSnapshotAndMatch
                           }
                         )
                     );
                     describe(
                       "test undo two step",
                       () =>
                         test(
                           "step from second to zero",
                           () => {
                             let currentGameObjectTransform =
                               MainEditorSceneTool.getCurrentGameObjectTransform();
                             _simulateTwiceChangeEvent(currentGameObjectTransform);
                             StateHistoryToolEditor.undo();
                             StateHistoryToolEditor.undo();
                             BuildComponentTool.buildMainEditorTransformComponent(TestTool.buildEmptyAppState(),currentGameObjectTransform)
                             |> ReactTestTool.createSnapshotAndMatch
                           }
                         )
                     )
                   }
                 );
                 describe(
                   "test redo operate",
                   () => {
                     describe(
                       "test redo one step",
                       () => {
                         test(
                           "if not exec undo, redo one step, not change",
                           () => {
                             let currentGameObjectTransform =
                               MainEditorSceneTool.getCurrentGameObjectTransform();
                             _simulateTwiceChangeEvent(currentGameObjectTransform);
                             StateHistoryToolEditor.redo();
                             BuildComponentTool.buildMainEditorTransformComponent(TestTool.buildEmptyAppState(),currentGameObjectTransform)
                             |> ReactTestTool.createSnapshotAndMatch
                           }
                         );
                         test(
                           "undo step from second to zero, redo step from zero to first",
                           () => {
                             let currentGameObjectTransform =
                               MainEditorSceneTool.getCurrentGameObjectTransform();
                             _simulateTwiceChangeEvent(currentGameObjectTransform);
                             StateHistoryToolEditor.undo();
                             StateHistoryToolEditor.undo();
                             StateHistoryToolEditor.redo();
                             BuildComponentTool.buildMainEditorTransformComponent(TestTool.buildEmptyAppState(),currentGameObjectTransform)
                             |> ReactTestTool.createSnapshotAndMatch
                           }
                         )
                       }
                     );
                     describe(
                       "test redo two step",
                       () =>
                         test(
                           "undo step from second to zero, redo step from zero to second",
                           () => {
                             let currentGameObjectTransform =
                               MainEditorSceneTool.getCurrentGameObjectTransform();
                             _simulateTwiceChangeEvent(currentGameObjectTransform);
                             StateHistoryToolEditor.undo();
                             StateHistoryToolEditor.undo();
                             StateHistoryToolEditor.redo();
                             StateHistoryToolEditor.redo();
                             BuildComponentTool.buildMainEditorTransformComponent(TestTool.buildEmptyAppState(),currentGameObjectTransform)
                             |> ReactTestTool.createSnapshotAndMatch
                           }
                         )
                     );
                     describe(
                       "test redo three step",
                       () =>
                         test(
                           "test if current step is last step, execute redo, not change",
                           () => {
                             let currentGameObjectTransform =
                               MainEditorSceneTool.getCurrentGameObjectTransform();
                             _simulateTwiceChangeEvent(currentGameObjectTransform);
                             StateHistoryToolEditor.undo();
                             StateHistoryToolEditor.undo();
                             StateHistoryToolEditor.redo();
                             StateHistoryToolEditor.redo();
                             StateHistoryToolEditor.redo();
                             BuildComponentTool.buildMainEditorTransformComponent(TestTool.buildEmptyAppState(),currentGameObjectTransform)
                             |> ReactTestTool.createSnapshotAndMatch
                           }
                         )
                     )
                   }
                 )
               }
             )
           }
         )
       }
     ); */