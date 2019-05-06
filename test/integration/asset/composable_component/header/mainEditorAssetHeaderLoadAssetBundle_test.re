open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("MainEditorAssetHeader->load assetBundle", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorAssetTool.buildFakeFileReader();
    });

    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test load asset bundle", () => {
      testPromise("should add to asset children", () =>
        MainEditorAssetUploadTool.loadOneAssetBundle(~fileName="A.rab", ())
        |> then_(uploadedAssetBundleNodeId =>
             BuildComponentTool.buildAssetChildrenNode()
             |> ReactTestTool.createSnapshotAndMatch
             |> resolve
           )
      );

      testPromise("should store assetBundle arrayBuffer", () => {
        let assetBundle = Js.Typed_array.ArrayBuffer.make(20);

        MainEditorAssetUploadTool.loadOneAssetBundle(
          ~fileName="A.rab",
          ~assetBundle,
          (),
        )
        |> then_(uploadedAssetBundleNodeId =>
             MainEditorAssetAssetBundleNodeTool.getAssetBundle(
               uploadedAssetBundleNodeId,
             )
             |> StateLogicService.getEditorState
             |> expect == assetBundle
             |> resolve
           );
      });

      describe("fix bug", () =>
        testPromise(
          "if load the same asset bundle in the same dir, should handle their name to be unique",
          () =>
          MainEditorAssetUploadTool.loadOneAssetBundle(~fileName="A.rab", ())
          |> then_(uploadedAssetBundleNodeId =>
               MainEditorAssetUploadTool.loadOneAssetBundle(
                 ~fileName="A.rab",
                 (),
               )
               |> then_(uploadedAssetBundleNodeId =>
                    BuildComponentTool.buildAssetChildrenNode()
                    |> ReactTestTool.createSnapshotAndMatch
                    |> resolve
                  )
             )
        )
      );
    });
  });