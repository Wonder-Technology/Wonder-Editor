open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller inspector basic material", () => {
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
      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
      ControllerTool.stubRequestAnimationFrame(
        createEmptyStubWithJsObjSandbox(sandbox),
      );

      MainEditorMaterialTool.setMaterialTypeToBeBaiscMaterial();

      ControllerTool.run();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set value into engineState", () => {
      let _getGameObjectMaterialSourceSrc = (engineState, gameObject) =>
        engineState
        |> GameObjectComponentEngineService.getBasicMaterialComponent(
             gameObject,
           )
        |. BasicMaterialEngineService.unsafeGetMap(engineState)
        |. BasicSourceTextureEngineService.unsafeGetSource(engineState)
        |. DomHelper.getAttribute("src");

      let _getGameObjectMaterialMap = (engineState, gameObject) =>
        engineState
        |> GameObjectComponentEngineService.getBasicMaterialComponent(
             gameObject,
           )
        |. BasicMaterialEngineService.getMap(engineState);

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
               |> (({textureIndex}) => textureIndex),
             );

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
    });
  });