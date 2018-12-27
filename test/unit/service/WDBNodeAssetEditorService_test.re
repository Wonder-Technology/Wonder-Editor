open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("WDBNodeAssetEditorService", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("isWDBAssetFile", () => {
      beforeEach(() => {
        MainEditorSceneTool.initState(~sandbox, ());

        MainEditorSceneTool.prepareScene(sandbox);
      });

      describe("test current drag source contain asset widget", () => {
        test("if current drag source contain texture node, return false", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();
          let textureNodeId =
            MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
              assetTreeData,
            );

          let editorState = StateEditorService.getState();
          let editorState =
            CurrentDragSourceEditorService.setCurrentDragSource(
              (AssetWidgetService.getWidget(), textureNodeId),
              editorState,
            );
          editorState |> StateEditorService.setState |> ignore;

          WDBNodeAssetEditorService.isWDBAssetFile() |> expect == false;
        });
        test("if current drag source contain wdb node, return true", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.WDB.buildOneWDBAssetTree();
          let wdbNodeId =
            MainEditorAssetTreeTool.BuildAssetTree.WDB.getFirstWDBNodeId(
              assetTreeData,
            );

          let editorState = StateEditorService.getState();
          let editorState =
            CurrentDragSourceEditorService.setCurrentDragSource(
              (AssetWidgetService.getWidget(), wdbNodeId),
              editorState,
            );
          editorState |> StateEditorService.setState |> ignore;

          WDBNodeAssetEditorService.isWDBAssetFile() |> expect == true;
        });
      });
    });
  });