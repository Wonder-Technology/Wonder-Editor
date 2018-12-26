open Wonder_jest;
open Expect;
open Expect.Operators;
open Sinon;

let _ =
  describe("IterateAssetService", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("findOne", () =>
      test("find one matched node", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

        let editorState = StateEditorService.getState();

        IterateTreeAssetService.findOne(
          ~tree=TreeAssetEditorService.unsafeGetTree(editorState),
          ~predTextureNodeFunc=
            node =>
              NodeAssetService.isIdEqual(
                NodeAssetService.getNodeId(~node),
                MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                  assetTreeData,
                ),
              ),
          (),
        )
        |> Js.Option.isSome
        |> expect == true;
      })
    );
  });