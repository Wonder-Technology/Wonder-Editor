open Wonder_jest;

open Expect;

open Expect.Operators;

open NodeAssetType;

open Sinon;

open Js.Promise;

let _ =
  describe("folder inspector", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });

    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test rename", () =>
      test("if rename to the existed name in the same dir, should fail", () => {
        let addedFolderNodeId1 = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addFolder();
        let addedFolderNodeId2 = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addFolder();

        let folder1Name =
          MainEditorAssetFolderNodeTool.getFolderName(addedFolderNodeId1)
          |> StateLogicService.getEditorState;
        let folder2OldName =
          MainEditorAssetFolderNodeTool.getFolderName(addedFolderNodeId2)
          |> StateLogicService.getEditorState;
        AssetInspectorTool.Rename.renameAssetFolderNode(
          ~nodeId=addedFolderNodeId2,
          ~name=folder1Name,
          (),
        );

        (
          MainEditorAssetFolderNodeTool.getFolderName(addedFolderNodeId1)
          |> StateLogicService.getEditorState,
          MainEditorAssetFolderNodeTool.getFolderName(addedFolderNodeId2)
          |> StateLogicService.getEditorState,
        )
        |> expect == (folder1Name, folder2OldName);
      })
    );
  });