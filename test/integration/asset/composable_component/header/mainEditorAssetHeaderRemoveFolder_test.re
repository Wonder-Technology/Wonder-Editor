open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("MainEditorAssetHeader->remove folder", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

      InspectorCanvasTool.prepareInspectorEngineState(sandbox);

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });

    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));
      StateEditorService.getState()
      |> CurrentNodeIdAssetEditorService.clearCurrentNodeId
      |> SelectedFolderNodeIdInAssetTreeAssetEditorService.clearSelectedFolderNodeIdInAssetTree
      |> StateEditorService.setState
      |> ignore;
    });

    test("click remove-button should remove folder from assetTreeRoot", () => {
      let assetTreeData =
        MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();
      let component = BuildComponentTool.buildAssetComponent();

      MainEditorAssetHeaderOperateNodeTool.removeFolderNode(
        ~folderNodeId=
          MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
            assetTreeData,
          ),
        (),
      );

      BuildComponentTool.buildAssetComponent()
      |> ReactTestTool.createSnapshotAndMatch;
    });

    describe("should remove folder's all children", () => {
      beforeEach(() => {
        MainEditorSceneTool.initStateWithJob(
          ~sandbox,
          ~isBuildFakeDom=false,
          ~noWorkerJobRecord=
            NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
              ~loopPipelines=
                {|
                   [
                       {
                           "name": "default",
                           "jobs": [
                               {
                                   "name": "dispose"
                               }
                           ]
                       }
                   ]
               |},
              (),
            ),
          (),
        );
        MainEditorSceneTool.prepareScene(sandbox);
      });

      test("test remove material asset child", () => {
        open NodeAssetType;

        let addedFolderNodeId = MainEditorAssetIdTool.getNewAssetId();

        MainEditorAssetHeaderOperateNodeTool.addFolder();

        MainEditorAssetTreeTool.Select.selectFolderNode(
          ~nodeId=addedFolderNodeId,
          (),
        );

        let materialNodeId = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addMaterial();

        let {snapshotImageDataIndex} =
          StateEditorService.getState()
          |> OperateTreeAssetEditorService.unsafeFindNodeById(materialNodeId)
          |> MaterialNodeAssetService.getNodeData;

        MainEditorAssetHeaderOperateNodeTool.removeFolderNode(
          ~folderNodeId=addedFolderNodeId,
          (),
        );

        StateEditorService.getState()
        |> ImageDataMapAssetEditorService.getData(snapshotImageDataIndex)
        |> Js.Option.isNone
        |> expect == true;
      });
      describe("test remove texture asset child", () => {
        beforeEach(() => {
          MainEditorAssetTool.buildFakeImage();
          MainEditorAssetTool.buildFakeFileReader();
        });

        testPromise("test remove it in child folder", () => {
          let addedFolderNodeId1 = MainEditorAssetIdTool.getNewAssetId();

          MainEditorAssetHeaderOperateNodeTool.addFolder();

          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=addedFolderNodeId1,
            (),
          );

          let addedFolderNodeId2 = MainEditorAssetIdTool.getNewAssetId();

          MainEditorAssetHeaderOperateNodeTool.addFolder();

          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=addedFolderNodeId2,
            (),
          );

          MainEditorAssetUploadTool.loadOneTexture()
          |> Js.Promise.then_(uploadedTextureNodeId1 => {
               let textureComponent =
                 MainEditorAssetTextureNodeTool.getTextureComponent(
                   uploadedTextureNodeId1,
                 )
                 |> StateLogicService.getEditorState;

               MainEditorAssetHeaderOperateNodeTool.removeFolderNode(
                 ~folderNodeId=addedFolderNodeId1,
                 (),
               );

               BasicSourceTextureToolEngine.isAlive(textureComponent)
               |> StateLogicService.getEngineStateToGetData
               |> expect == false
               |> resolve;
             });
        });
      });
    });
  });