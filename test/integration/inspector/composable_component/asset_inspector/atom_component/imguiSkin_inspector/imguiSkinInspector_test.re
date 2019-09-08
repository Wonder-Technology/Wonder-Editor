open Wonder_jest;

open Expect;

open Expect.Operators;

open NodeAssetType;

open Sinon;

open Js.Promise;

let _ =
  describe("imgui skin inspector", () => {
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
        MainEditorAssetHeaderOperateNodeTool.addIMGUISkin();

        MainEditorAssetChildrenNodeTool.selectIMGUISkinNode(
          ~nodeId=addedNodeId,
          (),
        );

        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      });
      testPromise("test show specific value", () => {
        MainEditorAssetTool.buildFakeFileReader();
        MainEditorAssetTool.buildFakeImage();
        let addedSkinNodeId = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addIMGUISkin();

        MainEditorAssetUploadTool.loadOneTexture()
        |> then_(uploadedTextureNodeId => {
             TextureInspectorTool.changeType(
               ~nodeId=uploadedTextureNodeId,
               ~type_=NodeAssetType.IMGUICustomImage,
               (),
             );

             let customImageId = "i1";

             TextureInspectorTool.IMGUICustomImageType.setCustomImageId(
               ~nodeId=uploadedTextureNodeId,
               ~textureContentIndex=
                 IMGUICustomImageTypeTextureNodeAssetEditorService.unsafeGetTextureContentIndex(
                   uploadedTextureNodeId,
                 )
                 |> StateLogicService.getEditorState,
               ~customImageId,
               (),
             )
             |> StateLogicService.setState;

             IMGUISkinInspectorTool.setNodeData(
               ~nodeId=addedSkinNodeId,
               ~name="aaa",
               ~buttonSkinData=
                 IMGUISkinInspectorTool.createButtonSkinData(
                   ~buttonColor=[|1., 0., 0.|],
                   ~hoverButtonColor=[|0., 1., 0.|],
                   ~clickButtonColor=[|0., 0., 1.|],
                   ~buttonImage=Js.Nullable.return(customImageId),
                   ~fontAlign=WonderImgui.FontType.Right,
                   ~fontColor=[|1., 0., 0.|],
                   (),
                 ),
               ~allCustomStyleData=
                 IMGUISkinInspectorTool.createAllCustomStyleData1(),
               (),
             )
             |> StateEditorService.setState
             |> ignore;

             MainEditorAssetChildrenNodeTool.selectIMGUISkinNode(
               ~nodeId=addedSkinNodeId,
               (),
             );

             BuildComponentTool.buildInspectorComponent(
               TestTool.buildEmptyAppState(),
               InspectorTool.buildFakeAllShowComponentConfig(),
             )
             |> ReactTestTool.createSnapshotAndMatch
             |> resolve;
           });
      });
    });

    describe("test rename", () =>
      describe("new name should be unique in imgui skin assets", () =>
        test(
          "if has imgui skin asset with the same new name in different folders, rename should fail",
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
            MainEditorAssetHeaderOperateNodeTool.addIMGUISkin();

            let addedNodeId2 = MainEditorAssetIdTool.getNewAssetId();
            MainEditorAssetTreeTool.Select.selectFolderNode(
              ~nodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                  assetTreeData,
                ),
              (),
            );
            MainEditorAssetHeaderOperateNodeTool.addIMGUISkin();
            let node2OldName =
              IMGUISkinNodeAssetEditorService.getNodeName(addedNodeId2)
              |> StateLogicService.getEditorState;

            AssetInspectorTool.Rename.renameAssetIMGUISkinNode(
              ~name=
                IMGUISkinNodeAssetService.getNodeName(
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
              IMGUISkinNodeAssetService.getNodeName(
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
        MainEditorAssetHeaderOperateNodeTool.addIMGUISkin();

        let addedNodeId2 = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetTreeTool.Select.selectFolderNode(
          ~nodeId=
            MainEditorAssetTreeTool.getRootNodeId(
              StateEditorService.getState(),
            ),
          (),
        );
        MainEditorAssetHeaderOperateNodeTool.addIMGUISkin();

        (addedNodeId1, addedNodeId2);
      };

      let _prepareAndRename = () => {
        let (addedNodeId1, addedNodeId2) = _prepare();

        let node2OldName =
          IMGUISkinNodeAssetEditorService.getNodeName(addedNodeId2)
          |> StateLogicService.getEditorState;
        let node2NewName = "new name for node2";

        AssetInspectorTool.Rename.renameAssetIMGUISkinNode(
          ~name=node2NewName,
          ~nodeId=addedNodeId2,
          (),
        );

        ((addedNodeId1, addedNodeId2), (node2OldName, node2NewName));
      };

      let _submitAll = (addedNodeId2, node2OldName) => {
        let buttonSkinData =
          IMGUISkinInspectorTool.createButtonSkinData(
            ~buttonColor=[|1., 0., 0.|],
            ~hoverButtonColor=[|0., 1., 0.|],
            ~clickButtonColor=[|0., 0., 1.|],
            ~fontAlign=WonderImgui.FontType.Right,
            ~fontColor=[|1., 0., 0.|],
            (),
          );
        let allCustomStyleDataStr =
          IMGUISkinInspectorTool.createAllCustomStyleData1()
          |> IMGUISkinInspectorTool.serializeAllCustomStyleData;

        IMGUISkinInspectorTool.submitAll(
          ~nodeId=addedNodeId2,
          ~originSkinName=node2OldName,
          ~buttonSkinData,
          ~allCustomStyleDataStr,
          (),
        );

        (buttonSkinData, allCustomStyleDataStr);
      };

      test("update asset tree", () => {
        let ((addedNodeId1, addedNodeId2), (node2OldName, node2NewName)) =
          _prepareAndRename();

        let (buttonSkinData, allCustomStyleDataStr) =
          _submitAll(addedNodeId2, node2OldName);

        let editorState = StateEditorService.getState();
        (
          IMGUISkinNodeAssetEditorService.getNodeName(
            addedNodeId2,
            editorState,
          ),
          IMGUISkinNodeAssetEditorService.getButtonSkinData(
            addedNodeId2,
            editorState,
          ),
          IMGUISkinNodeAssetEditorService.getAllCustomStyleData(
            addedNodeId2,
            editorState,
          )
          |> IMGUISkinInspectorTool.serializeAllCustomStyleData,
        )
        |> expect == (node2NewName, buttonSkinData, allCustomStyleDataStr);
      });

      describe("update skin in engineState", () => {
        test("if the skin isn't added to engineState, not update it", () => {
          let ((addedNodeId1, addedNodeId2), (node2OldName, node2NewName)) =
            _prepareAndRename();

          let (buttonSkinData, allCustomStyleDataStr) =
            _submitAll(addedNodeId2, node2OldName);

          (
            ExtendIMGUIEngineService.hasSkinData(node2OldName)
            |> StateLogicService.getEngineStateToGetData,
            ExtendIMGUIEngineService.hasSkinData(node2NewName)
            |> StateLogicService.getEngineStateToGetData,
          )
          |> expect == (false, false);
        });

        describe("else, update it", () =>
          test("test", () => {
            let (addedNodeId1, addedNodeId2) = _prepare();
            IMGUISkinInspectorTool.addSkin(addedNodeId2);
            let node2OldName =
              IMGUISkinNodeAssetEditorService.getNodeName(addedNodeId2)
              |> StateLogicService.getEditorState;
            let node2NewName = "new name for node2";
            AssetInspectorTool.Rename.renameAssetIMGUISkinNode(
              ~name=node2NewName,
              ~nodeId=addedNodeId2,
              (),
            );

            let (buttonSkinData, allCustomStyleDataStr) =
              _submitAll(addedNodeId2, node2OldName);

            let engineState = StateEngineService.unsafeGetState();
            (
              ExtendIMGUIEngineService.hasSkinData(node2NewName, engineState),
              ExtendIMGUIToolEngine.unsafeGetButtonSkinData(
                node2NewName,
                engineState,
              ),
              ExtendIMGUIToolEngine.unsafeGetAllCustomStyleData(
                node2NewName,
                engineState,
              )
              |> IMGUISkinInspectorTool.serializeAllCustomStyleData,
            )
            |> expect == (true, buttonSkinData, allCustomStyleDataStr);
          })
        );
      });
    });
  });