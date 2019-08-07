open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open EventType;

let _ =
  describe("init hotKeys job", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe(
      "bind document hotKeys event, need add hot-key into SettingTool", () => {
      let triggerRedoHotKeyEvent = () =>
        InitHotKeysJobTool.execKeyboardEvent("keydown", 89, ~ctrlKey=true, ())
        |> ignore;

      let triggerUndoHotKeyEvent = () =>
        InitHotKeysJobTool.execKeyboardEvent("keydown", 90, ~ctrlKey=true, ())
        |> ignore;

      let triggerCloneHotKeyEvent = () =>
        InitHotKeysJobTool.execKeyboardEvent("keydown", 68, ~ctrlKey=true, ())
        |> ignore;

      let triggerDeleteHotKeyEvent = () =>
        InitHotKeysJobTool.execKeyboardEvent("keydown", 46, ()) |> ignore;

      let triggerTranslationHotKeyEvent = () =>
        InitHotKeysJobTool.execKeyboardEvent("keydown", 49, ()) |> ignore;

      let triggerRotationHotKeyEvent = () =>
        InitHotKeysJobTool.execKeyboardEvent("keydown", 50, ()) |> ignore;

      let triggerScaleHotKeyEvent = () =>
        InitHotKeysJobTool.execKeyboardEvent("keydown", 51, ()) |> ignore;

      beforeEach(() => {
        InitHotKeysJobTool.prepareKeyboardEvent(~sandbox, ());

        EventTool.buildFakeDocumentSetToWindow();
      });
      afterEach(() => EventTool.restoreHotKeys());

      describe("test bind undo hot-key", () => {
        beforeEach(() => {
          MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

          MainUtils._handleEngineState
          |> StateLogicService.getAndSetEngineState;
        });

        test("key down ctrl+z, should execute undo operate", () => {
          MainEditorLeftHeaderTool.addEmptyGameObject();

          triggerUndoHotKeyEvent();

          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        });
      });

      describe("test bind clone hot-key", () => {
        beforeEach(() => {
          MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

          MainUtils._handleEngineState
          |> StateLogicService.getAndSetEngineState;
        });

        test("key down ctrl+d, should execute clone operate", () => {
          EventListenerTool.buildFakeDom()
          |> EventListenerTool.stubGetElementByIdReturnFakeDom;
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();

          triggerCloneHotKeyEvent();

          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        });
      });

      describe("test bind redo hot-key", () => {
        beforeEach(() => {
          MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

          MainUtils._handleEngineState
          |> StateLogicService.getAndSetEngineState;
        });

        test("key down ctrl+y, should execute redo operate", () => {
          MainEditorLeftHeaderTool.addEmptyGameObject();
          MainEditorLeftHeaderTool.addEmptyGameObject();

          triggerUndoHotKeyEvent();
          triggerUndoHotKeyEvent();
          triggerRedoHotKeyEvent();

          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        });
      });

      describe("test bind delete hot-key", () => {
        beforeEach(() => {
          MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

          MainUtils._handleEngineState
          |> StateLogicService.getAndSetEngineState;
        });

        describe("key down delete", () => {
          test("if has currentSceneTreeNode, should delete it", () => {
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();

            triggerDeleteHotKeyEvent();

            BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
            |> ReactTestTool.createSnapshotAndMatch;
          });
          test("else if has current asset tree node, should delete it", () => {
            GameObjectTool.clearCurrentSceneTreeNode();
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();
            MainEditorAssetTreeTool.Select.selectFolderNode(
              ~nodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                  assetTreeData,
                ),
              (),
            );

            triggerDeleteHotKeyEvent();

            BuildComponentTool.buildAssetTree()
            |> ReactTestTool.createSnapshotAndMatch;
          });
        });
      });

      describe("test bind translation hot-key", () => {
        beforeEach(() => {
          MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

          MainUtils._handleEngineState
          |> StateLogicService.getAndSetEngineState;
        });

        test(
          "key down 1, should set current transform gizmo type is translation",
          () => {
          StateEditorService.getState()
          |> CurrentTransformGizmoSceneViewEditorService.mark(
               SceneViewType.Scale,
             )
          |> StateEditorService.setState;

          triggerTranslationHotKeyEvent();

          StateEditorService.getState()
          |> CurrentTransformGizmoSceneViewEditorService.getCurrentGizmoType
          |> expect == SceneViewType.Translation;
        });
      });

      describe("test bind rotation hot-key", () => {
        beforeEach(() => {
          MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

          MainUtils._handleEngineState
          |> StateLogicService.getAndSetEngineState;
        });

        test(
          "key down 2, should set current transform gizmo type is rotation", () => {
          StateEditorService.getState()
          |> CurrentTransformGizmoSceneViewEditorService.mark(
               SceneViewType.Scale,
             )
          |> StateEditorService.setState;

          triggerRotationHotKeyEvent();

          StateEditorService.getState()
          |> CurrentTransformGizmoSceneViewEditorService.getCurrentGizmoType
          |> expect == SceneViewType.Rotation;
        });
      });

      describe("test bind scale hot-key", () => {
        beforeEach(() => {
          MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

          MainUtils._handleEngineState
          |> StateLogicService.getAndSetEngineState;
        });

        test(
          "key down 3, should set current transform gizmo type is scale", () => {
          StateEditorService.getState()
          |> CurrentTransformGizmoSceneViewEditorService.mark(
               SceneViewType.Translation,
             )
          |> StateEditorService.setState;

          triggerScaleHotKeyEvent();

          StateEditorService.getState()
          |> CurrentTransformGizmoSceneViewEditorService.getCurrentGizmoType
          |> expect == SceneViewType.Scale;
        });
      });
    });
  });