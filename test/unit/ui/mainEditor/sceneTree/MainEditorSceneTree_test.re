open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "MainEditorSceneTree ui component",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _getFromArray = (array, index) => array[index];
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
          let _triggerDragStart = (treeNodeIndex, domChildren) => {
            let dragTreeArticle = _getFromArray(domChildren, 0);
            let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
            EventToolUI.triggerDragStartEvent(treeNodeUl, EventToolUI.buildDragEvent())
          };
          let _triggerDragEnter = (treeNodeIndex, domChildren) => {
            let dragTreeArticle = _getFromArray(domChildren, 0);
            let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
            let treeNodeLi = _getFromArray(treeNodeUl##children, 0);
            EventToolUI.triggerDragEnterEvent(treeNodeLi, EventToolUI.buildDragEvent())
          };
          let _triggerDragLeave = (treeNodeIndex, domChildren) => {
            let dragTreeArticle = _getFromArray(domChildren, 0);
            let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
            let treeNodeLi = _getFromArray(treeNodeUl##children, 0);
            EventToolUI.triggerDragLeaveEvent(treeNodeLi, EventToolUI.buildDragEvent())
          };
          let _triggerDragOver = (treeNodeIndex, domChildren) => {
            let dragTreeArticle = _getFromArray(domChildren, 0);
            let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
            let treeNodeLi = _getFromArray(treeNodeUl##children, 0);
            EventToolUI.triggerDragOverEvent(treeNodeLi, EventToolUI.buildDragEvent())
          };
          let _triggerDragDrop = (treeNodeIndex, domChildren) => {
            let dragTreeArticle = _getFromArray(domChildren, 0);
            let threeTreeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
            let treeNodeLi = _getFromArray(threeTreeNodeUl##children, 0);
            EventToolUI.triggerDropEvent(treeNodeLi, EventToolUI.buildDragEvent())
          };
          let _triggerDragEnterChildren = (parentIndex, childrenIndex, domChildren) => {
            let dragTreeArticle = _getFromArray(domChildren, 0);
            let treeNodeUl = _getFromArray(dragTreeArticle##children, parentIndex);
            let treeNodeChildrenUl = _getFromArray(treeNodeUl##children, childrenIndex);
            let treeNodeLi = _getFromArray(treeNodeChildrenUl##children, 0);
            EventToolUI.triggerDragEnterEvent(treeNodeLi, EventToolUI.buildDragEvent())
          };
          let _triggerDragDropChildren = (parentIndex, childrenIndex, domChildren) => {
            let dragTreeArticle = _getFromArray(domChildren, 0);
            let treeNodeUl = _getFromArray(dragTreeArticle##children, parentIndex);
            let treeNodeChildrenUl = _getFromArray(treeNodeUl##children, childrenIndex);
            let treeNodeLi = _getFromArray(treeNodeChildrenUl##children, 0);
            EventToolUI.triggerDropEvent(treeNodeLi, EventToolUI.buildDragEvent())
          };
          describe(
            "test simple scene graph data which haven't children case",
            () => {
              describe(
                "test snapshot",
                () => {
                  test(
                    "no drag",
                    () => {
                      TestToolUI.initMainEditor(sandbox);
                      let component = _buildEngineSceneTree();
                      let json = ReactTestRenderer.toJSON(component);
                      toMatchSnapshot(expect(json))
                    }
                  );
                  test(
                    "drag treeNode into target treeNode",
                    () => {
                      TestToolUI.initMainEditor(sandbox);
                      let component = _buildEngineSceneTree();
                      EventToolUI.triggerComponentEvent(component, _triggerDragStart(2));
                      EventToolUI.triggerComponentEvent(component, _triggerDragEnter(1));
                      EventToolUI.triggerComponentEvent(component, _triggerDragLeave(1));
                      EventToolUI.triggerComponentEvent(component, _triggerDragOver(1));
                      EventToolUI.triggerComponentEvent(component, _triggerDragDrop(1));
                      let component2 = _buildEngineSceneTree();
                      let json = ReactTestRenderer.toJSON(component2);
                      toMatchSnapshot(expect(json))
                    }
                  )
                }
              );
              describe(
                "test logic",
                () =>
                  test(
                    "click treeNode to set it to be currentGameObject",
                    () => {
                      let clickTreeNodeIndex = 0;
                      let _triggerClickEvent = (treeNodeIndex, domChildren) => {
                        let dragTreeArticle = _getFromArray(domChildren, 0);
                        let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
                        let treeNodeLi = _getFromArray(treeNodeUl##children, 0);
                        EventToolUI.triggerClickEvent(treeNodeLi)
                      };
                      TestToolUI.initMainEditor(sandbox);
                      let component = _buildEngineSceneTree();
                      EventToolUI.triggerComponentEvent(
                        component,
                        _triggerClickEvent(clickTreeNodeIndex)
                      );
                      MainEditorInspectorToolEditor.getCurrentGameObject()
                      |> Js.Option.getExn
                      |>
                      expect == (
                                  MainEditorSceneToolEngine.getScene()
                                  |> MainEditorSceneToolEngine.getChildren
                                  |> OperateArrayUtils.getNth(clickTreeNodeIndex)
                                )
                    }
                  )
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
                          let json = ReactTestRenderer.toJSON(component);
                          toMatchSnapshot(expect(json))
                        }
                      );
                      test(
                        "drag treeNode into first layer treeNode parent",
                        () => {
                          let component = _buildEngineSceneTree();
                          EventToolUI.triggerComponentEvent(component, _triggerDragStart(2));
                          EventToolUI.triggerComponentEvent(component, _triggerDragEnter(0));
                          EventToolUI.triggerComponentEvent(component, _triggerDragDrop(0));
                          let component2 = _buildEngineSceneTree();
                          let json = ReactTestRenderer.toJSON(component2);
                          toMatchSnapshot(expect(json))
                        }
                      );
                      test(
                        "drag treeNode into first layer treeNode children",
                        () => {
                          let component = _buildEngineSceneTree();
                          EventToolUI.triggerComponentEvent(component, _triggerDragStart(2));
                          EventToolUI.triggerComponentEvent(
                            component,
                            _triggerDragEnterChildren(0, 1)
                          );
                          EventToolUI.triggerComponentEvent(
                            component,
                            _triggerDragDropChildren(0, 1)
                          );
                          let component2 = _buildEngineSceneTree();
                          let json = ReactTestRenderer.toJSON(component2);
                          toMatchSnapshot(expect(json))
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
                          let json = ReactTestRenderer.toJSON(component2);
                          toMatchSnapshot(expect(json))
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
                      EventToolUI.triggerComponentEvent(component, _triggerDragStart(0));
                      EventToolUI.triggerComponentEvent(component, _triggerDragEnter(1));
                      EventToolUI.triggerComponentEvent(component, _triggerDragDrop(1));
                      let component2 = _buildEngineSceneTree();
                      let json = ReactTestRenderer.toJSON(component2);
                      toMatchSnapshot(expect(json))
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
                      EventToolUI.triggerComponentEvent(component, _triggerDragStart(1));
                      EventToolUI.triggerComponentEvent(component, _triggerDragEnter(1));
                      EventToolUI.triggerComponentEvent(component, _triggerDragDrop(1));
                      let component2 = _buildEngineSceneTree();
                      let json = ReactTestRenderer.toJSON(component2);
                      toMatchSnapshot(expect(json))
                    }
                  );
                  test(
                    "if drag treeNode into it's first layer chidlren, keep not change",
                    () => {
                      TestToolUI.initMainEditor(sandbox);
                      MainEditorSceneToolEngine.clearSceneChildren();
                      SceneTreeToolUI.buildTwoLayerSceneGraphToEngine();
                      let component = _buildEngineSceneTree();
                      EventToolUI.triggerComponentEvent(component, _triggerDragStart(0));
                      EventToolUI.triggerComponentEvent(
                        component,
                        _triggerDragEnterChildren(0, 1)
                      );
                      EventToolUI.triggerComponentEvent(component, _triggerDragDropChildren(0, 1));
                      let component2 = _buildEngineSceneTree();
                      let json = ReactTestRenderer.toJSON(component2);
                      toMatchSnapshot(expect(json))
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
                      EventToolUI.triggerComponentEvent(component, _triggerDragStart(0));
                      EventToolUI.triggerComponentEvent(
                        component,
                        _triggerDragEnterSecondChildren(0, 1, 1)
                      );
                      EventToolUI.triggerComponentEvent(
                        component,
                        _triggerDragDropSecondChildren(0, 1, 1)
                      );
                      let component2 = _buildEngineSceneTree();
                      let json = ReactTestRenderer.toJSON(component2);
                      toMatchSnapshot(expect(json))
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
                      EventToolUI.triggerComponentEvent(component, _triggerDragStart(1));
                      EventToolUI.triggerComponentEvent(component, _triggerDragEnd(1));
                      let json = ReactTestRenderer.toJSON(component);
                      toMatchSnapshot(expect(json))
                    }
                  )
                }
              )
          )
        }
      )
    }
  );