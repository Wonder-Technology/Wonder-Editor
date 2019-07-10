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
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();
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
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();
        let newName = "controllerTextureName";
        let nodeId =
          MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
            assetTreeData,
          );

        MainEditorAssetChildrenNodeTool.selectTextureNode(~nodeId, ());
        AssetInspectorTool.Rename.renameAssetTextureNode(
          ~nodeId,
          ~name=newName,
          (),
        );

        let textureComponent =
          MainEditorAssetNodeTool.getTextureComponentFromCurrentNodeId();

        StateEngineService.unsafeGetState()
        |> BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName(
             textureComponent,
           )
        |> expect == newName;
      });

      test("test change wrapS", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();
        let wrapRepeatType = TextureInspectorTool.getWrapRepeatType();
        let nodeId =
          MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
            assetTreeData,
          );

        MainEditorAssetChildrenNodeTool.selectTextureNode(~nodeId, ());
        TextureInspectorTool.changeWrapS(
          ~textureComponent=
            MainEditorAssetNodeTool.getTextureComponentFromNodeId(nodeId),
          ~value=wrapRepeatType,
          (),
        );

        let textureComponent =
          MainEditorAssetNodeTool.getTextureComponentFromCurrentNodeId();

        StateEngineService.unsafeGetState()
        |> BasicSourceTextureEngineService.getWrapS(textureComponent)
        |> TextureTypeUtils.convertWrapToInt
        |> expect == wrapRepeatType;
      });
    });
  });