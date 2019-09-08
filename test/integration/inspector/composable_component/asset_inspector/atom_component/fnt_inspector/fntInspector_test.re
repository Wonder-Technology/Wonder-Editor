open Wonder_jest;

open Expect;

open Expect.Operators;

open NodeAssetType;

open Sinon;

open Js.Promise;

let _ =
  describe("fnt inspector", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.prepareScene(sandbox);

      MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });

    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test show value", () => {
      test("test show default value", () => {
        let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addFnt();

        MainEditorAssetChildrenNodeTool.selectFntNode(
          ~nodeId=addedNodeId,
          (),
        );

        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test("test show specific value", () => {
        let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addFnt();
        FntInspectorTool.setNodeData(
          ~nodeId=addedNodeId,
          ~name="aaa",
          ~fntContent=FntInspectorTool.buildFntContent1(),
          (),
        )
        |> StateEditorService.setState
        |> ignore;

        MainEditorAssetChildrenNodeTool.selectFntNode(
          ~nodeId=addedNodeId,
          (),
        );

        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      });
    });

    describe("test rename", () =>
      describe("name should be unique in current folder", () =>
        test(
          "if has fnt asset with the same new name in different folders, rename should success",
          () => {
            let warn =
              createMethodStubWithJsObjSandbox(
                sandbox,
                ConsoleTool.console,
                "warn",
              );
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();

            let addedNodeId1 = MainEditorAssetIdTool.getNewAssetId();
            MainEditorAssetHeaderOperateNodeTool.addFnt();

            let addedNodeId2 = MainEditorAssetIdTool.getNewAssetId();
            MainEditorAssetTreeTool.Select.selectFolderNode(
              ~nodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                  assetTreeData,
                ),
              (),
            );
            MainEditorAssetHeaderOperateNodeTool.addFnt();

            let node2NewName = "aaa";
            AssetInspectorTool.Rename.renameAssetFntNode(
              ~name=node2NewName,
              ~nodeId=addedNodeId1,
              (),
            );

            AssetInspectorTool.Rename.renameAssetFntNode(
              ~name=node2NewName,
              ~nodeId=addedNodeId2,
              (),
            );

            (
              warn |> getCallCount,
              FntNodeAssetService.getNodeName(
                OperateTreeAssetEditorService.unsafeFindNodeById(addedNodeId2)
                |> StateLogicService.getEditorState,
              ),
            )
            |> expect == (0, node2NewName);
          },
        )
      )
    );

    describe("test submit all", () => {
      let _prepare = () => {
        let addedNodeId1 = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addFnt();

        let addedNodeId2 = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetTreeTool.Select.selectFolderNode(
          ~nodeId=
            MainEditorAssetTreeTool.getRootNodeId(
              StateEditorService.getState(),
            ),
          (),
        );
        MainEditorAssetHeaderOperateNodeTool.addFnt();

        (addedNodeId1, addedNodeId2);
      };

      let _prepareAndRename = () => {
        let (addedNodeId1, addedNodeId2) = _prepare();

        let node2OldName =
          FntNodeAssetEditorService.getNodeName(addedNodeId2)
          |> StateLogicService.getEditorState;
        let node2NewName = "new name for node2";

        AssetInspectorTool.Rename.renameAssetFntNode(
          ~name=node2NewName,
          ~nodeId=addedNodeId2,
          (),
        );

        ((addedNodeId1, addedNodeId2), (node2OldName, node2NewName));
      };

      let _submitAll = (addedNodeId2, node2OldName) => {
        let fntContent = FntInspectorTool.buildFntContent1();
        FntInspectorTool.submitAll(
          ~nodeId=addedNodeId2,
          ~originFntName=node2OldName,
          ~fntContent,
          (),
        );

        fntContent;
      };

      test("update asset tree", () => {
        let ((addedNodeId1, addedNodeId2), (node2OldName, node2NewName)) =
          _prepareAndRename();

        let fntContent = _submitAll(addedNodeId2, node2OldName);

        let editorState = StateEditorService.getState();
        (
          FntNodeAssetEditorService.getNodeName(addedNodeId2, editorState),
          FntNodeAssetEditorService.getFntContent(addedNodeId2, editorState)
          |> SerializeService.serializeFunction,
        )
        |> expect == (node2NewName, fntContent);
      });

      describe("update fnt data in engineState", () => {
        test("if the fnt data isn't added to engineState, not update it", () => {
          let ((addedNodeId1, addedNodeId2), (node2OldName, node2NewName)) =
            _prepareAndRename();

          let fntContent = _submitAll(addedNodeId2, node2OldName);

          (
            AssetIMGUIEngineService.hasSettedAssetFntData(node2OldName)
            |> StateLogicService.getEngineStateToGetData,
            AssetIMGUIEngineService.hasSettedAssetFntData(node2NewName)
            |> StateLogicService.getEngineStateToGetData,
          )
          |> expect == (false, false);
        });

        describe("else, update it", () =>
          test("test", () => {
            let (addedNodeId1, addedNodeId2) = _prepare();
            FntInspectorTool.setSettedAssetFntData(addedNodeId2);
            let node2OldName =
              FntNodeAssetEditorService.getNodeName(addedNodeId2)
              |> StateLogicService.getEditorState;
            let node2NewName = "new name for node2";
            AssetInspectorTool.Rename.renameAssetFntNode(
              ~name=node2NewName,
              ~nodeId=addedNodeId2,
              (),
            );

            let fntContent = _submitAll(addedNodeId2, node2OldName);

            let engineState = StateEngineService.unsafeGetState();
            (
              AssetIMGUIEngineService.hasSettedAssetFntData(
                node2NewName,
                engineState,
              ),
              AssetIMGUIEngineService.unsafeGetSettedAssetFntContent(
                engineState,
              ),
            )
            |> expect == (true, fntContent);
          })
        );
      });
    });
  });