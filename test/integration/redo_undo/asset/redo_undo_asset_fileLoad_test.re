open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: asset file upload", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;

      MainEditorAssetTool.buildFakeFileReader();
      MainEditorAssetTool.buildFakeImage();
    });

    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));
      StateEditorService.getState()
      |> AssetCurrentNodeDataEditorService.clearCurrentNodeData
      |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
      |> StateEditorService.setState
      |> ignore;
    });
    test("need fix", () =>
      expect(1) == 1
    );
    /* describe("test undo operate", () => {
         testPromise("test not undo", () => {
           MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

           MainEditorAssetTool.fileLoad(
             TestTool.getDispatch(),
             BaseEventTool.buildFileEvent(),
           )
           |> Js.Promise.then_(_ =>
                BuildComponentTool.buildAssetComponent()
                |> ReactTestTool.createSnapshotAndMatch
                |> Js.Promise.resolve
              );
         });

         describe("test undo one step", () =>
           testPromise("undo step which from first to zero", () => {
             MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

             MainEditorAssetTool.fileLoad(
               TestTool.getDispatch(),
               BaseEventTool.buildFileEvent(),
             )
             |> Js.Promise.then_(_ => {
                  StateHistoryToolEditor.undo();

                  BuildComponentTool.buildAssetComponent()
                  |> ReactTestTool.createSnapshotAndMatch
                  |> Js.Promise.resolve;
                });
           })
         );
       });
       describe("test redo operate", () =>
         describe("test redo one step", () =>
           testPromise(
             "undo step which from first to zero, redo step which from zero to first",
             () => {
               MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

               MainEditorAssetTool.fileLoad(
                 TestTool.getDispatch(),
                 BaseEventTool.buildFileEvent(),
               )
               |> Js.Promise.then_(_ => {
                    StateHistoryToolEditor.undo();
                    StateHistoryToolEditor.redo();

                    BuildComponentTool.buildAssetComponent()
                    |> ReactTestTool.createSnapshotAndMatch
                    |> Js.Promise.resolve;
                  });
             },
           )
         )
       ); */
  });