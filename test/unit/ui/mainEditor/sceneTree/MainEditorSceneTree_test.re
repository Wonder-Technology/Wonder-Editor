open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

type retainedProps = {
  sceneGraph: MainEditorSceneTreeStore.sceneTreeDataType,
  currentGameObject: option(Wonderjs.GameObjectType.gameObject)
};

let _ =
  describe(
    "MainEditorSceneTree ui component",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _getFromArray = (array, index) => OperateArrayUtils.getNth(index, array);
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "get scene tree from engine",
        () => {
          let _buildEngineSceneTree = () =>
            ReactTestRenderer.create(
              <MainEditorSceneTree
                store=(SceneTreeToolUI.buildAppStateSceneGraphFromEngine())
                dispatch=(TestToolUI.getDispatch())
              />
            );
          beforeEach(() => TestToolEditor.closeContractCheck());
          afterEach(() => TestToolEditor.openContractCheck());
          describe(
            "test simple scene graph data which haven't children case",
            () => {
              beforeEach(
                () => {
                  TestToolUI.initMainEditor(sandbox);
                  MainEditorSceneToolEditor.prepareDefaultScene(
                    MainEditorSceneToolEditor.setFirstBoxTobeCurrentGameObject
                  )
                }
              );
              describe(
                "test snapshot",
                () => {
                  test("no drag", () => _buildEngineSceneTree() |> ReactTestTool.createSnapshotAndMatch);
                  test(
                    "drag treeNode into target treeNode",
                    () => {
                      TestToolEditor.openContractCheck();
                      let component = _buildEngineSceneTree();
                      EventToolUI.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragStart(2)
                      );
                      EventToolUI.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragEnter(1)
                      );
                      EventToolUI.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragLeave(1)
                      );
                      EventToolUI.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragOver(1)
                      );
                      EventToolUI.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragDrop(1)
                      );
                      let component2 = _buildEngineSceneTree();
                      component2 |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
                }
              );
              describe(
                "test logic",
                () => {
                  describe(
                    "test should update",
                    () => {
                      test(
                        "if sceneGraph and currentGameObject not change, should not update",
                        () =>
                          MainEditorTransform.shouldUpdate(
                            OldNewSelfToolUI.buildOldNewSelf(
                              {
                                sceneGraph: Some(MainEditorSceneTreeToolEditor.getSimpleSceneTree()),
                                currentGameObject: Some(1)
                              },
                              {
                                sceneGraph: Some(MainEditorSceneTreeToolEditor.getSimpleSceneTree()),
                                currentGameObject: Some(1)
                              }
                            )
                          )
                          |> expect == false
                      );
                      test(
                        "else if sceneGraph change, should update",
                        () =>
                          MainEditorTransform.shouldUpdate(
                            OldNewSelfToolUI.buildOldNewSelf(
                              {
                                sceneGraph: Some(MainEditorSceneTreeToolEditor.getSimpleSceneTree()),
                                currentGameObject: Some(1)
                              },
                              {
                                sceneGraph:
                                  Some(MainEditorSceneTreeToolEditor.getTwoLayerSceneTree()),
                                currentGameObject: Some(1)
                              }
                            )
                          )
                          |> expect == true
                      );
                      test(
                        "else if currentGameObject change, should update",
                        () =>
                          MainEditorTransform.shouldUpdate(
                            OldNewSelfToolUI.buildOldNewSelf(
                              {
                                sceneGraph: Some(MainEditorSceneTreeToolEditor.getSimpleSceneTree()),
                                currentGameObject: Some(1)
                              },
                              {
                                sceneGraph: Some(MainEditorSceneTreeToolEditor.getSimpleSceneTree()),
                                currentGameObject: Some(2)
                              }
                            )
                          )
                          |> expect == true
                      );
                      test(
                        "else, should update",
                        () =>
                          MainEditorTransform.shouldUpdate(
                            OldNewSelfToolUI.buildOldNewSelf(
                              {
                                sceneGraph: Some(MainEditorSceneTreeToolEditor.getSimpleSceneTree()),
                                currentGameObject: Some(1)
                              },
                              {
                                sceneGraph:
                                  Some(MainEditorSceneTreeToolEditor.getThreeLayerSceneTree()),
                                currentGameObject: Some(2)
                              }
                            )
                          )
                          |> expect == true
                      )
                    }
                  );
                  test(
                    "click treeNode to set it to be currentGameObject",
                    () => {
                      let clickTreeNodeIndex = 1;
                      let component = _buildEngineSceneTree();
                      EventToolUI.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerClickEvent(clickTreeNodeIndex)
                      );
                      MainEditorSceneToolEditor.unsafeGetCurrentGameObject()
                      |>
                      expect == (
                                  MainEditorSceneToolEngine.unsafeGetScene()
                                  |> MainEditorSceneToolEngine.getChildren
                                  |> OperateArrayUtils.getNth(clickTreeNodeIndex)
                                )
                    }
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
                  beforeEach(
                    () => {
                      TestToolUI.initMainEditor(sandbox);
                      MainEditorSceneToolEngine.clearSceneChildren();
                      SceneTreeToolUI.buildTwoLayerSceneGraphToEngine()
                    }
                  );
                  describe(
                    "test snapshot",
                    () => {
                      test(
                        "no drag",
                        () => {
                          let component = _buildEngineSceneTree();
                          let (_, engineState) = MainEditorStateView.prepareState();
                          component |> ReactTestTool.createSnapshotAndMatch
                        }
                      );
                      test(
                        "drag treeNode into first layer treeNode parent",
                        () => {
                          let component = _buildEngineSceneTree();
                          EventToolUI.triggerComponentEvent(
                            component,
                            SceneTreeEventTool.triggerDragStart(2)
                          );
                          EventToolUI.triggerComponentEvent(
                            component,
                            SceneTreeEventTool.triggerDragEnter(0)
                          );
                          EventToolUI.triggerComponentEvent(
                            component,
                            SceneTreeEventTool.triggerDragDrop(0)
                          );
                          let component2 = _buildEngineSceneTree();
                          component2 |> ReactTestTool.createSnapshotAndMatch
                        }
                      );
                      test(
                        "drag treeNode into first layer treeNode children",
                        () => {
                          let component = _buildEngineSceneTree();
                          EventToolUI.triggerComponentEvent(
                            component,
                            SceneTreeEventTool.triggerDragStart(2)
                          );
                          EventToolUI.triggerComponentEvent(
                            component,
                            SceneTreeEventTool.triggerDragEnterChildren(0, 1)
                          );
                          EventToolUI.triggerComponentEvent(
                            component,
                            SceneTreeEventTool.triggerDragDropChildren(0, 1)
                          );
                          let component2 = _buildEngineSceneTree();
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
                            EventToolUI.triggerDragStartEvent(
                              treeNodeChildrenUl,
                              EventToolUI.buildDragEvent()
                            )
                          };
                          let _triggerDragEnterDiv = (index, domChildren) => {
                            let dragTreeArticle = _getFromArray(domChildren, 0);
                            let div = _getFromArray(dragTreeArticle##children, index);
                            EventToolUI.triggerDragEnterEvent(div, EventToolUI.buildDragEvent())
                          };
                          let _triggerDragLeaveDiv = (index, domChildren) => {
                            let dragTreeArticle = _getFromArray(domChildren, 0);
                            let div = _getFromArray(dragTreeArticle##children, index);
                            EventToolUI.triggerDragLeaveEvent(div, EventToolUI.buildDragEvent())
                          };
                          let _triggerDragOverDiv = (index, domChildren) => {
                            let dragTreeArticle = _getFromArray(domChildren, 0);
                            let div = _getFromArray(dragTreeArticle##children, index);
                            EventToolUI.triggerDragOverEvent(div, EventToolUI.buildDragEvent())
                          };
                          let _triggerDragDropDiv = (index, domChildren) => {
                            let dragTreeArticle = _getFromArray(domChildren, 0);
                            let div = _getFromArray(dragTreeArticle##children, index);
                            EventToolUI.triggerDropEvent(div, EventToolUI.buildDragEvent())
                          };
                          let component = _buildEngineSceneTree();
                          EventToolUI.triggerComponentEvent(
                            component,
                            _triggerDragStartChildren(0, 1)
                          );
                          EventToolUI.triggerComponentEvent(component, _triggerDragEnterDiv(3));
                          EventToolUI.triggerComponentEvent(component, _triggerDragLeaveDiv(3));
                          EventToolUI.triggerComponentEvent(component, _triggerDragOverDiv(3));
                          EventToolUI.triggerComponentEvent(component, _triggerDragDropDiv(3));
                          let component2 = _buildEngineSceneTree();
                          component2 |> ReactTestTool.createSnapshotAndMatch
                        }
                      )
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
                      TestToolUI.initMainEditor(sandbox);
                      MainEditorSceneToolEngine.clearSceneChildren();
                      SceneTreeToolUI.buildThreeLayerSceneGraphToEngine();
                      let component = _buildEngineSceneTree();
                      EventToolUI.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragStart(0)
                      );
                      EventToolUI.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragEnter(1)
                      );
                      EventToolUI.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragDrop(1)
                      );
                      let component2 = _buildEngineSceneTree();
                      component2 |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
              )
            }
          );
          describe(
            "deal with the specific case",
            () =>
              describe(
                "test snapshot",
                () => {
                  test(
                    "if drag treeNode into itself, keep not change",
                    () => {
                      TestToolUI.initMainEditor(sandbox);
                      let component = _buildEngineSceneTree();
                      EventToolUI.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragStart(1)
                      );
                      EventToolUI.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragEnter(1)
                      );
                      EventToolUI.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragDrop(1)
                      );
                      let component2 = _buildEngineSceneTree();
                      component2 |> ReactTestTool.createSnapshotAndMatch
                    }
                  );
                  test(
                    "if drag treeNode into it's first layer chidlren, keep not change",
                    () => {
                      TestToolUI.initMainEditor(sandbox);
                      MainEditorSceneToolEngine.clearSceneChildren();
                      SceneTreeToolUI.buildTwoLayerSceneGraphToEngine();
                      let component = _buildEngineSceneTree();
                      EventToolUI.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragStart(0)
                      );
                      EventToolUI.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragEnterChildren(0, 1)
                      );
                      EventToolUI.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragDropChildren(0, 1)
                      );
                      let component2 = _buildEngineSceneTree();
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
                        let treeNodeFirstChildrenUl =
                          _getFromArray(treeNodeUl##children, firstIndex);
                        let treeNodeSecondChildrenUl =
                          _getFromArray(treeNodeFirstChildrenUl##children, secondIndex);
                        let treeNodeLi = _getFromArray(treeNodeSecondChildrenUl##children, 0);
                        EventToolUI.triggerDragEnterEvent(treeNodeLi, EventToolUI.buildDragEvent())
                      };
                      let _triggerDragDropSecondChildren =
                          (parentIndex, firstIndex, secondIndex, domChildren) => {
                        let dragTreeArticle = _getFromArray(domChildren, 0);
                        let treeNodeUl = _getFromArray(dragTreeArticle##children, parentIndex);
                        let treeNodeFirstChildrenUl =
                          _getFromArray(treeNodeUl##children, firstIndex);
                        let treeNodeSecondChildrenUl =
                          _getFromArray(treeNodeFirstChildrenUl##children, secondIndex);
                        let treeNodeLi = _getFromArray(treeNodeSecondChildrenUl##children, 0);
                        EventToolUI.triggerDropEvent(treeNodeLi, EventToolUI.buildDragEvent())
                      };
                      TestToolUI.initMainEditor(sandbox);
                      MainEditorSceneToolEngine.clearSceneChildren();
                      SceneTreeToolUI.buildThreeLayerSceneGraphToEngine();
                      let component = _buildEngineSceneTree();
                      EventToolUI.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragStart(0)
                      );
                      EventToolUI.triggerComponentEvent(
                        component,
                        _triggerDragEnterSecondChildren(0, 1, 1)
                      );
                      EventToolUI.triggerComponentEvent(
                        component,
                        _triggerDragDropSecondChildren(0, 1, 1)
                      );
                      let component2 = _buildEngineSceneTree();
                      component2 |> ReactTestTool.createSnapshotAndMatch
                    }
                  );
                  test(
                    "if drag treeNode move to canvas or other component, set css->opacity to 1",
                    () => {
                      let _triggerDragEnd = (treeNodeIndex, domChildren) => {
                        let dragTreeArticle = _getFromArray(domChildren, 0);
                        let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
                        EventToolUI.triggerDragEndEvent(treeNodeUl, EventToolUI.buildDragEvent())
                      };
                      TestToolUI.initMainEditor(sandbox);
                      let component = _buildEngineSceneTree();
                      EventToolUI.triggerComponentEvent(
                        component,
                        SceneTreeEventTool.triggerDragStart(1)
                      );
                      EventToolUI.triggerComponentEvent(component, _triggerDragEnd(1));
                      component |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
                }
              )
          )
        }
      )
    }
  );