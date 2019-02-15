open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: transform rotation", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe
    ("fix bug",
    (
    () => {
    /* describe("test undo operate", () =>
      describe("test undo one step", () =>
        test(
          {|
            set current scene tree node to c1;
            change c1->local euler angles;
            undo;

            ui->inspector->transform->c1->local euler angles should be (0,0,0);
            |},
          () => {
            let currentGameObjectTransform =
              GameObjectTool.getCurrentSceneTreeNodeTransform();

            MainEditorTransformTool.changeRotationYAndBlur(
              ~transform=currentGameObjectTransform,
              ~value=10.0,
              (),
            );
            RedoUndoTool.undoHistoryState();

            BuildComponentForCurryTool.buildMainEditorTransformComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          },
        )
      )
    ); */

        test(
          {|
            set current scene tree node to c1;
            change c1->local euler angles;
            undo;

            ui->inspector->transform->c1->local euler angles should be (0,0,0);
            |},
          () => {
            let currentGameObjectTransform =
              GameObjectTool.getCurrentSceneTreeNodeTransform();

            MainEditorTransformTool.changeRotationYAndBlur(
              ~transform=currentGameObjectTransform,
              ~value=10.0,
              (),
            );
            RedoUndoTool.undoHistoryState();

            BuildComponentForCurryTool.buildMainEditorTransformComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          },
        );
        test(
          {|
            set current scene tree node to c1;
            change c1->local euler angles;
            undo;

            ui->inspector->transform->c1->local euler angles should be (0,0,0);
            |},
          () => {
            let currentGameObjectTransform =
              GameObjectTool.getCurrentSceneTreeNodeTransform();

            MainEditorTransformTool.changeRotationYAndBlur(
              ~transform=currentGameObjectTransform,
              ~value=10.0,
              (),
            );
            RedoUndoTool.undoHistoryState();

            BuildComponentForCurryTool.buildMainEditorTransformComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          },
        )

    })
    );

    
  });