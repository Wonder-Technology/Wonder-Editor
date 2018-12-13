open Wonder_jest;

open TreeTester;

open AssetTree;

let _ =
  describe("TreeTester", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("setNodeIsShowChildren", () => {
      let _buildTree = () => {
        let rootNodeId = 0;
        let folder1NodeId = 1;
        let wdb1NodeId = 2;
        let wdb1GameObject = 0;

        let root = buildFolderNode(rootNodeId, "Assets", UIState.build());

        let folder1 =
          buildFolderNode(folder1NodeId, "folder1", UIState.build());

        let wdb1 = buildWDBNode(wdb1NodeId, "wdb1", wdb1GameObject);

        let tree =
          root
          |> insertNode(rootNodeId, folder1)
          |> insertNode(rootNodeId, wdb1);

        (rootNodeId, folder1NodeId, (wdb1NodeId, wdb1GameObject), tree);
      };

      test("test set node's children not be show", () => {
        let (rootNodeId, folder1NodeId, (wdb1NodeId, wdb1GameObject), tree) =
          _buildTree();

        let tree = tree |> setNodeIsShowChildren(folder1NodeId, false);

        isShowChildren(
          findNodeById(folder1NodeId, tree) |> OptionService.unsafeGet,
        )
        |> expect == false;
      });
    });

    describe("checkNodeRelation", () => {
      let _buildTree = () => {
        let rootNodeId = 0;
        let folder1NodeId = 1;
        let folder2NodeId = 2;
        let folder3NodeId = 3;
        let wdb1NodeId = 4;
        let wdb1GameObject = 0;
        let wdb2NodeId = 5;
        let wdb2GameObject = 1;

        let root = buildFolderNode(rootNodeId, "Assets", UIState.build());

        let folder1 =
          buildFolderNode(folder1NodeId, "folder1", UIState.build());
        let folder2 =
          buildFolderNode(folder2NodeId, "folder2", UIState.build());
        let folder3 =
          buildFolderNode(folder3NodeId, "folder3", UIState.build());

        let wdb1 = buildWDBNode(wdb1NodeId, "wdb1", wdb1GameObject);
        let wdb2 = buildWDBNode(wdb2NodeId, "wdb2", wdb2GameObject);

        let tree =
          root
          |> insertNode(rootNodeId, folder1)
          |> insertNode(folder1NodeId, folder2)
          |> insertNode(rootNodeId, folder3)
          |> insertNode(rootNodeId, wdb1)
          |> insertNode(folder2NodeId, wdb2);

        (
          (unsafeFindNodeById(rootNodeId, tree), rootNodeId),
          (
            (unsafeFindNodeById(folder1NodeId, tree), folder1NodeId),
            (unsafeFindNodeById(folder2NodeId, tree), folder2NodeId),
            (unsafeFindNodeById(folder3NodeId, tree), folder3NodeId),
          ),
          (
            (
              unsafeFindNodeById(wdb1NodeId, tree),
              wdb1NodeId,
              wdb1GameObject,
            ),
            (
              unsafeFindNodeById(wdb2NodeId, tree),
              wdb2NodeId,
              wdb2GameObject,
            ),
          ),
          tree,
        );
      };

      test("if target node isn't folder node, fail", () => {
        let (
          (root, rootNodeId),
          (
            (folder1, folder1NodeId),
            (folder2, folder2NodeId),
            (folder3, folder3NodeId),
          ),
          (
            (wdb1, wdb1NodeId, wdb1GameObject),
            (wdb2, wdb2NodeId, wdb2GameObject),
          ),
          tree,
        ) =
          _buildTree();

        checkNodeRelation(wdb1, wdb2)
        |> expect == Fail("target node should be folder");
      });
      test("if is same node, fail", () => {
        let (
          (root, rootNodeId),
          (
            (folder1, folder1NodeId),
            (folder2, folder2NodeId),
            (folder3, folder3NodeId),
          ),
          (
            (wdb1, wdb1NodeId, wdb1GameObject),
            (wdb2, wdb2NodeId, wdb2GameObject),
          ),
          tree,
        ) =
          _buildTree();

        checkNodeRelation(folder1, folder1)
        |> expect == Fail("source and target node shouldn't be the same");
      });
      test("if source node is one of all parents of the target node, fail", () => {
        let (
          (root, rootNodeId),
          (
            (folder1, folder1NodeId),
            (folder2, folder2NodeId),
            (folder3, folder3NodeId),
          ),
          (
            (wdb1, wdb1NodeId, wdb1GameObject),
            (wdb2, wdb2NodeId, wdb2GameObject),
          ),
          tree,
        ) =
          _buildTree();

        checkNodeRelation(root, folder2)
        |>
        expect == Fail(
                    "source node shouldn't be one of all parents of the target node",
                  );
      });
      test("if target node is the parent of the source node, fail", () => {
        let (
          (root, rootNodeId),
          (
            (folder1, folder1NodeId),
            (folder2, folder2NodeId),
            (folder3, folder3NodeId),
          ),
          (
            (wdb1, wdb1NodeId, wdb1GameObject),
            (wdb2, wdb2NodeId, wdb2GameObject),
          ),
          tree,
        ) =
          _buildTree();

        checkNodeRelation(folder2, folder1)
        |>
        expect == Fail(
                    "target node shouldn't be the parent of the source node",
                  );
      });
      test(
        "if target node has the child with the same name of the source node, fail",
        () => {
        let (
          (root, rootNodeId),
          (
            (folder1, folder1NodeId),
            (folder2, folder2NodeId),
            (folder3, folder3NodeId),
          ),
          (
            (wdb1, wdb1NodeId, wdb1GameObject),
            (wdb2, wdb2NodeId, wdb2GameObject),
          ),
          tree,
        ) =
          _buildTree();

        let tree =
          renameNode(folder2NodeId, "folder3", tree)
          |> HandleTreeResult.getTree;

        checkNodeRelation(
          unsafeFindNodeById(folder3NodeId, tree),
          unsafeFindNodeById(folder1NodeId, tree),
        )
        |>
        expect == Fail(
                    "target node shouldn't has the child with the same name of the source node",
                  );
      });
      test("else, correct", () => {
        let (
          (root, rootNodeId),
          (
            (folder1, folder1NodeId),
            (folder2, folder2NodeId),
            (folder3, folder3NodeId),
          ),
          (
            (wdb1, wdb1NodeId, wdb1GameObject),
            (wdb2, wdb2NodeId, wdb2GameObject),
          ),
          tree,
        ) =
          _buildTree();

        checkNodeRelation(folder2, root) |> expect == Success;
      });
    });

    describe("renameNode", () => {
      let _buildTree = () => {
        let rootNodeId = 0;
        let folder1NodeId = 1;
        let folder2NodeId = 2;
        let wdb1NodeId = 3;
        let wdb1GameObject = 0;

        let root = buildFolderNode(rootNodeId, "Assets", UIState.build());

        let folder1 =
          buildFolderNode(folder1NodeId, "folder1", UIState.build());
        let folder2 =
          buildFolderNode(folder2NodeId, "folder2", UIState.build());

        let wdb1 = buildWDBNode(wdb1NodeId, "wdb1", wdb1GameObject);

        let tree =
          root
          |> insertNode(rootNodeId, folder1)
          |> insertNode(folder1NodeId, folder2)
          |> insertNode(folder1NodeId, wdb1);

        (
          (unsafeFindNodeById(rootNodeId, tree), rootNodeId),
          (
            (unsafeFindNodeById(folder1NodeId, tree), folder1NodeId),
            (unsafeFindNodeById(folder2NodeId, tree), folder2NodeId),
          ),
          (unsafeFindNodeById(wdb1NodeId, tree), wdb1NodeId, wdb1GameObject),
          tree,
        );
      };

      test("if parent node has the child with the same name, fail", () => {
        let (
          (root, rootNodeId),
          ((folder1, folder1NodeId), (folder2, folder2NodeId)),
          (wdb1, wdb1NodeId, wdb1GameObject),
          tree,
        ) =
          _buildTree();

        let result = renameNode(wdb1NodeId, "folder2", tree);

        result |> HandleTreeResult.isFail |> expect == true;
      });
    });

    /* describe("addFolderNodesToTreeByPath", () => {
      let _buildTree = () => {
        let rootNodeId = 0;
        let folder1NodeId = 1;
        let folder2NodeId = 2;
        let wdb1NodeId = 3;
        let wdb1GameObject = 0;

        let root = buildFolderNode(rootNodeId, "Assets", UIState.build());

        let folder1 =
          buildFolderNode(folder1NodeId, "folder1", UIState.build());
        let folder2 =
          buildFolderNode(folder2NodeId, "folder2", UIState.build());

        let wdb1 = buildWDBNode(wdb1NodeId, "wdb1", wdb1GameObject);

        let tree =
          root
          |> insertNode(rootNodeId, folder1)
          |> insertNode(folder1NodeId, folder2)
          |> insertNode(folder1NodeId, wdb1);

        (
          (unsafeFindNodeById(rootNodeId, tree), rootNodeId),
          (
            (unsafeFindNodeById(folder1NodeId, tree), folder1NodeId),
            (unsafeFindNodeById(folder2NodeId, tree), folder2NodeId),
          ),
          (unsafeFindNodeById(wdb1NodeId, tree), wdb1NodeId, wdb1GameObject),
          tree,
        );
      };

      test("aaa", () => {
        let (
          (root, rootNodeId),
          ((folder1, folder1NodeId), (folder2, folder2NodeId)),
          (wdb1, wdb1NodeId, wdb1GameObject),
          tree,
        ) =
          _buildTree();

        let editorState = CreateEditorStateEditorService.create();

        let (tree, editorState) =
          addFolderNodesToTreeByPath(
            "Assets/folder1/folder2/Textures/aaa",
            tree,
            editorState,
          );

        WonderLog.Log.printJson(("aaa:", tree)) |> ignore;

        1 |> expect == 1;
      });
    }); */
  });