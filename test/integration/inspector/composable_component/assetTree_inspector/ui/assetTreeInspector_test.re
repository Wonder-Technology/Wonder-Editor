open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("AssetTreeInspector", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("prepare currentSelectSource", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorAssetTool.initAssetTree,
        );
        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.Asset,
        )
        |> StateLogicService.getAndSetEditorState;
      });
      afterEach(() =>
        StateEditorService.getState()
        |> AssetCurrentNodeDataEditorService.clearCurrentNodeData
        |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
        |> StateEditorService.setState
        |> ignore
      );

      describe("test component snapshot", () => {
        test("if hasn't current node, show nothing", () => {
          MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        });

        describe("else", () => {
          test("test set folder to be current node", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            let component = BuildComponentTool.buildAssetComponent();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
            |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(
                 component,
               );

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });

          test("test set texture to be current node", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
            |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });

          test("test set json to be current node", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstJsonDomIndex
            |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
        });
      });

      describe("test node rename", () => {
        let _triggerInspectorRenameEvent = (inspectorComponent, newName) => {
          BaseEventTool.triggerComponentEvent(
            inspectorComponent,
            AssetTreeInspectorTool.triggerRenameChangeEvent(newName),
          );
          BaseEventTool.triggerComponentEvent(
            inspectorComponent,
            AssetTreeInspectorTool.triggerRenameBlurEvent(newName),
          );
        };
        beforeEach(() => ConsoleTool.markTestConsole());
        afterEach(() => ConsoleTool.markNotTestConsole());

        test("test rename to specific name", () => {
          let assetTreeDomRecord =
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
          let component = BuildComponentTool.buildAssetComponent();

          assetTreeDomRecord
          |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
          |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(component);

          let inspectorComponent =
            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            );
          _triggerInspectorRenameEvent(inspectorComponent, "mickeyFolder");

          inspectorComponent |> ReactTestTool.createSnapshotAndMatch;
        });

        test(
          "test rename to the same with sibling node, should not be renamed",
          () => {
          let warn =
            createMethodStubWithJsObjSandbox(
              sandbox,
              ConsoleTool.console,
              "warn",
            );

          let assetTreeDomRecord =
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
          let component = BuildComponentTool.buildAssetComponent();

          assetTreeDomRecord
          |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
          |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(component);

          let inspectorComponent =
            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            );
          _triggerInspectorRenameEvent(inspectorComponent, "New Folder 1");

          ConsoleTool.getMessage(warn)
          |> Js.String.includes("the folder is can't has same name !")
          |> expect == true;
        });

        describe("test the root folder can't be rename", () =>
          test("the root treeNode->rename-input->disabled should be true", () => {
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

            BaseEventTool.triggerComponentEvent(
              BuildComponentTool.buildAssetComponent(),
              AssetTreeEventTool.clickRootAssetTreeNode,
            );

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
        describe("test rename asset tree children node", () =>
          describe("if node has ext name", () => {
            test("rename input shouldn't show it", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

              assetTreeDomRecord
              |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstJsonDomIndex
              |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            });
            test("if rename success, the newName should include ext name", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

              assetTreeDomRecord
              |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstJsonDomIndex
              |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

              _triggerInspectorRenameEvent(
                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildEmptyAppState(),
                  InspectorTool.buildFakeAllShowComponentConfig(),
                ),
                "mickey_json",
              );

              BuildComponentTool.buildAssetComponent()
              |> ReactTestTool.createSnapshotAndMatch;
            });
          })
        );
        describe("deal with specific case", () =>
          test(
            "key in '', trigger onBlur, the input value should be original name",
            () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            let component = BuildComponentTool.buildAssetComponent();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
            |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(
                 component,
               );

            let inspectorComponent =
              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              );
            _triggerInspectorRenameEvent(inspectorComponent, "");

            inspectorComponent |> ReactTestTool.createSnapshotAndMatch;
          })
        );
      });
    });
  });