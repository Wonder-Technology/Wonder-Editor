open Wonder_jest;

open Expect;

open Expect.Operators;

open AssetNodeType;

open Sinon;

let _ =
  describe("TextureInspector", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));
      StateEditorService.getState()
      |> AssetCurrentNodeDataEditorService.clearCurrentNodeData
      |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
      |> StateEditorService.setState
      |> ignore;
    });

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

      describe("test component snapshot", () =>
        test("test texture inspector->show default value", () => {
          let assetTreeDomRecord =
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

          assetTreeDomRecord
          |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
          |> MainEditorAssetChildrenNodeTool.clickAssetChildrenNodeToSetCurrentNode;

          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );

      describe("test texture rename", () => {
        describe("test snapshot", () =>
          test("test rename to specific name", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            let newName = "newTextureName";
            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
            |> MainEditorAssetChildrenNodeTool.clickAssetChildrenNodeToSetCurrentNode;

            TextureInspectorTool.triggerInspectorRenameEvent(newName);

            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );

        describe("test logic", () =>
          describe("test engine", () => {
            beforeEach(() => {
              MainEditorAssetTool.buildFakeFileReader();
              MainEditorAssetTool.buildFakeImage();
            });

            testPromise("upload texture;
              rename texture;", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
              let newName = "newTextureToEngine";

              MainEditorAssetTool.fileLoad(
                TestTool.getDispatch(),
                BaseEventTool.buildFileEvent(),
              )
              |> Js.Promise.then_(() => {
                   assetTreeDomRecord
                   |> MainEditorAssetNodeTool.OperateTwoLayer.getAddedFirstNodeDomIndex
                   |> MainEditorAssetChildrenNodeTool.clickAssetChildrenNodeToSetCurrentNode;
                   TextureInspectorTool.triggerInspectorRenameEvent(newName);

                   MainEditorAssetNodeTool.getTextureComponentFromCurrentNodeId()
                   |> BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName
                   |> StateLogicService.getEngineStateToGetData
                   |> expect == newName
                   |> Js.Promise.resolve;
                 });
            });
          })
        );
      });

      describe("test texture change wrap", () => {
        describe("test set wrapS to Repeat", () => {
          test("test snapshot", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            let wrapSDomIndex = TextureInspectorTool.getWrapSDomIndex();
            let wrapRepeatType = TextureInspectorTool.getWrapRepeatType();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
            |> MainEditorAssetChildrenNodeTool.clickAssetChildrenNodeToSetCurrentNode;
            TextureInspectorTool.triggerInspectorChangeWrapEvent(
              wrapSDomIndex,
              wrapRepeatType,
            );

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
          test("test logic", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            let wrapSDomIndex = TextureInspectorTool.getWrapSDomIndex();
            let wrapRepeatType = TextureInspectorTool.getWrapRepeatType();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
            |> MainEditorAssetChildrenNodeTool.clickAssetChildrenNodeToSetCurrentNode;

            TextureInspectorTool.triggerInspectorChangeWrapEvent(
              wrapSDomIndex,
              wrapRepeatType,
            );

            let textureComponent =
              TextureInspectorTool.getTextureIndexFromCurrentNodeData();

            BasicSourceTextureEngineService.getWrapS(textureComponent)
            |> StateLogicService.getEngineStateToGetData
            |> TextureTypeUtils.convertWrapToInt
            |> expect == wrapRepeatType;
          });
        });

        describe("test set wrapT to Mirrored_repeat", () => {
          test("test snapshot", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            let wrapTDomIndex = TextureInspectorTool.getWrapTDomIndex();
            let wrapMirroredRepeatType =
              TextureInspectorTool.getWrapMirroredRepeatType();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
            |> MainEditorAssetChildrenNodeTool.clickAssetChildrenNodeToSetCurrentNode;

            TextureInspectorTool.triggerInspectorChangeWrapEvent(
              wrapTDomIndex,
              wrapMirroredRepeatType,
            );

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
          test("test logic", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            let wrapTDomIndex = TextureInspectorTool.getWrapTDomIndex();
            let wrapMirroredRepeatType =
              TextureInspectorTool.getWrapMirroredRepeatType();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
            |> MainEditorAssetChildrenNodeTool.clickAssetChildrenNodeToSetCurrentNode;
            TextureInspectorTool.triggerInspectorChangeWrapEvent(
              wrapTDomIndex,
              wrapMirroredRepeatType,
            );

            let textureComponent =
              TextureInspectorTool.getTextureIndexFromCurrentNodeData();

            BasicSourceTextureEngineService.getWrapT(textureComponent)
            |> StateLogicService.getEngineStateToGetData
            |> TextureTypeUtils.convertWrapToInt
            |> expect == wrapMirroredRepeatType;
          });
        });
      });

      describe("test texture change filter", () => {
        describe("test set MagFilter to Linear_mipmap_linear", () => {
          test("test snapshot", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            let magFilterDomIndex =
              TextureInspectorTool.getMagFilterDomIndex();
            let filterLinearMipmapLinearType =
              TextureInspectorTool.getFilterLinearMipmapLinearType();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
            |> MainEditorAssetChildrenNodeTool.clickAssetChildrenNodeToSetCurrentNode;

            TextureInspectorTool.triggerInspectorChangeFilterEvent(
              magFilterDomIndex,
              filterLinearMipmapLinearType,
            );

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
          test("test logic", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            let magFilterDomIndex =
              TextureInspectorTool.getMagFilterDomIndex();
            let filterLinearMipmapLinearType =
              TextureInspectorTool.getFilterLinearMipmapLinearType();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
            |> MainEditorAssetChildrenNodeTool.clickAssetChildrenNodeToSetCurrentNode;
            TextureInspectorTool.triggerInspectorChangeFilterEvent(
              magFilterDomIndex,
              filterLinearMipmapLinearType,
            );

            let textureComponent =
              TextureInspectorTool.getTextureIndexFromCurrentNodeData();

            BasicSourceTextureEngineService.getMagFilter(textureComponent)
            |> StateLogicService.getEngineStateToGetData
            |> TextureTypeUtils.convertFilterToInt
            |> expect == filterLinearMipmapLinearType;
          });
        });

        describe("test set MinFilter to Nearest_mipmap_linear", () => {
          test("test snapshot", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            let minFilterDomIndex =
              TextureInspectorTool.getMinFilterDomIndex();
            let filterNearestMipmapLinearType =
              TextureInspectorTool.getFilterNearestMipmapLinearType();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
            |> MainEditorAssetChildrenNodeTool.clickAssetChildrenNodeToSetCurrentNode;
            TextureInspectorTool.triggerInspectorChangeFilterEvent(
              minFilterDomIndex,
              filterNearestMipmapLinearType,
            );

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });

          test("test logic", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            let minFilterDomIndex =
              TextureInspectorTool.getMinFilterDomIndex();
            let filterNearestMipmapLinearType =
              TextureInspectorTool.getFilterNearestMipmapLinearType();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
            |> MainEditorAssetChildrenNodeTool.clickAssetChildrenNodeToSetCurrentNode;
            TextureInspectorTool.triggerInspectorChangeFilterEvent(
              minFilterDomIndex,
              filterNearestMipmapLinearType,
            );

            let textureComponent =
              TextureInspectorTool.getTextureIndexFromCurrentNodeData();

            BasicSourceTextureEngineService.getMinFilter(textureComponent)
            |> StateLogicService.getEngineStateToGetData
            |> TextureTypeUtils.convertFilterToInt
            |> expect == filterNearestMipmapLinearType;
          });
        });
      });
    });
  });