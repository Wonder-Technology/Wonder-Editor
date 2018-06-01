open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open AssetNodeType;

let _ =
  describe("MainEditorAssetFileContent", () => {
    let sandbox = getSandboxDefaultVal();

    let _getFromArray = (array, index) => ArrayService.getNth(index, array);
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("test ui component", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorAssetTool.initAssetTree(
            MainEditorAssetTool.buildThreeLayerAssetTreeRoot,
          ),
        );
        EventListenerTool.buildFakeDom()
        |> EventListenerTool.stubGetElementByIdReturnFakeDom;
      });
      describe("show currentParentNode's files and folders", () => {
        test(
          "if currentAssetChildrenNodeParent have no file or folder, show nothing",
          () => {
          let component = BuildComponentTool.buildAssetComponent();
          BaseEventTool.triggerComponentEvent(
            component,
            AssetTreeEventTool.clickAssetTreeNode(1),
          );
          component |> ReactTestTool.createSnapshotAndMatch;
        });
        test("else, show files and folder", () => {
          let component = BuildComponentTool.buildAssetComponent();
          BaseEventTool.triggerComponentEvent(
            component,
            AssetTreeEventTool.clickAssetTreeNode(2),
          );
          component |> ReactTestTool.createSnapshotAndMatch;
        });
      });
    });
    describe("test set currentNodeId", () => {
      beforeEach(() => {
        EventListenerTool.buildFakeDom()
        |> EventListenerTool.stubGetElementByIdReturnFakeDom;
        AssetCurrentNodeIdEditorService.clearCurrentNodeId
        |> StateLogicService.getEditorState
        |> ignore;
      });
      test("click img file to set currentNodeId", () => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorAssetTool.initAssetTree(
            MainEditorAssetTool.buildThreeLayerAssetTreeRoot,
          ),
        );
        let component = BuildComponentTool.buildAssetComponent();
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeEventTool.clickAssetTreeNode(2),
        );
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeEventTool.clickAssetTreeChildrenNode(2),
        );
        let editorState = StateEditorService.getState();
        let {name, type_, result} =
          editorState
          |> AssetNodeMapEditorService.unsafeGetNodeMap
          |> WonderCommonlib.SparseMapService.unsafeGet(
               editorState
               |> AssetCurrentNodeIdEditorService.unsafeGetCurrentNodeId,
             );
        type_ |> expect == AssetNodeType.Image;
      });
      test("click json file to set currentNodeId", () => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorAssetTool.initAssetTree(
            MainEditorAssetTool.buildThreeLayerAssetTreeRoot,
          ),
        );
        let component = BuildComponentTool.buildAssetComponent();
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeEventTool.clickAssetTreeNode(2),
        );
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeEventTool.clickAssetTreeChildrenNode(3),
        );
        let editorState = StateEditorService.getState();
        let {name, type_, result} =
          editorState
          |> AssetNodeMapEditorService.unsafeGetNodeMap
          |> WonderCommonlib.SparseMapService.unsafeGet(
               editorState
               |> AssetCurrentNodeIdEditorService.unsafeGetCurrentNodeId,
             );
        type_ |> expect == AssetNodeType.Json;
      });
      describe("click folder", () => {
        testPromise("single click folder, set folder is currentNodeId", () => {
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorAssetTool.initAssetTree(
              MainEditorAssetTool.buildFolderClickSimpleAssetTreeRoot,
            ),
          );
          let fakeDom =
            EventListenerTool.buildFakeDom()
            |> EventListenerTool.stubGetElementByIdReturnFakeDom;
          BuildComponentTool.buildAssetComponent();
          EventListenerTool.triggerEvent(fakeDom, "mousedown", {});
          Js.Promise.make((~resolve, ~reject) =>
            Timeout.setTimeout(
              () => {
                EventListenerTool.triggerEvent(fakeDom, "mousedown", {});
                switch (
                  StateEditorService.getState()
                  |> AssetCurrentNodeIdEditorService.getCurrentNodeId
                ) {
                | None => reject(. "fail" |> Obj.magic)
                | Some(file) =>
                  resolve(.
                    {
                      let {name, type_, result} =
                        StateEditorService.getState()
                        |> AssetNodeMapEditorService.unsafeGetNodeMap
                        |> WonderCommonlib.SparseMapService.unsafeGet(file);
                      type_ |> expect == AssetNodeType.Folder;
                    },
                  )
                };
              },
              300,
            )
          );
        });
        testPromise(
          "double click folder, set folder is currentAssetChildrenNodeParent",
          () => {
          let fakeDom =
            EventListenerTool.buildFakeDom()
            |> EventListenerTool.stubGetElementByIdReturnFakeDom;
          BuildComponentTool.buildAssetComponent();
          EventListenerTool.triggerEvent(fakeDom, "mousedown", {});
          Js.Promise.make((~resolve, ~reject) =>
            Timeout.setTimeout(
              () => {
                EventListenerTool.triggerEvent(fakeDom, "mousedown", {});
                Timeout.setTimeout(
                  () => {
                    EventListenerTool.triggerEvent(fakeDom, "mousedown", {});
                    resolve(.
                      {
                        let component =
                          BuildComponentTool.buildAssetComponent();
                        BaseEventTool.triggerComponentEvent(
                          component,
                          AssetTreeEventTool.clickAssetTreeNode(1),
                        );
                        component |> ReactTestTool.createSnapshotAndMatch;
                      },
                    );
                  },
                  200,
                );
              },
              100,
            )
          );
        });
      });
    });
  });