open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

open Js.Typed_array;

let _ =
  describe("header import package", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test import package->assets", () =>
      describe("test import texture assets", () => {
        let _buildAssetTreeRoot = () => {
          open MainEditorAssetTool;

          let (rootId, editorState) =
            StateEditorService.getState() |> _increaseIndex;
          let (id1, editorState) = editorState |> _increaseIndex;
          let (id2, editorState) = editorState |> _increaseIndex;

          editorState
          |> AssetTreeRootEditorService.setAssetTreeRoot({
               id: rootId,
               type_: Folder,
               children: [||],
             })
          |> AssetTreeNodeUtils.addFolderIntoNodeMap(rootId, None)
          |> addTextureIntoNodeMap(id1, rootId, "texture1")
          |> addTextureIntoNodeMap(id2, rootId, "texture2")
          |> AssetTreeRootEditorService.setAssetTreeRoot({
               id: rootId,
               type_: Folder,
               children: [|
                 {id: id1, type_: Texture, children: [||]},
                 {id: id2, type_: Texture, children: [||]},
               |],
             })
          |> StateEditorService.setState;

          (id1, id2);
        };

        beforeEach(() => {
          MainEditorSceneTool.initState(~sandbox, ());

          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
          );

          MainEditorAssetHeaderWDBTool.buildFakeTextEncoder();
          MainEditorAssetHeaderWDBTool.buildFakeURL(sandbox^);

          MainEditorAssetHeaderWDBTool.buildFakeLoadImage(.);

          MainEditorAssetTool.buildFakeImage();
        });

        testPromise("should add texture assets to asset tree", () =>
          ImportPackageTool.testImportTexture(
            ~sandbox,
            ~buildAssetTreeRootFunc=_buildAssetTreeRoot,
            ~testFunc=
              ((textureAssetId1, textureAssetId2), editorState) => {
                let root =
                  editorState
                  |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot;

                root.children
                |>
                expect == [|
                            {
                              id: textureAssetId1,
                              type_: AssetNodeType.Texture,
                              children: [||],
                            },
                            {
                              id: textureAssetId2,
                              type_: AssetNodeType.Texture,
                              children: [||],
                            },
                          |];
              },
            (),
          )
        );
      })
    );
  });