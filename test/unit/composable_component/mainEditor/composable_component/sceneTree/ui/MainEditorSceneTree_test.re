open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorSceneTree;

let _ =
  describe("MainEditorSceneTree", () => {
    let sandbox = getSandboxDefaultVal();
    let _getFromArray = (array, index) => ArrayService.getNth(index, array);
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("get sceneTree from engine", () => {
      describe("test simple scene graph data which haven't children case", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
          )
        );
        afterEach(() => GameObjectTool.clearCurrentSceneTreeNode());
        test("no drag", () =>
          BuildComponentTool.buildSceneTree(
            TestTool.buildAppStateSceneGraphFromEngine(),
          )
          |> ReactTestTool.createSnapshotAndMatch
        );
        test("drag treeNode into target treeNode", () => {
          let component =
            BuildComponentTool.buildSceneTree(
              TestTool.buildAppStateSceneGraphFromEngine(),
            );
          let firstCubeDomIndex =
            SceneTreeNodeDomTool.OperateDefaultScene.getFirstCubeDomIndex();
          let secondCubeDomIndex =
            SceneTreeNodeDomTool.OperateDefaultScene.getSecondCubeDomIndex();

          BaseEventTool.triggerComponentEvent(
            component,
            SceneTreeEventTool.triggerDragStart(secondCubeDomIndex),
          );
          BaseEventTool.triggerComponentEvent(
            component,
            SceneTreeEventTool.triggerDragEnter(firstCubeDomIndex),
          );
          BaseEventTool.triggerComponentEvent(
            component,
            SceneTreeEventTool.triggerDragLeave(firstCubeDomIndex),
          );
          BaseEventTool.triggerComponentEvent(
            component,
            SceneTreeEventTool.triggerDragDrop(firstCubeDomIndex),
          );
          let component2 =
            BuildComponentTool.buildSceneTree(
              TestTool.buildAppStateSceneGraphFromEngine(),
            );
          component2 |> ReactTestTool.createSnapshotAndMatch;
        });
      });
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
                [|UpdateStore.Asset, UpdateStore.Inspector|] |> Obj.magic,
            }),
          )
          |> expect == false
        );
      });
      describe("set current gameObject", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(sandbox, () => ())
        );
        test("click treeNode to set it to be currentSceneTreeNode", () => {
          let firstCubeDomIndex =
            SceneTreeNodeDomTool.OperateDefaultScene.getFirstCubeDomIndex();
          let component =
            BuildComponentTool.buildSceneTree(
              TestTool.buildAppStateSceneGraphFromEngine(),
            );

          BaseEventTool.triggerComponentEvent(
            component,
            SceneTreeEventTool.triggerClickEvent(firstCubeDomIndex),
          );

          GameObjectTool.unsafeGetCurrentSceneTreeNode()
          |>
          expect == (
                      MainEditorSceneTool.unsafeGetScene()
                      |> GameObjectTool.getChildren
                      |> ArrayService.getNth(firstCubeDomIndex)
                    );
        });
      });
      describe("test has children case", () => {
        describe("have first layer children", () => {
          beforeEach(() => SceneTreeTool.buildThreeLayerSceneGraphToEngine(sandbox));

          test("no drag", () =>
            BuildComponentTool.buildSceneTree(
              TestTool.buildAppStateSceneGraphFromEngine(),
            )
            |> ReactTestTool.createSnapshotAndMatch
          );
          test("drag treeNode into first layer treeNode parent", () => {
            let component =
              BuildComponentTool.buildSceneTree(
                TestTool.buildAppStateSceneGraphFromEngine(),
              );
            let firstLayerFirstCubeDomIndex =
              SceneTreeNodeDomTool.OperateThreeLayer.getFirstLayerFirstCubeDomIndex();
            let firstLayerThirdCubeDomIndex =
              SceneTreeNodeDomTool.OperateThreeLayer.getFirstLayerThirdCubeDomIndex();

            BaseEventTool.triggerComponentEvent(
              component,
              SceneTreeEventTool.triggerDragStart(
                firstLayerThirdCubeDomIndex,
              ),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              SceneTreeEventTool.triggerDragEnter(
                firstLayerFirstCubeDomIndex,
              ),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              SceneTreeEventTool.triggerDragDrop(firstLayerFirstCubeDomIndex),
            );

            BuildComponentTool.buildSceneTree(
              TestTool.buildAppStateSceneGraphFromEngine(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
          test("drag treeNode into first layer treeNode children", () => {
            let component =
              BuildComponentTool.buildSceneTree(
                TestTool.buildAppStateSceneGraphFromEngine(),
              );
            let firstLayerFirstCubeDomIndex =
              SceneTreeNodeDomTool.OperateThreeLayer.getFirstLayerFirstCubeDomIndex();
            let firstLayerThirdCubeDomIndex =
              SceneTreeNodeDomTool.OperateThreeLayer.getFirstLayerThirdCubeDomIndex();
            let secondLayerFirstCubeDomIndex =
              SceneTreeNodeDomTool.OperateThreeLayer.getSecondLayerFirstCubeDomIndex();

            BaseEventTool.triggerComponentEvent(
              component,
              SceneTreeEventTool.triggerDragStart(
                firstLayerThirdCubeDomIndex,
              ),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              SceneTreeEventTool.triggerDragEnterChildren(
                firstLayerFirstCubeDomIndex,
                secondLayerFirstCubeDomIndex,
              ),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              SceneTreeEventTool.triggerDragDropChildren(
                firstLayerFirstCubeDomIndex,
                secondLayerFirstCubeDomIndex,
              ),
            );

            BuildComponentTool.buildSceneTree(
              TestTool.buildAppStateSceneGraphFromEngine(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
          test("drag first layer child treeNode into root div", () => {
            let _triggerDragStartChildren =
                (parentIndex, childrenIndex, domChildren) => {
              let dragTreeArticle = _getFromArray(domChildren, 0);
              let treeNodeUl =
                _getFromArray(dragTreeArticle##children, parentIndex);
              let treeNodeChildrenUl =
                _getFromArray(treeNodeUl##children, childrenIndex);
              BaseEventTool.triggerDragStartEvent(
                treeNodeChildrenUl,
                BaseEventTool.buildDragEvent(),
              );
            };
            let _triggerDragOverDiv = (index, domChildren) => {
              let dragTreeArticle = _getFromArray(domChildren, 0);
              let div = _getFromArray(dragTreeArticle##children, index);
              BaseEventTool.triggerDragOverEvent(
                div,
                BaseEventTool.buildDragEvent(),
              );
            };
            let component =
              BuildComponentTool.buildSceneTree(
                TestTool.buildAppStateSceneGraphFromEngine(),
              );
            let firstLayerFirstCubeDomIndex =
              SceneTreeNodeDomTool.OperateThreeLayer.getFirstLayerFirstCubeDomIndex();
            let rootDivDomIndex =
              SceneTreeNodeDomTool.OperateThreeLayer.getRootDivDomIndex();
            let secondLayerFirstCubeDomIndex =
              SceneTreeNodeDomTool.OperateThreeLayer.getSecondLayerFirstCubeDomIndex();

            BaseEventTool.triggerComponentEvent(
              component,
              _triggerDragStartChildren(
                firstLayerFirstCubeDomIndex,
                secondLayerFirstCubeDomIndex,
              ),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              SceneTreeEventTool.triggerDragEnterDiv(rootDivDomIndex),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              SceneTreeEventTool.triggerDragLeaveDiv(rootDivDomIndex),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              _triggerDragOverDiv(rootDivDomIndex),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              SceneTreeEventTool.triggerDragDropDiv(rootDivDomIndex),
            );

            BuildComponentTool.buildSceneTree(
              TestTool.buildAppStateSceneGraphFromEngine(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
        });
        describe("have second layer children", () =>
          test("drag has second treeNode into no child treeNode", () => {
            SceneTreeTool.buildFourLayerSceneGraphToEngine(sandbox);

            let component =
              BuildComponentTool.buildSceneTree(
                TestTool.buildAppStateSceneGraphFromEngine(),
              );
            let firstLayerFirstCubeDomIndex =
              SceneTreeNodeDomTool.OperateFourLayer.getFirstLayerFirstCubeDomIndex();
            let firstLayerSecondCubeDomIndex =
              SceneTreeNodeDomTool.OperateFourLayer.getFirstLayerSecondCubeDomIndex();

            BaseEventTool.triggerComponentEvent(
              component,
              SceneTreeEventTool.triggerDragStart(
                firstLayerFirstCubeDomIndex,
              ),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              SceneTreeEventTool.triggerDragEnter(
                firstLayerSecondCubeDomIndex,
              ),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              SceneTreeEventTool.triggerDragDrop(
                firstLayerSecondCubeDomIndex,
              ),
            );

            BuildComponentTool.buildSceneTree(
              TestTool.buildAppStateSceneGraphFromEngine(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
      });
      describe("deal with the specific case", () => {
        test("if drag treeNode into itself, keep not change", () => {
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
          );
          let component =
            BuildComponentTool.buildSceneTree(
              TestTool.buildAppStateSceneGraphFromEngine(),
            );
          let firstCameraDomIndex =
            SceneTreeNodeDomTool.OperateDefaultScene.getFirstCameraDomIndex();

          BaseEventTool.triggerComponentEvent(
            component,
            SceneTreeEventTool.triggerDragStart(firstCameraDomIndex),
          );
          BaseEventTool.triggerComponentEvent(
            component,
            SceneTreeEventTool.triggerDragEnter(firstCameraDomIndex),
          );
          BaseEventTool.triggerComponentEvent(
            component,
            SceneTreeEventTool.triggerDragDrop(firstCameraDomIndex),
          );

          BuildComponentTool.buildSceneTree(
            TestTool.buildAppStateSceneGraphFromEngine(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        });
        test(
          "if drag treeNode into it's first layer chidlren, keep not change",
          () => {
          SceneTreeTool.buildThreeLayerSceneGraphToEngine(sandbox);

          let component =
            BuildComponentTool.buildSceneTree(
              TestTool.buildAppStateSceneGraphFromEngine(),
            );
          let firstLayerFirstCubeDomIndex =
            SceneTreeNodeDomTool.OperateThreeLayer.getFirstLayerFirstCubeDomIndex();
          let secondLayerFirstCubeDomIndex =
            SceneTreeNodeDomTool.OperateThreeLayer.getSecondLayerFirstCubeDomIndex();

          BaseEventTool.triggerComponentEvent(
            component,
            SceneTreeEventTool.triggerDragStart(firstLayerFirstCubeDomIndex),
          );
          BaseEventTool.triggerComponentEvent(
            component,
            SceneTreeEventTool.triggerDragEnterChildren(
              firstLayerFirstCubeDomIndex,
              secondLayerFirstCubeDomIndex,
            ),
          );
          BaseEventTool.triggerComponentEvent(
            component,
            SceneTreeEventTool.triggerDragDropChildren(
              firstLayerFirstCubeDomIndex,
              secondLayerFirstCubeDomIndex,
            ),
          );

          BuildComponentTool.buildSceneTree(
            TestTool.buildAppStateSceneGraphFromEngine(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        });
        describe("if drag treeNode into it's second layer chidlren", () => {
          let _triggerDragEnterSecondChildren =
              (parentIndex, firstIndex, secondIndex, domChildren) => {
            let dragTreeArticle = _getFromArray(domChildren, 0);
            let treeNodeUl =
              _getFromArray(dragTreeArticle##children, parentIndex);
            let treeNodeFirstChildrenUl =
              _getFromArray(treeNodeUl##children, firstIndex);
            let treeNodeSecondChildrenUl =
              _getFromArray(treeNodeFirstChildrenUl##children, secondIndex);
            let treeNodeLi =
              _getFromArray(treeNodeSecondChildrenUl##children, 0);
            let div = _getFromArray(treeNodeLi##children, 0);
            BaseEventTool.triggerDragEnterEvent(
              div,
              BaseEventTool.buildDragEvent(),
            );
          };
          let _triggerDragDropSecondChildren =
              (parentIndex, firstIndex, secondIndex, domChildren) => {
            let dragTreeArticle = _getFromArray(domChildren, 0);
            let treeNodeUl =
              _getFromArray(dragTreeArticle##children, parentIndex);
            let treeNodeFirstChildrenUl =
              _getFromArray(treeNodeUl##children, firstIndex);
            let treeNodeSecondChildrenUl =
              _getFromArray(treeNodeFirstChildrenUl##children, secondIndex);
            let treeNodeLi =
              _getFromArray(treeNodeSecondChildrenUl##children, 0);
            let div = _getFromArray(treeNodeLi##children, 0);
            BaseEventTool.triggerDropEvent(
              div,
              BaseEventTool.buildDragEvent(),
            );
          };

          test(
            "if drag treeNode into it's second layer chidlren, keep not change",
            () => {
            SceneTreeTool.buildFourLayerSceneGraphToEngine(sandbox);

            let component =
              BuildComponentTool.buildSceneTree(
                TestTool.buildAppStateSceneGraphFromEngine(),
              );
            let firstLayerFirstCubeDomIndex =
              SceneTreeNodeDomTool.OperateFourLayer.getFirstLayerFirstCubeDomIndex();
            let secondLayerFirstCubeDomIndex =
              SceneTreeNodeDomTool.OperateFourLayer.getSecondLayerFirstCubeDomIndex();
            let thirdLayerFirstCubeDomIndex =
              SceneTreeNodeDomTool.OperateFourLayer.getThirdLayerFirstCubeDomIndex();

            BaseEventTool.triggerComponentEvent(
              component,
              SceneTreeEventTool.triggerDragStart(
                firstLayerFirstCubeDomIndex,
              ),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              _triggerDragEnterSecondChildren(
                firstLayerFirstCubeDomIndex,
                secondLayerFirstCubeDomIndex,
                thirdLayerFirstCubeDomIndex,
              ),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              _triggerDragDropSecondChildren(
                firstLayerFirstCubeDomIndex,
                secondLayerFirstCubeDomIndex,
                thirdLayerFirstCubeDomIndex,
              ),
            );

            BuildComponentTool.buildSceneTree(
              TestTool.buildAppStateSceneGraphFromEngine(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
        });
      });
    });
  });