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
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));
      StateAssetService.getState()
      |> CurrentNodeDataAssetService.clearCurrentNodeData
      |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
      |> StateAssetService.setState
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
          |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );

      describe("test texture rename", () => {
        let _triggerInspectorRenameEvent = newName => {
          let inspectorComponent =
            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            );
          BaseEventTool.triggerComponentEvent(
            inspectorComponent,
            TextureInspectorTool.triggerChangeRenameEvent(newName),
          );
          BaseEventTool.triggerComponentEvent(
            inspectorComponent,
            TextureInspectorTool.triggerBlurRenameEvent(newName),
          );
        };
        describe("test snapshot", () =>
          test("test rename to specific name", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            let newName = "newTextureName";
            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
            |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

            _triggerInspectorRenameEvent(newName);

            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );

        /* TODO all: move "set two engine state" tests/cases to controller test */

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

              MainEditorAssetHeader.Method._fileLoad(
                TestTool.getDispatch(),
                BaseEventTool.buildFileEvent(),
              )
              |> Js.Promise.then_(() => {
                   assetTreeDomRecord
                   |> MainEditorAssetNodeTool.OperateTwoLayer.getUploadedeTextureNodeDomIndex
                   |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;
                   _triggerInspectorRenameEvent(newName);

                   MainEditorAssetNodeTool.getTextureIndexFromCurrentNodeId()
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
        let _triggerInspectorChangeWrapEvent = (wrapIndex, type_) => {
          let inspectorComponent =
            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            );
          BaseEventTool.triggerComponentEvent(
            inspectorComponent,
            TextureInspectorTool.triggerChangeWrapEvent(
              wrapIndex,
              type_ |> string_of_int,
            ),
          );
        };
        describe("test set wrapS to REPEAT", () => {
          test("test snapshot", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            let wrapSDomIndex = TextureInspectorTool.getWrapSDomIndex();
            let wrapRepeatType = TextureInspectorTool.getWrapRepeatType();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
            |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;
            _triggerInspectorChangeWrapEvent(wrapSDomIndex, wrapRepeatType);

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
            |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

            _triggerInspectorChangeWrapEvent(wrapSDomIndex, wrapRepeatType);

            let textureIndex =
              TextureInspectorTool.getTextureIndexFromCurrentNodeData();

            BasicSourceTextureEngineService.getWrapS(textureIndex)
            |> StateLogicService.getEngineStateToGetData
            |> TextureTypeUtils.convertWrapToInt
            |> expect == wrapRepeatType;
          });
        });

        describe("test set wrapT to MIRRORED_REPEAT", () => {
          test("test snapshot", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            let wrapTDomIndex = TextureInspectorTool.getWrapTDomIndex();
            let wrapMirroredRepeatType =
              TextureInspectorTool.getWrapMirroredRepeatType();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
            |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

            _triggerInspectorChangeWrapEvent(
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
            |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;
            _triggerInspectorChangeWrapEvent(
              wrapTDomIndex,
              wrapMirroredRepeatType,
            );

            let textureIndex =
              TextureInspectorTool.getTextureIndexFromCurrentNodeData();

            BasicSourceTextureEngineService.getWrapT(textureIndex)
            |> StateLogicService.getEngineStateToGetData
            |> TextureTypeUtils.convertWrapToInt
            |> expect == wrapMirroredRepeatType;
          });
        });
      });

      describe("test texture change filter", () => {
        let _triggerInspectorChangeFilterEvent = (index, type_) => {
          let inspectorComponent =
            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            );
          BaseEventTool.triggerComponentEvent(
            inspectorComponent,
            TextureInspectorTool.triggerChangeFilterEvent(
              index,
              type_ |> string_of_int,
            ),
          );
        };

        describe("test set MagFilter to LINEAR_MIPMAP_LINEAR", () => {
          test("test snapshot", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            let magFilterDomIndex =
              TextureInspectorTool.getMagFilterDomIndex();
            let filterLinearMipmapLinearType =
              TextureInspectorTool.getFilterLinearMipmapLinearType();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
            |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

            _triggerInspectorChangeFilterEvent(
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
            |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;
            _triggerInspectorChangeFilterEvent(
              magFilterDomIndex,
              filterLinearMipmapLinearType,
            );

            let textureIndex =
              TextureInspectorTool.getTextureIndexFromCurrentNodeData();

            BasicSourceTextureEngineService.getMagFilter(textureIndex)
            |> StateLogicService.getEngineStateToGetData
            |> TextureTypeUtils.convertFilterToInt
            |> expect == filterLinearMipmapLinearType;
          });
        });

        describe("test set MinFilter to NEAREST_MIPMAP_LINEAR", () => {
          test("test snapshot", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            let minFilterDomIndex =
              TextureInspectorTool.getMinFilterDomIndex();
            let filterNearestMipmapLinearType =
              TextureInspectorTool.getFilterNearestMipmapLinearType();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
            |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;
            _triggerInspectorChangeFilterEvent(
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
            |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;
            _triggerInspectorChangeFilterEvent(
              minFilterDomIndex,
              filterNearestMipmapLinearType,
            );

            let textureIndex =
              TextureInspectorTool.getTextureIndexFromCurrentNodeData();

            BasicSourceTextureEngineService.getMinFilter(textureIndex)
            |> StateLogicService.getEngineStateToGetData
            |> TextureTypeUtils.convertFilterToInt
            |> expect == filterNearestMipmapLinearType;
          });
        });
      });
    });
  });