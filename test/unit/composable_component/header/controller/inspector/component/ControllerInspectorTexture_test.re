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
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode();
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
    describe("test set value into edit and run engineState", () => {
      test("test rename texture", () => {
        let assetTreeDomRecord =
          MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
        let newName = "controllerTextureName";

        assetTreeDomRecord
        |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
        |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

        TextureInspectorTool.triggerInspectorRenameEvent(newName);

        let textureIndex =
          MainEditorAssetNodeTool.getTextureIndexFromCurrentNodeId();

        (
          StateLogicService.getEditEngineState()
          |> BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName(
               DiffComponentTool.getEditEngineComponent(
                 DiffType.Texture,
                 textureIndex,
               ),
             ),
          StateLogicService.getRunEngineState()
          |> BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName(
               textureIndex,
             ),
        )
        |> expect == (newName, newName);
      });

      test("test change wrapS", () => {
        let assetTreeDomRecord =
          MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
        let wrapSDomIndex = TextureInspectorTool.getWrapSDomIndex();
        let wrapRepeatType = TextureInspectorTool.getWrapRepeatType();

        assetTreeDomRecord
        |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
        |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

        TextureInspectorTool.triggerInspectorChangeWrapEvent(
          wrapSDomIndex,
          wrapRepeatType,
        );

        let textureIndex =
          MainEditorAssetNodeTool.getTextureIndexFromCurrentNodeId();

        (
          StateLogicService.getEditEngineState()
          |> BasicSourceTextureEngineService.getWrapS(
               DiffComponentTool.getEditEngineComponent(
                 DiffType.Texture,
                 textureIndex,
               ),
             )
          |> TextureTypeUtils.convertWrapToInt,
          StateLogicService.getEditEngineState()
          |> BasicSourceTextureEngineService.getWrapS(textureIndex)
          |> TextureTypeUtils.convertWrapToInt,
        )
        |> expect == (wrapRepeatType, wrapRepeatType);
      });

      test("test change wrapT", () => {
        let assetTreeDomRecord =
          MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
        let wrapTDomIndex = TextureInspectorTool.getWrapTDomIndex();
        let wrapMirroredRepeatType =
          TextureInspectorTool.getWrapMirroredRepeatType();

        assetTreeDomRecord
        |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
        |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;
        TextureInspectorTool.triggerInspectorChangeWrapEvent(
          wrapTDomIndex,
          wrapMirroredRepeatType,
        );

        let textureIndex =
          TextureInspectorTool.getTextureIndexFromCurrentNodeData();

        (
          StateLogicService.getEditEngineState()
          |> BasicSourceTextureEngineService.getWrapT(
               DiffComponentTool.getEditEngineComponent(
                 DiffType.Texture,
                 textureIndex,
               ),
             )
          |> TextureTypeUtils.convertWrapToInt,
          StateLogicService.getEditEngineState()
          |> BasicSourceTextureEngineService.getWrapT(textureIndex)
          |> TextureTypeUtils.convertWrapToInt,
        )
        |> expect == (wrapMirroredRepeatType, wrapMirroredRepeatType);
      });

      test("test change magFilter", () => {
        let assetTreeDomRecord =
          MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
        let magFilterDomIndex = TextureInspectorTool.getMagFilterDomIndex();
        let filterLinearMipmapLinearType =
          TextureInspectorTool.getFilterLinearMipmapLinearType();

        assetTreeDomRecord
        |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
        |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;
        TextureInspectorTool.triggerInspectorChangeFilterEvent(
          magFilterDomIndex,
          filterLinearMipmapLinearType,
        );

        let textureIndex =
          TextureInspectorTool.getTextureIndexFromCurrentNodeData();

        (
          StateLogicService.getEditEngineState()
          |> BasicSourceTextureEngineService.getMagFilter(
               DiffComponentTool.getEditEngineComponent(
                 DiffType.Texture,
                 textureIndex,
               ),
             )
          |> TextureTypeUtils.convertFilterToInt,
          StateLogicService.getEditEngineState()
          |> BasicSourceTextureEngineService.getMagFilter(textureIndex)
          |> TextureTypeUtils.convertFilterToInt,
        )
        |>
        expect == (filterLinearMipmapLinearType, filterLinearMipmapLinearType);
      });

      test("test change minFilter", () => {
        let assetTreeDomRecord =
          MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
        let minFilterDomIndex = TextureInspectorTool.getMinFilterDomIndex();
        let filterNearestMipmapLinearType =
          TextureInspectorTool.getFilterNearestMipmapLinearType();

        assetTreeDomRecord
        |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
        |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;
        TextureInspectorTool.triggerInspectorChangeFilterEvent(
          minFilterDomIndex,
          filterNearestMipmapLinearType,
        );

        let textureIndex =
          TextureInspectorTool.getTextureIndexFromCurrentNodeData();

        (
          StateLogicService.getEditEngineState()
          |> BasicSourceTextureEngineService.getMinFilter(
               DiffComponentTool.getEditEngineComponent(
                 DiffType.Texture,
                 textureIndex,
               ),
             )
          |> TextureTypeUtils.convertFilterToInt,
          StateLogicService.getEditEngineState()
          |> BasicSourceTextureEngineService.getMinFilter(textureIndex)
          |> TextureTypeUtils.convertFilterToInt,
        )
        |>
        expect == (
                    filterNearestMipmapLinearType,
                    filterNearestMipmapLinearType,
                  );
      });
    });
  });