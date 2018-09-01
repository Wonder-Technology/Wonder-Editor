open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: controller workflow", () => {
    let sandbox = getSandboxDefaultVal();
    let _addGameObjectWithCount = count =>
      Array.make(count, 0)
      |> Array.iter(_ =>
           BaseEventTool.triggerComponentEvent(
             BuildComponentTool.buildHeader(
               TestTool.buildAppStateSceneGraphFromEngine(),
             ),
             OperateGameObjectEventTool.triggerClickAddBox,
           )
         );
    beforeEach(() => {
      sandbox := createSandbox();
      TestTool.closeContractCheck();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
      );
      ControllerTool.stubRequestAnimationFrame(
        createEmptyStubWithJsObjSandbox(sandbox),
      );
      ControllerTool.stubCancelAnimationFrame(
        createEmptyStubWithJsObjSandbox(sandbox),
      );
    });
    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));
      TestTool.openContractCheck();
    });
    test("init default scene", () =>
      StateLogicService.getEditEngineState()
      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
      |> Js.Array.length
      |> expect == 4
    );
    test("add two gameObject", () => {
      _addGameObjectWithCount(2);


      StateLogicService.getEditEngineState()
      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
      |> Js.Array.length
      |> expect == 6;
    });
    test("undo one step", () => {
      _addGameObjectWithCount(2);

      StateHistoryToolEditor.undo();


      StateLogicService.getEditEngineState()
      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
      |> Js.Array.length
      |> expect == 5;
    });
    test("click run button(which store all stack), add three gameObject", () => {
      _addGameObjectWithCount(2);


      StateHistoryToolEditor.undo();

      ControllerTool.run();


      _addGameObjectWithCount(3);


      StateLogicService.getEditEngineState()
      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
      |> Js.Array.length
      |> expect == 8;
    });
    test("undo one step", () => {
      _addGameObjectWithCount(2);


      StateHistoryToolEditor.undo();


      ControllerTool.run();


      _addGameObjectWithCount(3);


      StateHistoryToolEditor.undo();


      StateLogicService.getEditEngineState()
      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
      |> Js.Array.length
      |> expect == 7;
    });
    test("redo one step", () => {
      _addGameObjectWithCount(2);
      StateHistoryToolEditor.undo();
      ControllerTool.run();
      _addGameObjectWithCount(3);
      StateHistoryToolEditor.undo();
      StateHistoryToolEditor.redo();
      StateLogicService.getEditEngineState()
      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
      |> Js.Array.length
      |> expect == 8;
    });
    test("click stop button(which restore all stack)", () => {
      _addGameObjectWithCount(2);
      
      StateHistoryToolEditor.undo();


      ControllerTool.run();


      _addGameObjectWithCount(3);


      StateHistoryToolEditor.undo();
      StateHistoryToolEditor.redo();


      ControllerTool.stop();
      StateLogicService.getEditEngineState()
      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
      |> Js.Array.length
      |> expect == 5;
    });
    test("undo one step(which back to the initial state)", () => {
      _addGameObjectWithCount(2);
      StateHistoryToolEditor.undo();
      ControllerTool.run();
      _addGameObjectWithCount(3);
      StateHistoryToolEditor.undo();
      StateHistoryToolEditor.redo();
      ControllerTool.stop();
      StateHistoryToolEditor.undo();
      StateLogicService.getEditEngineState()
      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
      |> Js.Array.length
      |> expect == 4;
    });
    test("redo two step", () => {
      _addGameObjectWithCount(2);
      StateHistoryToolEditor.undo();
      ControllerTool.run();
      _addGameObjectWithCount(3);
      StateHistoryToolEditor.undo();
      StateHistoryToolEditor.redo();
      ControllerTool.stop();
      StateHistoryToolEditor.redo();
      StateHistoryToolEditor.redo();
      StateLogicService.getEditEngineState()
      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
      |> Js.Array.length
      |> expect == 6;
    });
  });