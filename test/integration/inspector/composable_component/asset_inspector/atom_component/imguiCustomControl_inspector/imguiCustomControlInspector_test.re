open Wonder_jest;

open Expect;

open Expect.Operators;

open NodeAssetType;

open Sinon;

open Js.Promise;

let _ =
  describe("imgui customControl inspector", () => {
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
        MainEditorAssetHeaderOperateNodeTool.addIMGUICustomControl();

        MainEditorAssetChildrenNodeTool.selectIMGUICustomControlNode(
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
        MainEditorAssetHeaderOperateNodeTool.addIMGUICustomControl();
        IMGUICustomControlInspectorTool.setNodeData(
          ~nodeId=addedNodeId,
          ~name="aaa",
          ~customControlFunc=
            IMGUICustomControlInspectorTool.buildCustomControlFunc1(),
          (),
        )
        |> StateEditorService.setState
        |> ignore;

        MainEditorAssetChildrenNodeTool.selectIMGUICustomControlNode(
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
      describe("new name should be unique in imgui customControl assets", () =>
        test(
          "if has imgui customControl asset with the same new name in different folders, rename should fail",
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
            MainEditorAssetHeaderOperateNodeTool.addIMGUICustomControl();

            let addedNodeId2 = MainEditorAssetIdTool.getNewAssetId();
            MainEditorAssetTreeTool.Select.selectFolderNode(
              ~nodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                  assetTreeData,
                ),
              (),
            );
            MainEditorAssetHeaderOperateNodeTool.addIMGUICustomControl();
            let node2OldName =
              IMGUICustomControlNodeAssetEditorService.getNodeName(
                addedNodeId2,
              )
              |> StateLogicService.getEditorState;

            AssetInspectorTool.Rename.renameAssetIMGUICustomControlNode(
              ~name=
                IMGUICustomControlNodeAssetService.getNodeName(
                  OperateTreeAssetEditorService.unsafeFindNodeById(
                    addedNodeId1,
                  )
                  |> StateLogicService.getEditorState,
                ),
              ~nodeId=addedNodeId2,
              (),
            );

            (
              warn |> getCallCount,
              IMGUICustomControlNodeAssetService.getNodeName(
                OperateTreeAssetEditorService.unsafeFindNodeById(addedNodeId2)
                |> StateLogicService.getEditorState,
              ),
            )
            |> expect == (1, node2OldName);
          },
        )
      )
    );

    describe("test submit all", () => {
      let _prepare = () => {
        let addedNodeId1 = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addIMGUICustomControl();

        let addedNodeId2 = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetTreeTool.Select.selectFolderNode(
          ~nodeId=
            MainEditorAssetTreeTool.getRootNodeId(
              StateEditorService.getState(),
            ),
          (),
        );
        MainEditorAssetHeaderOperateNodeTool.addIMGUICustomControl();

        (addedNodeId1, addedNodeId2);
      };

      let _prepareAndRename = () => {
        let (addedNodeId1, addedNodeId2) = _prepare();

        let node2OldName =
          IMGUICustomControlNodeAssetEditorService.getNodeName(addedNodeId2)
          |> StateLogicService.getEditorState;
        let node2NewName = "new name for node2";

        AssetInspectorTool.Rename.renameAssetIMGUICustomControlNode(
          ~name=node2NewName,
          ~nodeId=addedNodeId2,
          (),
        );

        ((addedNodeId1, addedNodeId2), (node2OldName, node2NewName));
      };

      let _submitAll = (addedNodeId2, node2OldName) => {
        let customControlFunc =
          IMGUICustomControlInspectorTool.buildCustomControlFunc1();
        IMGUICustomControlInspectorTool.submitAll(
          ~nodeId=addedNodeId2,
          ~originCustomControlName=node2OldName,
          ~customControlFunc,
          (),
        );

        customControlFunc;
      };

      test("update asset tree", () => {
        let ((addedNodeId1, addedNodeId2), (node2OldName, node2NewName)) =
          _prepareAndRename();

        let customControlFunc = _submitAll(addedNodeId2, node2OldName);

        let editorState = StateEditorService.getState();
        (
          IMGUICustomControlNodeAssetEditorService.getNodeName(
            addedNodeId2,
            editorState,
          ),
          IMGUICustomControlNodeAssetEditorService.getCustomControlFunc(
            addedNodeId2,
            editorState,
          )
          |> SerializeService.serializeFunction,
        )
        |> expect
        == (
             node2NewName,
             customControlFunc |> SerializeService.serializeFunction,
           );
      });

      describe("update customControl in engineState", () => {
        test(
          "if the customControl isn't added to engineState, not update it", () => {
          let ((addedNodeId1, addedNodeId2), (node2OldName, node2NewName)) =
            _prepareAndRename();

          let customControlFunc = _submitAll(addedNodeId2, node2OldName);

          (
            ExtendIMGUIEngineService.hasCustomControl(node2OldName)
            |> StateLogicService.getEngineStateToGetData,
            ExtendIMGUIEngineService.hasCustomControl(node2NewName)
            |> StateLogicService.getEngineStateToGetData,
          )
          |> expect == (false, false);
        });

        describe("else, update it", () =>
          test("test", () => {
            let (addedNodeId1, addedNodeId2) = _prepare();
            IMGUICustomControlInspectorTool.addCustomControl(addedNodeId2);
            let node2OldName =
              IMGUICustomControlNodeAssetEditorService.getNodeName(
                addedNodeId2,
              )
              |> StateLogicService.getEditorState;
            let node2NewName = "new name for node2";
            AssetInspectorTool.Rename.renameAssetIMGUICustomControlNode(
              ~name=node2NewName,
              ~nodeId=addedNodeId2,
              (),
            );

            let customControlFunc = _submitAll(addedNodeId2, node2OldName);

            let engineState = StateEngineService.unsafeGetState();
            (
              ExtendIMGUIEngineService.hasCustomControl(
                node2NewName,
                engineState,
              ),
              ExtendIMGUIEngineService.unsafeGetCustomControlFunc(
                node2NewName,
                engineState,
              )
              |> SerializeService.serializeFunction,
            )
            |> expect
            == (true, customControlFunc |> SerializeService.serializeFunction);
          })
        );
      });
    });
  });