open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorAssetHeader->add imgui exec func data", () => {
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

          MainEditorAssetHeaderOperateNodeTool.addIMGUIExecFuncData();

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
          MainEditorAssetHeaderOperateNodeTool.addIMGUIExecFuncData();

          BuildComponentTool.buildAssetChildrenNode()
          |> ReactTestTool.createSnapshotAndMatch;
        })
      )
    );

    describe("test name", () =>
      describe("name should be unique in imgui exec func data assets", () =>
        test("test add imgui exec func data asset in different folders", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();

          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                assetTreeData,
              ),
            (),
          );
          MainEditorAssetHeaderOperateNodeTool.addIMGUIExecFuncData();

          let addedNodeId = MainEditorAssetIdTool.getNewAssetId();

          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getRootNodeId(
                assetTreeData,
              ),
            (),
          );
          MainEditorAssetHeaderOperateNodeTool.addIMGUIExecFuncData();

          IMGUIExecFuncDataNodeAssetEditorService.getNodeName(addedNodeId)
          |> StateLogicService.getEditorState
          |> expect
          == (
               IMGUIExecFuncDataNodeNameAssetService.getNewName()
               |> MainEditorAssetNameTool.buildUniqueName
             );
        })
      )
    );
  });