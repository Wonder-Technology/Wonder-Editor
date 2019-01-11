open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorSceneTree;

open Js.Promise;

let _ =
  describe("MainEditorSceneTree", () => {
    let sandbox = getSandboxDefaultVal();

    let _getFromArray = (array, index) =>
      ArrayService.unsafeGetNth(index, array);

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test drag", () => {
      beforeEach(() =>
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
        )
      );
      afterEach(() => GameObjectTool.clearCurrentSceneTreeNode());

      describe("handleDragEnter", () =>
        test(
          "if is scene tree widget and pass check relation, return DragEnter",
          () => {
          CurrentDragSourceEditorService.setCurrentDragSource((
            SceneTreeWidgetService.getWidget(),
            MainEditorSceneTool.getSecondCube(
              StateEngineService.unsafeGetState(),
            ),
          ))
          |> StateLogicService.getAndSetEditorState;

          let result =
            SceneTreeNode.Method.handleDragEnter(
              MainEditorSceneTool.getFirstCube(
                StateEngineService.unsafeGetState(),
              ),
              (
                SceneTreeWidgetService.isWidget,
                CheckSceneTreeLogicService.checkGameObjectRelation,
                WDBNodeAssetEditorService.isWDBAssetFile,
              ),
              BaseEventTool.buildDragEvent(.),
            );

          result |> expect == SceneTreeNode.DragEnter;
        })
      );

      describe("handleDragDrop", () =>
        describe("test drag gameObject", () =>
          test(
            "if is scene tree widget and pass check relation, return DragGameObject(targetGameObject, sourceGameObject)",
            () => {
              let sourceGameObject =
                MainEditorSceneTool.getSecondCube(
                  StateEngineService.unsafeGetState(),
                );

              let targetGameObject =
                MainEditorSceneTool.getFirstCube(
                  StateEngineService.unsafeGetState(),
                );

              CurrentDragSourceEditorService.setCurrentDragSource((
                SceneTreeWidgetService.getWidget(),
                sourceGameObject,
              ))
              |> StateLogicService.getAndSetEditorState;

              let result =
                SceneTreeNode.Method.handleDrop(
                  targetGameObject,
                  (
                    SceneTreeWidgetService.isWidget,
                    CheckSceneTreeLogicService.checkGameObjectRelation,
                    WDBNodeAssetEditorService.isWDBAssetFile,
                  ),
                  BaseEventTool.buildDragEventWithDataMap(
                    WonderCommonlib.HashMapService.createEmpty()
                    |> WonderCommonlib.HashMapService.set(
                         "draggedId",
                         sourceGameObject,
                       ),
                  ),
                );

              result
              |>
              expect == SceneTreeNode.DragGameObject(
                          targetGameObject,
                          sourceGameObject,
                        );
            },
          )
        )
      );
    });

    describe("get sceneTree from engine", () => {
      describe("test should update", () => {
        test("if reatinedProps updateTypeArr include All, should update", () =>
          shouldUpdate(
            OldNewSelfTool.buildNewSelf({
              updateTypeArr: [|UpdateStore.All|] |> Obj.magic,
            }),
          )
          |> expect == true
        );
        test(
          "else if reatinedProps updateTypeArr include SceneTree, should update",
          () =>
          shouldUpdate(
            OldNewSelfTool.buildNewSelf({
              updateTypeArr: [|UpdateStore.SceneTree|] |> Obj.magic,
            }),
          )
          |> expect == true
        );
        test("else, should not update", () =>
          shouldUpdate(
            OldNewSelfTool.buildNewSelf({
              updateTypeArr:
                [|UpdateStore.Project, UpdateStore.Inspector|] |> Obj.magic,
            }),
          )
          |> expect == false
        );
      });

      describe("test simple scene graph data which haven't children case", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
          )
        );
        afterEach(() => GameObjectTool.clearCurrentSceneTreeNode());
        test("no drag", () =>
          BuildComponentTool.buildSceneTree(
            TestTool.buildEmptyAppState(),
          )
          |> ReactTestTool.createSnapshotAndMatch
        );
        test("drag treeNode into target treeNode", () => {
          MainEditorSceneTreeTool.Drag.dragGameObjectIntoGameObject(
            ~sourceGameObject=
              MainEditorSceneTool.getFirstCube(
                StateEngineService.unsafeGetState(),
              ),
            ~targetGameObject=
              MainEditorSceneTool.getSecondCube(
                StateEngineService.unsafeGetState(),
              ),
            (),
          );

          BuildComponentTool.buildSceneTree(
            TestTool.buildEmptyAppState(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        });
      });

      describe("set current gameObject", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(sandbox, () => ())
        );
        test("click treeNode to set it to be currentSceneTreeNode", () => {
          MainEditorSceneTreeTool.Select.selectGameObject(
            ~gameObject=
              MainEditorSceneTool.getFirstCube(
                StateEngineService.unsafeGetState(),
              ),
            (),
          );

          GameObjectTool.unsafeGetCurrentSceneTreeNode()
          |>
          expect == MainEditorSceneTool.getFirstCube(
                      StateEngineService.unsafeGetState(),
                    );
        });
      });

      describe("deal with the specific case", () => {
        test("if drag treeNode into itself, keep not change", () => {
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
          );

          MainEditorSceneTreeTool.Drag.isTriggerDragCurrentSceneTreeNode(
            GameObjectTool.unsafeGetCurrentSceneTreeNode(),
          )
          |> expect == false;
        });
        test(
          "if drag treeNode into it's first layer chidlren, keep not change",
          () => {
          let (scene, (cube1, cube4), cube2, cube3) =
            SceneTreeTool.buildThreeLayerSceneGraphToEngine(sandbox);

          cube1 |> GameObjectTool.setCurrentSceneTreeNode;

          MainEditorSceneTreeTool.Drag.isTriggerDragCurrentSceneTreeNode(cube4)
          |> expect == false;
        });
        describe("if drag treeNode into it's second layer chidlren", () =>
          test(
            "if drag treeNode into it's second layer chidlren, keep not change",
            () => {
            let (scene, (cube1, cube3, cube4), cube2) =
              SceneTreeTool.buildFourLayerSceneGraphToEngine(sandbox);

            cube1 |> GameObjectTool.setCurrentSceneTreeNode;

            MainEditorSceneTreeTool.Drag.isTriggerDragCurrentSceneTreeNode(
              cube4,
            )
            |> expect == false;
          })
        );
      });
    });
  });