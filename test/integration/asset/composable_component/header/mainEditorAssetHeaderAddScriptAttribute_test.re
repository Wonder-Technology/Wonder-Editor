open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorAssetHeader->add script attribute", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("if not select specific treeNode", () =>
      describe("should add into root treeNode", () =>
        test("test snapshot", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

          MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();

          BuildComponentTool.buildAssetChildrenNode()
          |> ReactTestTool.createSnapshotAndMatch;
        })
      )
    );

    describe("else", () =>
      describe("add into specific treeNode", () =>
        test("test snapshot", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();

          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                assetTreeData,
              ),
            (),
          );
          MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();

          BuildComponentTool.buildAssetChildrenNode()
          |> ReactTestTool.createSnapshotAndMatch;
        })
      )
    );

    describe("test name", () =>
      describe("name should be unique in script attribute assets", () =>
        test("test add script attributes in different folders", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();

          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                assetTreeData,
              ),
            (),
          );
          MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();

          let addedNodeId = MainEditorAssetIdTool.getNewAssetId();

          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getRootNodeId(
                assetTreeData,
              ),
            (),
          );
          MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();

          ScriptAttributeNodeAssetService.getNodeName(
            OperateTreeAssetEditorService.unsafeFindNodeById(addedNodeId)
            |> StateLogicService.getEditorState,
          )
          |> expect
          == (
               ScriptAttributeNodeNameAssetService.getNewAttributeName()
               |> MainEditorAssetNameTool.buildUniqueName
             );
        })
      )
    );
  });