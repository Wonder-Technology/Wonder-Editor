open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("redo_undo: import package", () => {
    let sandbox = getSandboxDefaultVal();

    let _simulateOnceImportPackage = testFunc => {
      MainEditorLeftHeaderTool.addCube();

      MainEditorAssetHeaderOperateNodeTool.addMaterial();

      ImportPackageTool.testImportPackage(~testFunc, ());
    };

    beforeEach(() => {
      sandbox := createSandbox();

      LoadTool.buildFakeTextEncoder();
      LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
      LoadTool.buildFakeURL(sandbox^);
      LoadTool.buildFakeLoadImage();
      MainEditorAssetTool.buildFakeFileReader();
      MainEditorAssetTool.buildFakeImage();

      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
      );

      let assetTreeData =
        MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
      ();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test undo operate", () => {
      describe("test undo one step", () =>
        describe("step which from second to first", () =>
          testPromise("shouldn't add material asset", () =>
            _simulateOnceImportPackage(() => {
              RedoUndoTool.undoHistoryState();

              BuildComponentTool.buildAssetComponent()
              |> ReactTestTool.createSnapshotAndMatch
              |> resolve;
            })
          )
        )
      );

      describe("test undo two step", () =>
        describe("step which from second to zero", () =>
          testPromise("shouldn't add box", () =>
            _simulateOnceImportPackage(() => {
              RedoUndoTool.undoHistoryState();
              RedoUndoTool.undoHistoryState();

              BuildComponentTool.buildSceneTree(
                TestTool.buildAppStateSceneGraphFromEngine(),
              )
              |> ReactTestTool.createSnapshotAndMatch
              |> resolve;
            })
          )
        )
      );
    });

    describe("test redo operate", () =>
      describe("test redo one step", () =>
        describe(
          "undo step which from second to first, redo step which from first to second",
          () =>
          testPromise("should add material asset", () =>
            _simulateOnceImportPackage(() => {
              RedoUndoTool.undoHistoryState();
              RedoUndoTool.redoHistoryState();

              BuildComponentTool.buildAssetComponent()
              |> ReactTestTool.createSnapshotAndMatch
              |> resolve;
            })
          )
        )
      )
    );
  });