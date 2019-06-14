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
      MainEditorSceneTool.initInspectorEngineState(
        ~sandbox,
        ~isInitJob=false,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~initPipelines=
              {|
             [
              {
                "name": "default",
                "jobs": [
                    {"name": "init_inspector_engine" }
                ]
              }
            ]
             |},
            ~initJobs=
              {|
             [
                {"name": "init_inspector_engine" }
             ]
             |},
            (),
          ),
        (),
      );

      StateInspectorEngineService.unsafeGetState()
      |> MainUtils._handleInspectorEngineState
      |> StateInspectorEngineService.setState
      |> ignore;

      CanvasTool.prepareInspectorCanvasAndImgCanvas(sandbox) |> ignore;

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
          ("BoxTextured", WDBTool.convertGLBToWDB("BoxTextured")),
          (
            shaderSourceCountBeforeDrag,
            shaderSourceCountAfterDrag,
            glShaderSource,
          ) => {
            LoadWDBTool.getBoxTexturedMeshGameObject(
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