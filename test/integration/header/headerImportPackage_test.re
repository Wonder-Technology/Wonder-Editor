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
          open MainEditorAssetTreeTool;
          open MainEditorAssetTreeNodeTool;

          let (rootId, editorState) =
            StateEditorService.getState() |> _increaseIndex;
          let engineState = StateEngineService.unsafeGetState();

          let (id1, editorState) = editorState |> _increaseIndex;
          let (id2, editorState) = editorState |> _increaseIndex;

          editorState
          |> AssetTreeRootEditorService.setAssetTreeRoot({
               nodeId: rootId,
               type_: Folder,
               isShowChildren: true,
               children: [||],
             })
          |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMap(
               rootId,
               None,
               _,
               engineState,
             )
          |> addTextureIntoNodeMap(id1, rootId, "texture1")
          |> addTextureIntoNodeMap(id2, rootId, "texture2")
          |> AssetTreeRootEditorService.setAssetTreeRoot({
               nodeId: rootId,
               type_: Folder,
               isShowChildren: true,
               children: [|
                 {
                   nodeId: id1,
                   type_: Texture,
                   isShowChildren: true,
                   children: [||],
                 },
                 {
                   nodeId: id2,
                   type_: Texture,
                   isShowChildren: true,
                   children: [||],
                 },
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
                              nodeId: textureAssetId1,
                              type_: AssetNodeType.Texture,
                              isShowChildren: true,
                              children: [||],
                            },
                            {
                              nodeId: textureAssetId2,
                              type_: AssetNodeType.Texture,
                              isShowChildren: true,
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