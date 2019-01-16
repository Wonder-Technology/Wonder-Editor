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

      describe("handleDragEnter", () => {
        let _buildDragEnterResult =
            (~pageY, ~offsetTop=10, ~offsetHeight=8, ()) =>
          SceneTreeNode.Method.handleDragEnter(
            MainEditorSceneTool.getFirstCube(
              StateEngineService.unsafeGetState(),
            ),
            (
              SceneTreeWidgetService.isWidget,
              CheckSceneTreeLogicService.checkGameObjectRelation,
              WDBNodeAssetEditorService.isWDBAssetFile,
            ),
            BaseEventTool.buildDragEventWithMouse(
              ~pageY,
              ~offsetTop,
              ~offsetHeight,
              (),
            ),
          );
        beforeEach(() =>
          CurrentDragSourceEditorService.setCurrentDragSource((
            SceneTreeWidgetService.getWidget(),
            MainEditorSceneTool.getSecondCube(
              StateEngineService.unsafeGetState(),
            ),
          ))
          |> StateLogicService.getAndSetEditorState
        );
        test(
          "if pageY < offsetTop + gapHeight, return DragEnter(DragBeforeTarget) ",
          () =>
          _buildDragEnterResult(~pageY=12, ())
          |> expect == SceneTreeNode.DragEnter(DragBeforeTarget)
        );
        test(
          "if pageY > offsetTop + offsetHeight - gapHeight, return DragEnter(DragAfterTarget)",
          () =>
          _buildDragEnterResult(~pageY=25, ())
          |> expect == SceneTreeNode.DragEnter(DragAfterTarget)
        );
        test("else, return DragEnter(DragIntoTarget)", () =>
          _buildDragEnterResult(~pageY=20, ())
          |> expect == SceneTreeNode.DragEnter(DragIntoTarget)
        );
      });

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
                  SceneTreeNodeType.DragIntoTarget,
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
                          SceneTreeNodeType.DragIntoTarget,
                        );
            },
          )
        )
      );
    });

    describe("test drag gameObject to be target gameObject sib", () => {
      beforeEach(() =>
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
        )
      );
      afterEach(() => GameObjectTool.clearCurrentSceneTreeNode());

      describe("test snap shot", () => {
        test("no drag", () =>
          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch
        );

        test("test drag gameObject before target gameObject", () => {
          MainEditorSceneTreeTool.Drag.dragGameObjectToBeTargetSib(
            ~sourceGameObject=
              MainEditorSceneTool.getDirectionLightInDefaultScene(
                StateEngineService.unsafeGetState(),
              ),
            ~targetGameObject=
              MainEditorSceneTool.getFirstCube(
                StateEngineService.unsafeGetState(),
              ),
            ~dragPosition=SceneTreeNodeType.DragBeforeTarget,
            (),
          );

          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        });

        test("test drag gameObject into target gameObject", () => {
          MainEditorSceneTreeTool.Drag.dragGameObjectToBeTargetSib(
            ~sourceGameObject=
              MainEditorSceneTool.getDirectionLightInDefaultScene(
                StateEngineService.unsafeGetState(),
              ),
            ~targetGameObject=
              MainEditorSceneTool.getFirstCube(
                StateEngineService.unsafeGetState(),
              ),
            ~dragPosition=SceneTreeNodeType.DragIntoTarget,
            (),
          );

          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        });

        test("test drag gameObject after target gameObject", () => {
          MainEditorSceneTreeTool.Drag.dragGameObjectToBeTargetSib(
            ~sourceGameObject=
              MainEditorSceneTool.getDirectionLightInDefaultScene(
                StateEngineService.unsafeGetState(),
              ),
            ~targetGameObject=
              MainEditorSceneTool.getFirstCube(
                StateEngineService.unsafeGetState(),
              ),
            ~dragPosition=SceneTreeNodeType.DragAfterTarget,
            (),
          );

          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        });
      });
      describe("test logic", () => {
        describe("test not change child", () =>
          test("test no drag", () => {
            let engineState = StateEngineService.unsafeGetState();
            let (scene, (camera, cube1, cube2, directionLight)) =
              MainEditorSceneTool.getDefaultGameObjects(engineState);

            GameObjectUtils.getChildren(scene, engineState)
            |> expect == [|camera, cube1, cube2, directionLight|];
          })
        );

        describe("test change child", () =>
          test("test drag gameObject after target gameObject", () => {
            let engineState = StateEngineService.unsafeGetState();
            let (scene, (camera, cube1, cube2, directionLight)) =
              MainEditorSceneTool.getDefaultGameObjects(engineState);

            MainEditorSceneTreeTool.Drag.dragGameObjectToBeTargetSib(
              ~sourceGameObject=camera,
              ~targetGameObject=directionLight,
              ~dragPosition=SceneTreeNodeType.DragAfterTarget,
              (),
            );

            (
              GameObjectUtils.getChildren(scene, engineState),
              GameObjectUtils.getParentGameObject(camera, engineState),
              GameObjectUtils.getParentGameObject(
                directionLight,
                engineState,
              ),
            )
            |>
            expect == (
                        [|cube1, cube2, directionLight, camera|],
                        Some(scene),
                        Some(scene),
                      );
          })
        );
      });
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
          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch
        );
        test("drag treeNode into target treeNode", () => {
          MainEditorSceneTreeTool.Drag.dragGameObjectToBeTargetSib(
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

          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
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

          MainEditorSceneTreeTool.Drag.isTriggerDragCurrentSceneTreeNode(
            cube4,
          )
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