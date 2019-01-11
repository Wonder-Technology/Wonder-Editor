open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open NodeAssetType;

let _ =
  describe("test MainEditorMaterialMap", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepare = () => {
      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;

      MainEditorAssetTool.buildFakeFileReader();

      LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
      LoadTool.buildFakeURL(sandbox^);

      LoadTool.buildFakeLoadImage(.);

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        SceneTreeWidgetService.getWidget(),
      )
      |> StateLogicService.getAndSetEditorState;
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    testPromise(
      {|load asset wdb;
      drag wdb;
      select wdb;

      inspector->material map should show its map|},
      () => {
        open Js.Promise;

        _prepare();

        DragWDBTool.testDragWDB(
          sandbox,
          ("CubeTextured", WDBTool.convertGLBToWDB("CubeTextured")),
          (
            shaderSourceCountBeforeDrag,
            shaderSourceCountAfterDrag,
            glShaderSource,
          ) => {
            LoadWDBTool.getCubeTexturedMeshGameObject(
              StateEngineService.unsafeGetState(),
            )
            |> GameObjectTool.setCurrentSceneTreeNode;

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch
            |> resolve;
          },
        );
      },
    );

    describe("test select texture group -> show order", () => {
      beforeEach(() => {
        sandbox := createSandbox();
        MainEditorSceneTool.initStateWithJob(
          ~sandbox,
          ~noWorkerJobRecord=
            NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
          (),
        );
        EventListenerTool.buildFakeDom()
        |> EventListenerTool.stubGetElementByIdReturnFakeDom;

        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
        );
      });
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

      test(
        {|
        order should be:
        sort texture assets by firstname alphabetically
        |},
        () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Texture.buildTwoTextureAssetTree();

          AssetTreeInspectorTool.Rename.renameAssetTextureNode(
            ~nodeId=
              MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                assetTreeData,
              ),
            ~name="BTexture",
            (),
          );
          AssetTreeInspectorTool.Rename.renameAssetTextureNode(
            ~nodeId=
              MainEditorAssetTreeTool.BuildAssetTree.Texture.getSecondTextureNodeId(
                assetTreeData,
              ),
            ~name="ATexture",
            (),
          );

          BuildComponentTool.buildMaterialMap(~isShowTextureGroup=true, ())
          |> ReactTestTool.createSnapshotAndMatch;
        },
      );
    });

    describe("fix bug", () => {
      beforeEach(() => {
        sandbox := createSandbox();
        MainEditorSceneTool.initStateWithJob(
          ~sandbox,
          ~noWorkerJobRecord=
            NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
          (),
        );
        EventListenerTool.buildFakeDom()
        |> EventListenerTool.stubGetElementByIdReturnFakeDom;

        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
        );
      });
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "test if has current texture component;
         show texture group;
        the current texture dom className should be select-item-active
      ",
        () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Texture.buildTwoTextureAssetTree();

          let firstTextureNodeId =
            MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
              assetTreeData,
            );
          let {textureComponent, imageDataIndex} =
            TextureNodeAssetEditorService.unsafeGetNodeData(
              firstTextureNodeId,
            )
            |> StateLogicService.getEditorState;

          ReactTestRenderer.create(
            MainEditorMaterialMapTool.renderTextureGroup(
              {
                style: ReactDOMRe.Style.make(~opacity="1", ()),
                isShowTextureGroup: true,
                currentTextureComponent: Some(textureComponent),
              },
              (() => ()) |> Obj.magic,
            ),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        },
      );
    });
  });