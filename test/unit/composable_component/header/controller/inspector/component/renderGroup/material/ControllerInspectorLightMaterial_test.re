open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller inspector light material", () => {
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
      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
      ControllerTool.stubRequestAnimationFrame(
        createEmptyStubWithJsObjSandbox(sandbox),
      );

      ControllerTool.run();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set value into engineState", () => {
      let _getGameObjectMaterialSourceSrc = (engineState, gameObject) =>
        engineState
        |> GameObjectComponentEngineService.getLightMaterialComponent(
             gameObject,
           )
        |. LightMaterialEngineService.unsafeGetLightMaterialDiffuseMap(
             engineState,
           )
        |. BasicSourceTextureEngineService.unsafeGetSource(engineState)
        |. DomHelper.getAttribute("src");

      let _getGameObjectMaterialMap = (engineState, gameObject) =>
        engineState
        |> GameObjectComponentEngineService.getLightMaterialComponent(
             gameObject,
           )
        |. LightMaterialEngineService.getLightMaterialDiffuseMap(engineState);

      test("test drag texture to set gameObject material map", () => {
        let assetTreeDomRecord =
          MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
        let editorState = StateEditorService.getState();

        assetTreeDomRecord
        |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
        |> MainEditorMaterialTool.triggerFileDragStartEvent;

        let dragTextureImageSrc =
          editorState
          |> AssetImageBase64MapEditorService.getImageBase64Map
          |> WonderCommonlib.SparseMapService.unsafeGet(
               editorState
               |> AssetTextureNodeMapEditorService.getTextureNodeMap
               |> WonderCommonlib.SparseMapService.unsafeGet(
                    assetTreeDomRecord
                    |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureNodeId,
                  )
               |> (({imageId}) => imageId),
             )
          |> (({base64}) => base64);

        MainEditorMaterialTool.triggerDragTextureToGameObjectMaterial();

        let currentGameObject =
          SceneEditorService.unsafeGetCurrentSceneTreeNode
          |> StateLogicService.getEditorState;

        let engineMaterialSourceSrc =
          _getGameObjectMaterialSourceSrc(
            StateEngineService.unsafeGetState(),
            currentGameObject,
          );

        engineMaterialSourceSrc
        |> expect == dragTextureImageSrc;
      });

      test("test remove texture", () => {
        let assetTreeDomRecord =
          MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

        assetTreeDomRecord
        |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
        |> MainEditorMaterialTool.triggerFileDragStartEvent;
        MainEditorMaterialTool.triggerDragTextureToGameObjectMaterial();
        MainEditorMaterialTool.triggerTextureRemoveClickEvent();

        let currentGameObject =
          SceneEditorService.unsafeGetCurrentSceneTreeNode
          |> StateLogicService.getEditorState;

        let engineMaterialMap =
          _getGameObjectMaterialMap(
            StateEngineService.unsafeGetState(),
            currentGameObject,
          );

        engineMaterialMap
        |> expect == None;
      });

      test("test change shininess", () => {
        let _getLightMaterialShininessValue = (material, engineState) =>
          engineState
          |> LightMaterialEngineService.getLightMaterialShininess(material)
          |. FloatService.truncateFloatValue(5);

        let currentGameObjectMaterial =
          GameObjectTool.getCurrentGameObjectLightMaterial();
        let component =
          BuildComponentTool.buildLightMaterial(currentGameObjectMaterial);
        let value = 1.1;

        BaseEventTool.triggerComponentEvent(
          component,
          MainEditorMaterialTool.triggerShininessChangeEvent(value),
        );

        
          StateEngineService.unsafeGetState()
          |> _getLightMaterialShininessValue(currentGameObjectMaterial)
 
        |> expect == (value);
      });
    });
  });