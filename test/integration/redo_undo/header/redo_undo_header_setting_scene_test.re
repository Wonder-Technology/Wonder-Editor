open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: header->setting->scene", () => {
    let sandbox = getSandboxDefaultVal();

    let _simulateSetSkyboxCubemapTexture = () => {
      let assetTreeData =
        MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();

      HeaderSettingTool.Scene.Skybox.setCubemapTextureToSceneSkybox(
        MainEditorAssetCubemapNodeTool.getCubemapTextureComponent(
          ~nodeId=
            MainEditorAssetTreeTool.BuildAssetTree.Cubemap.getFirstCubemapNodeId(
              assetTreeData,
            ),
          (),
        ),
      );
    };

    let _beforeEach = () => MainEditorSceneTool.prepareScene(sandbox);

    let _afterEach = () => ();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set skybox->cubemap texture", () =>
      RedoUndoTool.testRedoUndoOneStep(
        sandbox,
        "test redo/undo one step",
        (_simulateSetSkyboxCubemapTexture, _beforeEach, _afterEach),
        HeaderSettingTool.UI.buildSettingSceneModal,
      )
    );
  });