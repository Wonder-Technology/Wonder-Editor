open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorAssetHeader->add imgui custom control", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.prepareScene(sandbox);

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("if not select specific treeNode", () =>
      describe("should add into root treeNode", () =>
        test("test snapshot", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

          MainEditorAssetHeaderOperateNodeTool.addIMGUICustomControl();

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
          MainEditorAssetHeaderOperateNodeTool.addIMGUICustomControl();

          BuildComponentTool.buildAssetChildrenNode()
          |> ReactTestTool.createSnapshotAndMatch;
        })
      )
    );

    describe("test name", () =>
      describe("name should be unique in imgui custom control assets", () =>
        test("test add imgui custom control asset in different folders", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();

          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                assetTreeData,
              ),
            (),
          );
          MainEditorAssetHeaderOperateNodeTool.addIMGUICustomControl();

          let addedNodeId = MainEditorAssetIdTool.getNewAssetId();

          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getRootNodeId(
                assetTreeData,
              ),
            (),
          );
          MainEditorAssetHeaderOperateNodeTool.addIMGUICustomControl();

          IMGUICustomControlNodeAssetEditorService.getNodeName(addedNodeId)
          |> StateLogicService.getEditorState
          |> expect
          == (
               IMGUICustomControlNodeNameAssetService.getNewName()
               |> MainEditorAssetNameTool.buildUniqueName
             );
        })
      )
    );
  });