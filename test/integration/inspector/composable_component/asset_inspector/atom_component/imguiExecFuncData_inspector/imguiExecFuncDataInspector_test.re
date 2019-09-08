open Wonder_jest;

open Expect;

open Expect.Operators;

open NodeAssetType;

open Sinon;

open Js.Promise;

let _ =
  describe("imgui exec func data inspector", () => {
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
        MainEditorAssetHeaderOperateNodeTool.addIMGUIExecFuncData();

        MainEditorAssetChildrenNodeTool.selectIMGUIExecFuncDataNode(
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
        MainEditorAssetHeaderOperateNodeTool.addIMGUIExecFuncData();
        IMGUIExecFuncDataInspectorTool.setNodeData(
          ~nodeId=addedNodeId,
          ~name="aaa",
          ~execOrder=1,
          ~execFunc=IMGUIExecFuncDataInspectorTool.buildExecFunc1(),
          (),
        )
        |> StateEditorService.setState
        |> ignore;

        MainEditorAssetChildrenNodeTool.selectIMGUIExecFuncDataNode(
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
      describe("new name should be unique in imgui exec func data assets", () =>
        test(
          "if has imgui exec func data asset with the same new name in different folders, rename should fail",
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
            MainEditorAssetHeaderOperateNodeTool.addIMGUIExecFuncData();

            let addedNodeId2 = MainEditorAssetIdTool.getNewAssetId();
            MainEditorAssetTreeTool.Select.selectFolderNode(
              ~nodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                  assetTreeData,
                ),
              (),
            );
            MainEditorAssetHeaderOperateNodeTool.addIMGUIExecFuncData();
            let node2OldName =
              IMGUIExecFuncDataNodeAssetEditorService.getNodeName(
                addedNodeId2,
              )
              |> StateLogicService.getEditorState;

            AssetInspectorTool.Rename.renameAssetIMGUIExecFuncDataNode(
              ~name=
                IMGUIExecFuncDataNodeAssetService.getNodeName(
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
              IMGUIExecFuncDataNodeAssetService.getNodeName(
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
        MainEditorAssetHeaderOperateNodeTool.addIMGUIExecFuncData();

        let addedNodeId2 = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetTreeTool.Select.selectFolderNode(
          ~nodeId=
            MainEditorAssetTreeTool.getRootNodeId(
              StateEditorService.getState(),
            ),
          (),
        );
        MainEditorAssetHeaderOperateNodeTool.addIMGUIExecFuncData();

        (addedNodeId1, addedNodeId2);
      };

      let _prepareAndRename = () => {
        let (addedNodeId1, addedNodeId2) = _prepare();

        let node2OldName =
          IMGUIExecFuncDataNodeAssetEditorService.getNodeName(addedNodeId2)
          |> StateLogicService.getEditorState;
        let node2NewName = "new name for node2";

        AssetInspectorTool.Rename.renameAssetIMGUIExecFuncDataNode(
          ~name=node2NewName,
          ~nodeId=addedNodeId2,
          (),
        );

        ((addedNodeId1, addedNodeId2), (node2OldName, node2NewName));
      };

      let _submitAll = (addedNodeId2, node2OldName) => {
        let execOrder = 1;
        let execFunc = IMGUIExecFuncDataInspectorTool.buildExecFunc1();
        IMGUIExecFuncDataInspectorTool.submitAll(
          ~nodeId=addedNodeId2,
          ~originExecFuncDataName=node2OldName,
          ~execOrder,
          ~execFunc,
          (),
        );

        (execOrder, execFunc);
      };

      test("update asset tree", () => {
        let ((addedNodeId1, addedNodeId2), (node2OldName, node2NewName)) =
          _prepareAndRename();

        let (execOrder, execFunc) = _submitAll(addedNodeId2, node2OldName);

        let editorState = StateEditorService.getState();
        (
          IMGUIExecFuncDataNodeAssetEditorService.getNodeName(
            addedNodeId2,
            editorState,
          ),
          IMGUIExecFuncDataNodeAssetEditorService.getExecOrder(
            addedNodeId2,
            editorState,
          ),
          IMGUIExecFuncDataNodeAssetEditorService.getExecFunc(
            addedNodeId2,
            editorState,
          )
          |> SerializeService.serializeFunction,
        )
        |> expect
        == (
             node2NewName,
             execOrder,
             execFunc |> SerializeService.serializeFunction,
           );
      });

      describe("update exec func data in engineState", () => {
        test(
          "if the exec func data isn't added to engineState, not update it", () => {
          let ((addedNodeId1, addedNodeId2), (node2OldName, node2NewName)) =
            _prepareAndRename();

          let (execOrder, execFunc) = _submitAll(addedNodeId2, node2OldName);

          (
            ExecIMGUIEngineService.hasExecFuncData(node2OldName)
            |> StateLogicService.getEngineStateToGetData,
            ExecIMGUIEngineService.hasExecFuncData(node2NewName)
            |> StateLogicService.getEngineStateToGetData,
          )
          |> expect == (false, false);
        });

        describe("else, update it", () =>
          test("test", () => {
            let (addedNodeId1, addedNodeId2) = _prepare();
            IMGUIExecFuncDataInspectorTool.addExecFuncData(addedNodeId2);
            let node2OldName =
              IMGUIExecFuncDataNodeAssetEditorService.getNodeName(
                addedNodeId2,
              )
              |> StateLogicService.getEditorState;
            let node2NewName = "new name for node2";
            AssetInspectorTool.Rename.renameAssetIMGUIExecFuncDataNode(
              ~name=node2NewName,
              ~nodeId=addedNodeId2,
              (),
            );

            let (execOrder, execFunc) =
              _submitAll(addedNodeId2, node2OldName);

            let engineState = StateEngineService.unsafeGetState();
            (
              ExecIMGUIEngineService.hasExecFuncData(
                node2NewName,
                engineState,
              ),
              ExecIMGUIEngineService.unsafeGetExecOrder(
                node2NewName,
                engineState,
              ),
              ExecIMGUIEngineService.unsafeGetCustomData(
                node2NewName,
                engineState,
              ),
              ExecIMGUIEngineService.unsafeGetExecFunc(
                node2NewName,
                engineState,
              )
              |> SerializeService.serializeFunction,
            )
            |> expect
            == (
                 true,
                 execOrder,
                 IMGUIExecFuncDataNodeAssetService.buildEmptyCustomData(),
                 execFunc |> SerializeService.serializeFunction,
               );
          })
        );
      });
    });
  });