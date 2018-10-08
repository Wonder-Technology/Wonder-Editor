open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller inspector texture", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        () => {
          MainEditorAssetTool.initAssetTree();
          MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode();
        },
      );

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;

      ControllerTool.stubRequestAnimationFrame(
        createEmptyStubWithJsObjSandbox(sandbox),
      );
      ControllerTool.run();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("test set value into engineState", () => {
      test("test rename texture", () => {
        let assetTreeDomRecord =
          MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
        let newName = "controllerTextureName";

        assetTreeDomRecord
        |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
        |> MainEditorAssetChildrenNodeTool.clickAssetChildrenNodeToSetCurrentNode;

        TextureInspectorTool.triggerInspectorRenameEvent(newName);

        let textureIndex =
          MainEditorAssetNodeTool.getTextureIndexFromCurrentNodeId();

        StateEngineService.unsafeGetState()
        |> BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName(
             textureIndex,
           )
        |> expect == newName;
      });

      test("test change wrapS", () => {
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

        let textureIndex =
          MainEditorAssetNodeTool.getTextureIndexFromCurrentNodeId();

        StateEngineService.unsafeGetState()
        |> BasicSourceTextureEngineService.getWrapS(textureIndex)
        |> TextureTypeUtils.convertWrapToInt
        |> expect == wrapRepeatType;
      });

      test("test change wrapT", () => {
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

        let textureIndex =
          TextureInspectorTool.getTextureIndexFromCurrentNodeData();

        StateEngineService.unsafeGetState()
        |> BasicSourceTextureEngineService.getWrapT(textureIndex)
        |> TextureTypeUtils.convertWrapToInt
        |> expect == wrapMirroredRepeatType;
      });

      test("test change magFilter", () => {
        let assetTreeDomRecord =
          MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
        let magFilterDomIndex = TextureInspectorTool.getMagFilterDomIndex();
        let filterLinearMipmapLinearType =
          TextureInspectorTool.getFilterLinearMipmapLinearType();

        assetTreeDomRecord
        |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
        |> MainEditorAssetChildrenNodeTool.clickAssetChildrenNodeToSetCurrentNode;
        TextureInspectorTool.triggerInspectorChangeFilterEvent(
          magFilterDomIndex,
          filterLinearMipmapLinearType,
        );

        let textureIndex =
          TextureInspectorTool.getTextureIndexFromCurrentNodeData();

        StateEngineService.unsafeGetState()
        |> BasicSourceTextureEngineService.getMagFilter(textureIndex)
        |> TextureTypeUtils.convertFilterToInt
        |> expect == filterLinearMipmapLinearType;
      });

      test("test change minFilter", () => {
        let assetTreeDomRecord =
          MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
        let minFilterDomIndex = TextureInspectorTool.getMinFilterDomIndex();
        let filterNearestMipmapLinearType =
          TextureInspectorTool.getFilterNearestMipmapLinearType();

        assetTreeDomRecord
        |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
        |> MainEditorAssetChildrenNodeTool.clickAssetChildrenNodeToSetCurrentNode;
        TextureInspectorTool.triggerInspectorChangeFilterEvent(
          minFilterDomIndex,
          filterNearestMipmapLinearType,
        );

        let textureIndex =
          TextureInspectorTool.getTextureIndexFromCurrentNodeData();

        StateEngineService.unsafeGetState()
        |> BasicSourceTextureEngineService.getMinFilter(textureIndex)
        |> TextureTypeUtils.convertFilterToInt
        |> expect == filterNearestMipmapLinearType;
      });
    });
  });