open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("MainEditorAssetHeader->remove assetBundle", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorAssetTool.buildFakeFileReader();
    });

    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe(
      {|
        select assetBundle;
        click remove-button;
            |},
      () =>
      testPromise("should remove it from assetTreeRoot", () =>
        MainEditorAssetUploadTool.loadOneAssetBundle()
        |> then_(uploadedAssetBundleNodeId => {
             MainEditorAssetHeaderOperateNodeTool.removeAssetBundleNode(
               ~assetBundleNodeId=uploadedAssetBundleNodeId,
               (),
             );

             BuildComponentTool.buildAssetChildrenNode()
             |> ReactTestTool.createSnapshotAndMatch
             |> resolve;
           })
      )
    );
  });