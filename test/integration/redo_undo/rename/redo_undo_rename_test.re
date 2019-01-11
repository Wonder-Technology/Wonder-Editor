open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: rename", () => {
    let sandbox = getSandboxDefaultVal();

    let _getCurrentSceneTreeNodeName = () =>
      GameObjectTool.unsafeGetCurrentSceneTreeNode()
      |> GameObjectEngineService.unsafeGetGameObjectName(
           _,
           StateEngineService.unsafeGetState(),
         );

    let _simulateTwiceChangeName = () => {
      let name1 = "gameObject1";

      SceneTreeInspectorTool.renameGameObject(~name=name1, ());

      let name2 = "gameObject2";

      SceneTreeInspectorTool.renameGameObject(~name=name2, ());

      (name1, name2);
    };

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test undo operate", () => {
      test("test not undo", () => {
        let (name1, name2) = _simulateTwiceChangeName();

        _getCurrentSceneTreeNodeName() |> expect == name2;
      });

      describe("test undo one step", () =>
        test("step which from second to first", () => {
          let (name1, name2) = _simulateTwiceChangeName();

          RedoUndoTool.undoHistoryState();

          _getCurrentSceneTreeNodeName() |> expect == name1;
        })
      );

      describe("test undo two step", () =>
        test("step which from second to zero", () => {
          let sourceName =
            GameObjectTool.unsafeGetCurrentSceneTreeNode()
            |> GameObjectEngineService.unsafeGetGameObjectName(
                 _,
                 StateEngineService.unsafeGetState(),
               );
          let (name1, name2) = _simulateTwiceChangeName();

          RedoUndoTool.undoHistoryState();
          RedoUndoTool.undoHistoryState();

          _getCurrentSceneTreeNodeName() |> expect == sourceName;
        })
      );
    });

    describe("test redo operate", () => {
      describe("test redo one step", () =>
        test(
          "undo step which from second to zero, redo step which from zero to first",
          () => {
          let (name1, name2) = _simulateTwiceChangeName();

          RedoUndoTool.undoHistoryState();
          RedoUndoTool.undoHistoryState();
          RedoUndoTool.redoHistoryState();

          _getCurrentSceneTreeNodeName() |> expect == name1;
        })
      );

      describe("test redo two step", () =>
        test(
          "undo step which from second to zero,redo step which from zero to second",
          () => {
          let (name1, name2) = _simulateTwiceChangeName();

          RedoUndoTool.undoHistoryState();
          RedoUndoTool.undoHistoryState();
          RedoUndoTool.redoHistoryState();
          RedoUndoTool.redoHistoryState();

          _getCurrentSceneTreeNodeName() |> expect == name2;
        })
      );
    });
  });