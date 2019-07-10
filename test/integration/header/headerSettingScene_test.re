open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("Header Setting->Scene", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test Scene", () => {
      test("test ui->scene modal snapshot", () =>
        HeaderSettingTool.UI.buildSetting(~isShowSceneModal=true, ())
        |> ReactTestTool.createSnapshotAndMatch
      );

      describe("test ambient light", () =>
        describe("test change color", () => {
          test("should set into engine", () => {
            let newColor = PickColorTool.buildColor1();

            HeaderSettingTool.Scene.Ambient.changeColor(newColor);

            SceneEngineService.getAmbientLightColor
            |> StateLogicService.getEngineStateToGetData
            |> Color.getHexString
            |> expect ==
            newColor##hex;
          });
          test("should update ui", () => {
            let newColor = PickColorTool.buildColor1();

            HeaderSettingTool.Scene.Ambient.changeColor(newColor);

            HeaderSettingTool.UI.buildSetting(~isShowSceneModal=true, ())
            |> ReactTestTool.createSnapshotAndMatch;
          });
        })
      );

      describe("test skybox", () => {
        describe("test select cubemap group -> show order", () =>
          test(
            {|
        order should be:
        sort cubemap assets by firstname alphabetically
        |},
            () => {
              let assetTreeData =
                MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();
              let addedCubemapNodeId = MainEditorAssetIdTool.getNewAssetId();
              MainEditorAssetHeaderOperateNodeTool.addCubemap();

              AssetTreeInspectorTool.Rename.renameAssetCubemapNode(
                ~nodeId=
                  MainEditorAssetTreeTool.BuildAssetTree.Cubemap.getFirstCubemapNodeId(
                    assetTreeData,
                  ),
                ~name="BCubemap",
                (),
              );
              AssetTreeInspectorTool.Rename.renameAssetCubemapNode(
                ~nodeId=addedCubemapNodeId,
                ~name="ACubemap",
                (),
              );

              HeaderSettingTool.UI.buildSettingSceneModal(
                ~isShowCubemapGroup=true,
                (),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            },
          )
        );

        describe("test has no cubemap", () =>
          test("ui->modal->skybox should has no cubemap", () => {
            SceneEngineService.removeCubemapTexture
            |> StateLogicService.getAndSetEngineState;

            HeaderSettingTool.UI.buildSettingSceneModal()
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );

        describe("test select cubemap", () => {
          beforeEach(() => {
            let _ =
              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
            let addedCubemapNodeId = MainEditorAssetIdTool.getNewAssetId();
            MainEditorAssetHeaderOperateNodeTool.addCubemap();

            HeaderSettingTool.Scene.Skybox.setCubemapTextureToSceneSkybox(
              MainEditorAssetCubemapNodeTool.getCubemapTextureComponent(
                ~nodeId=addedCubemapNodeId,
                (),
              ),
            );
          });

          test("ui->modal->skybox should has cubemap", () =>
            HeaderSettingTool.UI.buildSettingSceneModal()
            |> ReactTestTool.createSnapshotAndMatch
          );
          test("should set to skybox", () =>
            SceneEngineService.getCubemapTexture
            |> StateLogicService.getEngineStateToGetData
            |> Js.Option.isSome
            |> expect == true
          );
        });
      });
    });
  });