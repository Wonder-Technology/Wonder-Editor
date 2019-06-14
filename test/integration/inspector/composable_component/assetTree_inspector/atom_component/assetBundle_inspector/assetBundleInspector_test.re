open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("assetBundle inspector", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorAssetTool.buildFakeFileReader();
    });

    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test rename", () =>
      testPromise("test", () =>
        MainEditorAssetUploadTool.loadOneAssetBundle(~fileName="A.rab", ())
        |> then_(uploadedAssetBundleNodeId => {
             MainEditorAssetChildrenNodeTool.selectAssetBundleNode(
               ~nodeId=uploadedAssetBundleNodeId,
               (),
             );

             let newName = "B";

             AssetTreeInspectorTool.Rename.renameAssetAssetBundleNode(
               ~nodeId=uploadedAssetBundleNodeId,
               ~name=newName,
               (),
             );

             MainEditorAssetAssetBundleNodeTool.getName(
               uploadedAssetBundleNodeId,
             )
             |> StateLogicService.getEditorState
             |> expect == newName
             |> resolve;
           })
      )
    );

    describe("show type", () => {
      testPromise("test type===RAB", () =>
        MainEditorAssetUploadTool.loadOneAssetBundle(~fileName="A.rab", ())
        |> then_(uploadedAssetBundleNodeId => {
             MainEditorAssetChildrenNodeTool.selectAssetBundleNode(
               ~nodeId=uploadedAssetBundleNodeId,
               (),
             );

             BuildComponentTool.buildInspectorComponent(
               TestTool.buildEmptyAppState(),
               InspectorTool.buildFakeAllShowComponentConfig(),
             )
             |> ReactTestTool.createSnapshotAndMatch
             |> resolve;
           })
      );
      testPromise("test type===WAB", () =>
        MainEditorAssetUploadTool.loadOneAssetBundle(~fileName="A.wab", ())
        |> then_(uploadedAssetBundleNodeId => {
             MainEditorAssetChildrenNodeTool.selectAssetBundleNode(
               ~nodeId=uploadedAssetBundleNodeId,
               (),
             );

             BuildComponentTool.buildInspectorComponent(
               TestTool.buildEmptyAppState(),
               InspectorTool.buildFakeAllShowComponentConfig(),
             )
             |> ReactTestTool.createSnapshotAndMatch
             |> resolve;
           })
      );
    });
  });