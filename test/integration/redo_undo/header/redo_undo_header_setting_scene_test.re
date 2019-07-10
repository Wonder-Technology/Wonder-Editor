open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: header->setting->scene", () => {
    let sandbox = getSandboxDefaultVal();

    let _beforeEach = () => MainEditorSceneTool.prepareScene(sandbox);

    let _afterEach = () => ();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test skybox", () => {
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

      let _simulateRemoveSkyboxCubemapTexture = () => {
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

        HeaderSettingTool.Scene.Skybox.removeCubemap();
      };

      RedoUndoTool.testRedoUndoOneStep(
        sandbox,
        "test set skybox->cubemap texture",
        (_simulateSetSkyboxCubemapTexture, _beforeEach, _afterEach),
        HeaderSettingTool.UI.buildSettingSceneModal,
      );

      RedoUndoTool.testRedoUndoOneStep(
        sandbox,
        "test remove skybox->cubemap texture",
        (_simulateRemoveSkyboxCubemapTexture, _beforeEach, _afterEach),
        HeaderSettingTool.UI.buildSettingSceneModal,
      );
    });
  });