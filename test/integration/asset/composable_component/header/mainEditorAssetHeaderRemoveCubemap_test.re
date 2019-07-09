open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorAssetHeader->remove cubemap", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );
    });

    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe(
      {|
        select cubemap;
        click remove-button;
            |},
      () =>
      test("should remove it from assetTreeRoot", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();

        MainEditorAssetHeaderOperateNodeTool.removeCubemapNode(
          ~cubemapNodeId=
            MainEditorAssetTreeTool.BuildAssetTree.Cubemap.getFirstCubemapNodeId(
              assetTreeData,
            ),
          (),
        );

        BuildComponentTool.buildAssetChildrenNode()
        |> ReactTestTool.createSnapshotAndMatch;
      })
    );

    describe("should remove it from engineState", () => {
      describe("if scene skybox use it", () => {
        let _prepare = () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();

          let firstCubemapNodeId =
            MainEditorAssetTreeTool.BuildAssetTree.Cubemap.getFirstCubemapNodeId(
              assetTreeData,
            );

          SceneEngineService.setCubemapTexture(
            MainEditorAssetCubemapNodeTool.getCubemapTextureComponent(
              ~nodeId=firstCubemapNodeId,
              (),
            ),
          )
          |> StateLogicService.getAndSetEngineState;

          firstCubemapNodeId;
        };

        test("remove it", () => {
          let firstCubemapNodeId = _prepare();

          MainEditorAssetHeaderOperateNodeTool.removeCubemapNode(
            ~cubemapNodeId=firstCubemapNodeId,
            (),
          );

          SceneEngineService.getCubemapTexture
          |> StateLogicService.getEngineStateToGetData
          |> expect == None;
        });
        test("dispose it", () => {
          let firstCubemapNodeId = _prepare();
          let cubemapTexture =
            MainEditorAssetCubemapNodeTool.getCubemapTextureComponent(
              ~nodeId=firstCubemapNodeId,
              (),
            );

          MainEditorAssetHeaderOperateNodeTool.removeCubemapNode(
            ~cubemapNodeId=firstCubemapNodeId,
            (),
          );

          CubemapTextureToolEngine.isAlive(cubemapTexture)
          |> StateLogicService.getEngineStateToGetData
          |> expect == false;
        });
      });

      describe("else", () =>
        test("not dispose it", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();

          let firstCubemapNodeId =
            MainEditorAssetTreeTool.BuildAssetTree.Cubemap.getFirstCubemapNodeId(
              assetTreeData,
            );
          let cubemapTexture =
            MainEditorAssetCubemapNodeTool.getCubemapTextureComponent(
              ~nodeId=firstCubemapNodeId,
              (),
            );

          MainEditorAssetHeaderOperateNodeTool.removeCubemapNode(
            ~cubemapNodeId=firstCubemapNodeId,
            (),
          );

          CubemapTextureToolEngine.isAlive(cubemapTexture)
          |> StateLogicService.getEngineStateToGetData
          |> expect == true;
        })
      );
    });
  });