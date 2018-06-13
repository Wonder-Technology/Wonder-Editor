open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

type retainedProps = {
  sceneGraph: MainEditorSceneTreeStore.sceneTreeDataType,
  currentSceneTreeNode: option(Wonderjs.GameObjectType.gameObject)
};

let _ =
  describe(
    "MainEditorSceneTree",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _getFromArray = (array, index) => ArrayService.getNth(index, array);
      beforeEach(
        () => {
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "get sceneTree from engine",
        () => {
          beforeEach(() => TestTool.closeContractCheck());
          afterEach(() => TestTool.openContractCheck());
          describe(
            "test simple scene graph data which haven't children case",
            () => {
              beforeEach(
                () =>
                  MainEditorSceneTool.createDefaultScene(
                    sandbox,
                    MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode
                  )
              );
              afterEach(() => GameObjectTool.clearCurrentSceneTreeNode());
              test(
                "no drag",
                () =>
                  BuildComponentTool.buildSceneTree(
                    SceneTreeTool.buildAppStateSceneGraphFromEngine()
                  )
                  |> ReactTestTool.createSnapshotAndMatch
              );
              test(
                "drag treeNode into target treeNode",
                () => {
                  TestTool.openContractCheck();
                  let component =
                    BuildComponentTool.buildSceneTree(
                      SceneTreeTool.buildAppStateSceneGraphFromEngine()
                    );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    SceneTreeEventTool.triggerDragStart(2)
                  );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    SceneTreeEventTool.triggerDragEnter(1)
                  );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    SceneTreeEventTool.triggerDragLeave(1)
                  );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    SceneTreeEventTool.triggerDragOver(1)
                  );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    SceneTreeEventTool.triggerDragDrop(1)
                  );
                  let component2 =
                    BuildComponentTool.buildSceneTree(
                      SceneTreeTool.buildAppStateSceneGraphFromEngine()
                    );
                  component2 |> ReactTestTool.createSnapshotAndMatch
                }
              )
            }
          );
          describe(
            "test should update",
            () => {
              test(
                "if sceneGraph and currentSceneTreeNode not change, should not update",
                () =>
                  MainEditorTransform.shouldUpdate(
                    OldNewSelfTool.buildOldNewSelf(
                      {
                        sceneGraph: Some(MainEditorSceneTreeTool.getSimpleSceneTree()),
                        currentSceneTreeNode: Some(1)
                      },
                      {
                        sceneGraph: Some(MainEditorSceneTreeTool.getSimpleSceneTree()),
                        currentSceneTreeNode: Some(1)
                      }
                    )
                  )
                  |> expect == false
              );
              test(
                "else if sceneGraph change, should update",
                () =>
                  MainEditorTransform.shouldUpdate(
                    OldNewSelfTool.buildOldNewSelf(
                      {
                        sceneGraph: Some(MainEditorSceneTreeTool.getSimpleSceneTree()),
                        currentSceneTreeNode: Some(1)
                      },
                      {
                        sceneGraph: Some(MainEditorSceneTreeTool.getTwoLayerSceneTree()),
                        currentSceneTreeNode: Some(1)
                      }
                    )
                  )
                  |> expect == true
              );
              test(
                "else if currentSceneTreeNode change, should update",
                () =>
                  MainEditorTransform.shouldUpdate(
                    OldNewSelfTool.buildOldNewSelf(
                      {
                        sceneGraph: Some(MainEditorSceneTreeTool.getSimpleSceneTree()),
                        currentSceneTreeNode: Some(1)
                      },
                      {
                        sceneGraph: Some(MainEditorSceneTreeTool.getSimpleSceneTree()),
                        currentSceneTreeNode: Some(2)
                      }
                    )
                  )
                  |> expect == true
              );
              test(
                "else, should update",
                () =>
                  MainEditorTransform.shouldUpdate(
                    OldNewSelfTool.buildOldNewSelf(
                      {
                        sceneGraph: Some(MainEditorSceneTreeTool.getSimpleSceneTree()),
                        currentSceneTreeNode: Some(1)
                      },
                      {
                        sceneGraph: Some(MainEditorSceneTreeTool.getThreeLayerSceneTree()),
                        currentSceneTreeNode: Some(2)
                      }
                    )
                  )
                  |> expect == true
              )
            }
          );
          describe(
            "set current gameObject",
            () => {
              beforeEach(() => MainEditorSceneTool.createDefaultScene(sandbox, () => ()));
              test(
                "click treeNode to set it to be currentSceneTreeNode",
                () => {
                  let clickTreeNodeIndex = 1;
                  let component =
                    BuildComponentTool.buildSceneTree(
                      SceneTreeTool.buildAppStateSceneGraphFromEngine()
                    );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    SceneTreeEventTool.triggerClickEvent(clickTreeNodeIndex)
                  );
                  GameObjectTool.unsafeGetCurrentSceneTreeNode()
                  |>
                  expect == (
                              MainEditorSceneTool.unsafeGetScene()
                              |> GameObjectTool.getChildren
                              |> ArrayService.getNth(clickTreeNodeIndex)
                            )
                }
              )
            }
          );
          describe(
            "test has children case",
            () => {
              describe(
                "have first layer children",
                () => {
                  beforeEach(() => SceneTreeTool.buildTwoLayerSceneGraphToEngine());
                  test(
                    "no drag",
                    () => {
                      let component =
                        BuildComponentTool.buildSceneTree(
                          SceneTreeTool.buildAppStateSceneGraphFromEngine()
                        );
                      component |> ReactTestTool.createSnapshotAndMatch
                    }
                  );
                  test(
                    "drag treeNode into first layer treeNode parent",
                    () => {
                      let component =
                        BuildComponentTool.buildSceneTree(
                          SceneTreeTool.buildAppStateSceneGraphFromEngine()
                        );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragStart(2)
                      );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragEnter(0)
                      );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragDrop(0)
                      );
                      let component2 =
                        BuildComponentTool.buildSceneTree(
                          SceneTreeTool.buildAppStateSceneGraphFromEngine()
                        );
                      component2 |> ReactTestTool.createSnapshotAndMatch
                    }
                  );
                  test(
                    "drag treeNode into first layer treeNode children",
                    () => {
                      let component =
                        BuildComponentTool.buildSceneTree(
                          SceneTreeTool.buildAppStateSceneGraphFromEngine()
                        );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragStart(2)
                      );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragEnterChildren(0, 1)
                      );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragDropChildren(0, 1)
                      );
                      let component2 =
                        BuildComponentTool.buildSceneTree(
                          SceneTreeTool.buildAppStateSceneGraphFromEngine()
                        );
                      component2 |> ReactTestTool.createSnapshotAndMatch
                    }
                  );
                  test(
                    "drag first layer child treeNode into root div",
                    () => {
                      let _triggerDragStartChildren = (parentIndex, childrenIndex, domChildren) => {
                        let dragTreeArticle = _getFromArray(domChildren, 0);
                        let treeNodeUl = _getFromArray(dragTreeArticle##children, parentIndex);
                        let treeNodeChildrenUl =
                          _getFromArray(treeNodeUl##children, childrenIndex);
                        BaseEventTool.triggerDragStartEvent(
                          treeNodeChildrenUl,
                          BaseEventTool.buildDragEvent()
                        )
                      };
                      let _triggerDragOverDiv = (index, domChildren) => {
                        let dragTreeArticle = _getFromArray(domChildren, 0);
                        let div = _getFromArray(dragTreeArticle##children, index);
                        BaseEventTool.triggerDragOverEvent(div, BaseEventTool.buildDragEvent())
                      };
                      let component =
                        BuildComponentTool.buildSceneTree(
                          SceneTreeTool.buildAppStateSceneGraphFromEngine()
                        );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        _triggerDragStartChildren(0, 1)
                      );
                      BaseEventTool.triggerComponentEvent(component,    SceneTreeEventTool.triggerDragEnterDiv(3));
                      BaseEventTool.triggerComponentEvent(component, SceneTreeEventTool.triggerDragLeaveDiv(3));
                      BaseEventTool.triggerComponentEvent(component, _triggerDragOverDiv(3));
                      BaseEventTool.triggerComponentEvent(component, SceneTreeEventTool.triggerDragDropDiv(3));
                      let component2 =
                        BuildComponentTool.buildSceneTree(
                          SceneTreeTool.buildAppStateSceneGraphFromEngine()
                        );
                      component2 |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
                }
              );
              describe(
                "have second layer children",
                () =>
                  test(
                    "drag has second treeNode into no child treNode",
                    () => {
                      SceneTreeTool.buildThreeLayerSceneGraphToEngine();
                      let component =
                        BuildComponentTool.buildSceneTree(
                          SceneTreeTool.buildAppStateSceneGraphFromEngine()
                        );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragStart(0)
                      );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragEnter(1)
                      );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragDrop(1)
                      );
                      let component2 =
                        BuildComponentTool.buildSceneTree(
                          SceneTreeTool.buildAppStateSceneGraphFromEngine()
                        );
                      component2 |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
              )
            }
          );
          describe(
            "deal with the specific case",
            () => {
              test(
                "if drag treeNode into itself, keep not change",
                () => {
                  MainEditorSceneTool.createDefaultScene(
                    sandbox,
                    MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode
                  );
                  let component =
                    BuildComponentTool.buildSceneTree(
                      SceneTreeTool.buildAppStateSceneGraphFromEngine()
                    );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    SceneTreeEventTool.triggerDragStart(1)
                  );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    SceneTreeEventTool.triggerDragEnter(1)
                  );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    SceneTreeEventTool.triggerDragDrop(1)
                  );
                  let component2 =
                    BuildComponentTool.buildSceneTree(
                      SceneTreeTool.buildAppStateSceneGraphFromEngine()
                    );
                  component2 |> ReactTestTool.createSnapshotAndMatch
                }
              );
              test(
                "if drag treeNode into it's first layer chidlren, keep not change",
                () => {
                  SceneTreeTool.buildTwoLayerSceneGraphToEngine();
                  let component =
                    BuildComponentTool.buildSceneTree(
                      SceneTreeTool.buildAppStateSceneGraphFromEngine()
                    );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    SceneTreeEventTool.triggerDragStart(0)
                  );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    SceneTreeEventTool.triggerDragEnterChildren(0, 1)
                  );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    SceneTreeEventTool.triggerDragDropChildren(0, 1)
                  );
                  let component2 =
                    BuildComponentTool.buildSceneTree(
                      SceneTreeTool.buildAppStateSceneGraphFromEngine()
                    );
                  component2 |> ReactTestTool.createSnapshotAndMatch
                }
              );
              test(
                "if drag treeNode into it's second layer chidlren, keep not change",
                () => {
                  let _triggerDragEnterSecondChildren =
                      (parentIndex, firstIndex, secondIndex, domChildren) => {
                    let dragTreeArticle = _getFromArray(domChildren, 0);
                    let treeNodeUl = _getFromArray(dragTreeArticle##children, parentIndex);
                    let treeNodeFirstChildrenUl = _getFromArray(treeNodeUl##children, firstIndex);
                    let treeNodeSecondChildrenUl =
                      _getFromArray(treeNodeFirstChildrenUl##children, secondIndex);
                    let treeNodeLi = _getFromArray(treeNodeSecondChildrenUl##children, 0);
                    let div = _getFromArray(treeNodeLi##children, 0);
                    BaseEventTool.triggerDragEnterEvent(div, BaseEventTool.buildDragEvent())
                  };
                  let _triggerDragDropSecondChildren =
                      (parentIndex, firstIndex, secondIndex, domChildren) => {
                    let dragTreeArticle = _getFromArray(domChildren, 0);
                    let treeNodeUl = _getFromArray(dragTreeArticle##children, parentIndex);
                    let treeNodeFirstChildrenUl = _getFromArray(treeNodeUl##children, firstIndex);
                    let treeNodeSecondChildrenUl =
                      _getFromArray(treeNodeFirstChildrenUl##children, secondIndex);
                    let treeNodeLi = _getFromArray(treeNodeSecondChildrenUl##children, 0);
                    let div = _getFromArray(treeNodeLi##children, 0);
                    BaseEventTool.triggerDropEvent(div, BaseEventTool.buildDragEvent())
                  };
                  SceneTreeTool.buildThreeLayerSceneGraphToEngine();
                  let component =
                    BuildComponentTool.buildSceneTree(
                      SceneTreeTool.buildAppStateSceneGraphFromEngine()
                    );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    SceneTreeEventTool.triggerDragStart(0)
                  );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    _triggerDragEnterSecondChildren(0, 1, 1)
                  );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    _triggerDragDropSecondChildren(0, 1, 1)
                  );
                  let component2 =
                    BuildComponentTool.buildSceneTree(
                      SceneTreeTool.buildAppStateSceneGraphFromEngine()
                    );
                  component2 |> ReactTestTool.createSnapshotAndMatch
                }
              );
              test(
                "if drag treeNode move to canvas or other component, set css->opacity to 1",
                () => {
                  let _triggerDragEnd = (treeNodeIndex, domChildren) => {
                    let dragTreeArticle = _getFromArray(domChildren, 0);
                    let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
                    BaseEventTool.triggerDragEndEvent(treeNodeUl, BaseEventTool.buildDragEvent())
                  };
                  MainEditorSceneTool.createDefaultScene(
                    sandbox,
                    MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode
                  );
                  let component =
                    BuildComponentTool.buildSceneTree(
                      SceneTreeTool.buildAppStateSceneGraphFromEngine()
                    );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    SceneTreeEventTool.triggerDragStart(1)
                  );
                  BaseEventTool.triggerComponentEvent(component, _triggerDragEnd(1));
                  component |> ReactTestTool.createSnapshotAndMatch
                }
              )
            }
          )
        }
      )
    }
  );