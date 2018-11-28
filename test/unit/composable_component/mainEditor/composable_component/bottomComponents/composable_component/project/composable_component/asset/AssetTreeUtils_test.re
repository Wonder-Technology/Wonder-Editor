open Wonder_jest;
open Expect;
open Expect.Operators;
open Sinon;

let _ =
  describe("AssetTreeUtils", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("isTreeNodeRelationError", () => {
      beforeEach(() => {
        MainEditorSceneTool.initState(~sandbox, ());

        let engineState = StateEngineService.unsafeGetState();
        engineState
        |> FakeGlToolEngine.setFakeGl(
             FakeGlToolEngine.buildFakeGl(~sandbox, ()),
           )
        |> StateEngineService.setState
        |> ignore;
      });

      test("if source and target node is the same node, return true", () =>
        AssetTreeUtils.isTreeNodeRelationError(true, 10, 10)
        |> StateLogicService.getStateToGetData
        |> expect == true
      );

      describe("else", () => {
        test("if source node is target node's parent, return true", () => {
          let (rootId, editorState) =
            StateEditorService.getState()
            |> MainEditorAssetTreeTool._increaseIndex;
          let (id1, editorState) =
            editorState |> MainEditorAssetTreeTool._increaseIndex;

          let engineState = StateEngineService.unsafeGetState();

          let editorState =
            editorState
            |> TreeRootAssetEditorService.setAssetTreeRoot({
                 nodeId: rootId,
                 type_: Folder,
                 children: [||],
                 isShowChildren: true,
               })
            |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMapWithNoNameName(
                 rootId,
                 None,
                 _,
                 engineState,
               )
            |> MainEditorAssetTreeNodeTool.addTextureIntoNodeMap(
                 id1,
                 rootId,
                 "texture1",
               )
            |> TreeRootAssetEditorService.setAssetTreeRoot({
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
                 |],
               })
            |> StateEditorService.setState;

          AssetTreeUtils.isTreeNodeRelationError(
            true,
            id1,
            rootId,
            (editorState, engineState),
          )
          |> expect == true;
        });

        describe("else", () => {
          test("if target node is source node's parent, return true", () => {
            let (rootId, editorState) =
              StateEditorService.getState()
              |> MainEditorAssetTreeTool._increaseIndex;
            let (id1, editorState) =
              editorState |> MainEditorAssetTreeTool._increaseIndex;

            let engineState = StateEngineService.unsafeGetState();

            let editorState =
              editorState
              |> TreeRootAssetEditorService.setAssetTreeRoot({
                   nodeId: rootId,
                   type_: Folder,
                   children: [||],
                   isShowChildren: true,
                 })
              |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMapWithNoNameName(
                   rootId,
                   None,
                   _,
                   engineState,
                 )
              |> MainEditorAssetTreeNodeTool.addTextureIntoNodeMap(
                   id1,
                   rootId,
                   "texture1",
                 )
              |> TreeRootAssetEditorService.setAssetTreeRoot({
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
                   |],
                 })
              |> StateEditorService.setState;

            AssetTreeUtils.isTreeNodeRelationError(
              true,
              rootId,
              id1,
              (editorState, engineState),
            )
            |> expect == true;
          });
          test(
            "else if target node's children has the node which has the same name with source node, return true",
            () => {
              let (rootId, editorState) =
                StateEditorService.getState()
                |> MainEditorAssetTreeTool._increaseIndex;
              let (id1, editorState) =
                editorState |> MainEditorAssetTreeTool._increaseIndex;
              let (id2, editorState) =
                editorState |> MainEditorAssetTreeTool._increaseIndex;
              let (id3, editorState) =
                editorState |> MainEditorAssetTreeTool._increaseIndex;

              let engineState = StateEngineService.unsafeGetState();

              let editorState =
                editorState
                |> TreeRootAssetEditorService.setAssetTreeRoot({
                     nodeId: rootId,
                     type_: Folder,
                     children: [||],
                     isShowChildren: true,
                   })
                |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMapWithNoNameName(
                     rootId,
                     None,
                     _,
                     engineState,
                   )
                |> MainEditorAssetTreeNodeTool.addFolderIntoNodeMapWithNoNameName(
                     id1,
                     rootId |. Some,
                     _,
                     engineState,
                   )
                |> MainEditorAssetTreeNodeTool.addTextureIntoNodeMap(
                     id2,
                     rootId,
                     "texture2",
                   )
                |> TreeRootAssetEditorService.setAssetTreeRoot({
                     nodeId: rootId,
                     type_: Folder,
                     isShowChildren: true,
                     children: [|
                       {
                         nodeId: id1,
                         type_: Folder,
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
                |> MainEditorAssetTreeNodeTool.addTextureIntoNodeMap(
                     id3,
                     id1,
                     "texture2",
                   )
                |> TreeRootAssetEditorService.setAssetTreeRoot({
                     nodeId: rootId,
                     type_: Folder,
                     isShowChildren: true,
                     children: [|
                       {
                         nodeId: id1,
                         type_: Folder,
                         isShowChildren: true,
                         children: [|
                           {
                             nodeId: id3,
                             type_: Texture,
                             isShowChildren: true,
                             children: [||],
                           },
                         |],
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

              AssetTreeUtils.isTreeNodeRelationError(
                true,
                id1,
                id2,
                (editorState, engineState),
              )
              |> expect == true;
            },
          );
        });
      });
    });
  });