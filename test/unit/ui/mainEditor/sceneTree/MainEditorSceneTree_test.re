open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "MainEditorSceneTree ui component",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _getFromArray = (array, index) => WonderCommonlib.ArraySystem.unsafeGet(array, index);
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
          let _dragStart = (treeNodeIndex, domChildren) => {
            let dragTreeArticle = _getFromArray(domChildren, 0);
            let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
            EventToolUI.triggerDragStartEvent(treeNodeUl, EventToolUI.buildDragEvent())
          };
          let _dragEnter = (treeNodeIndex, domChildren) => {
            let dragTreeArticle = _getFromArray(domChildren, 0);
            let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
            let treeNodeLi = _getFromArray(treeNodeUl##children, 0);
            EventToolUI.triggerDragEnterEvent(treeNodeLi, EventToolUI.buildDragEvent())
          };
          let _dragLeave = (treeNodeIndex, domChildren) => {
            let dragTreeArticle = _getFromArray(domChildren, 0);
            let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
            let treeNodeLi = _getFromArray(treeNodeUl##children, 0);
            EventToolUI.triggerDragLeaveEvent(treeNodeLi, EventToolUI.buildDragEvent())
          };
          let _dragOver = (treeNodeIndex, domChildren) => {
            let dragTreeArticle = _getFromArray(domChildren, 0);
            let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
            let treeNodeLi = _getFromArray(treeNodeUl##children, 0);
            EventToolUI.triggerDragOverEvent(treeNodeLi, EventToolUI.buildDragEvent())
          };
          let _dragDrop = (treeNodeIndex, domChildren) => {
            let dragTreeArticle = _getFromArray(domChildren, 0);
            let threeTreeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
            let treeNodeLi = _getFromArray(threeTreeNodeUl##children, 0);
            EventToolUI.triggerDropEvent(treeNodeLi, EventToolUI.buildDragEvent())
          };
          let _dragEnterChildren = (parentIndex, childrenIndex, domChildren) => {
            let dragTreeArticle = _getFromArray(domChildren, 0);
            let treeNodeUl = _getFromArray(dragTreeArticle##children, parentIndex);
            let treeNodeChildrenUl = _getFromArray(treeNodeUl##children, childrenIndex);
            let treeNodeLi = _getFromArray(treeNodeChildrenUl##children, 0);
            EventToolUI.triggerDragEnterEvent(treeNodeLi, EventToolUI.buildDragEvent())
          };
          let _dragDropChildren = (parentIndex, childrenIndex, domChildren) => {
            let dragTreeArticle = _getFromArray(domChildren, 0);
            let treeNodeUl = _getFromArray(dragTreeArticle##children, parentIndex);
            let treeNodeChildrenUl = _getFromArray(treeNodeUl##children, childrenIndex);
            let treeNodeLi = _getFromArray(treeNodeChildrenUl##children, 0);
            EventToolUI.triggerDropEvent(treeNodeLi, EventToolUI.buildDragEvent())
          };
          describe(
            "simple scene graph data, haven't children case",
            () => {
              test(
                "create snap shot",
                () => {
                  TestToolUI.initMainEditor(sandbox);
                  let component = _buildEngineSceneTree();
                  let json = ReactTestRenderer.toJSON(component);
                  toMatchSnapshot(expect(json))
                }
              );
              test(
                "drag treeNode add into treeNode and trigger dragLeave and dragOver event",
                () => {
                  TestToolUI.initMainEditor(sandbox);
                  let component = _buildEngineSceneTree();
                  EventToolUI.triggerComponentEvent(component, _dragStart(2));
                  EventToolUI.triggerComponentEvent(component, _dragEnter(1));
                  EventToolUI.triggerComponentEvent(component, _dragLeave(1));
                  EventToolUI.triggerComponentEvent(component, _dragOver(1));
                  EventToolUI.triggerComponentEvent(component, _dragDrop(1));
                  let component2 = _buildEngineSceneTree();
                  let json = ReactTestRenderer.toJSON(component2);
                  toMatchSnapshot(expect(json))
                }
              )
            }
          );
          describe(
            "has children case",
            () =>
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
                  test(
                    "create snap shot",
                    () => {
                      let component = _buildEngineSceneTree();
                      let (_, engineState) = MainEditorStateView.prepareState();
                      let json = ReactTestRenderer.toJSON(component);
                      toMatchSnapshot(expect(json))
                    }
                  );
                  test(
                    "drag treeNode add into first layer treeNode parent",
                    () => {
                      let component = _buildEngineSceneTree();
                      EventToolUI.triggerComponentEvent(component, _dragStart(2));
                      EventToolUI.triggerComponentEvent(component, _dragEnter(0));
                      EventToolUI.triggerComponentEvent(component, _dragDrop(0));
                      let component2 = _buildEngineSceneTree();
                      let json = ReactTestRenderer.toJSON(component2);
                      toMatchSnapshot(expect(json))
                    }
                  );
                  test(
                    "drag treeNode add into first layer treeNode children",
                    () => {
                      let component = _buildEngineSceneTree();
                      EventToolUI.triggerComponentEvent(component, _dragStart(2));
                      EventToolUI.triggerComponentEvent(component, _dragEnterChildren(0, 1));
                      EventToolUI.triggerComponentEvent(component, _dragDropChildren(0, 1));
                      let component2 = _buildEngineSceneTree();
                      let json = ReactTestRenderer.toJSON(component2);
                      toMatchSnapshot(expect(json))
                    }
                  );
                  test(
                    "drag treeNode add into root div",
                    () => {
                      let _dragStartChildren = (parentIndex, childrenIndex, domChildren) => {
                        let dragTreeArticle = _getFromArray(domChildren, 0);
                        let treeNodeUl = _getFromArray(dragTreeArticle##children, parentIndex);
                        let treeNodeChildrenUl =
                          _getFromArray(treeNodeUl##children, childrenIndex);
                        EventToolUI.triggerDragStartEvent(
                          treeNodeChildrenUl,
                          EventToolUI.buildDragEvent()
                        )
                      };
                      let _dragEnterDiv = (index, domChildren) => {
                        let dragTreeArticle = _getFromArray(domChildren, 0);
                        let div = _getFromArray(dragTreeArticle##children, index);
                        EventToolUI.triggerDragEnterEvent(div, EventToolUI.buildDragEvent())
                      };
                      let _dragLeaveDiv = (index, domChildren) => {
                        let dragTreeArticle = _getFromArray(domChildren, 0);
                        let div = _getFromArray(dragTreeArticle##children, index);
                        EventToolUI.triggerDragLeaveEvent(div, EventToolUI.buildDragEvent())
                      };
                      let _dragOverDiv = (index, domChildren) => {
                        let dragTreeArticle = _getFromArray(domChildren, 0);
                        let div = _getFromArray(dragTreeArticle##children, index);
                        EventToolUI.triggerDragOverEvent(div, EventToolUI.buildDragEvent())
                      };
                      let _dragDropDiv = (index, domChildren) => {
                        let dragTreeArticle = _getFromArray(domChildren, 0);
                        let div = _getFromArray(dragTreeArticle##children, index);
                        EventToolUI.triggerDropEvent(div, EventToolUI.buildDragEvent())
                      };
                      let component = _buildEngineSceneTree();
                      EventToolUI.triggerComponentEvent(component, _dragStartChildren(0, 1));
                      EventToolUI.triggerComponentEvent(component, _dragEnterDiv(3));
                      EventToolUI.triggerComponentEvent(component, _dragLeaveDiv(3));
                      EventToolUI.triggerComponentEvent(component, _dragOverDiv(3));
                      EventToolUI.triggerComponentEvent(component, _dragDropDiv(3));
                      let component2 = _buildEngineSceneTree();
                      let json = ReactTestRenderer.toJSON(component2);
                      toMatchSnapshot(expect(json))
                    }
                  )
                }
              )
          );
          describe(
            "deal with the specific case",
            () => {
              test(
                "if drag treeNode add into itself, the objects associate is error",
                () => {
                  TestToolUI.initMainEditor(sandbox);
                  let component = _buildEngineSceneTree();
                  EventToolUI.triggerComponentEvent(component, _dragStart(1));
                  EventToolUI.triggerComponentEvent(component, _dragEnter(1));
                  EventToolUI.triggerComponentEvent(component, _dragDrop(1));
                  let component2 = _buildEngineSceneTree();
                  let json = ReactTestRenderer.toJSON(component2);
                  toMatchSnapshot(expect(json))
                }
              );
              test(
                "if drag treeNode add into it's chidlren, the objects associate is error",
                () => {
                  TestToolUI.initMainEditor(sandbox);
                  MainEditorSceneToolEngine.clearSceneChildren();
                  SceneTreeToolUI.buildTwoLayerSceneGraphToEngine();
                  let component = _buildEngineSceneTree();
                  EventToolUI.triggerComponentEvent(component, _dragStart(0));
                  EventToolUI.triggerComponentEvent(component, _dragEnterChildren(0, 1));
                  EventToolUI.triggerComponentEvent(component, _dragDropChildren(0, 1));
                  let component2 = _buildEngineSceneTree();
                  let json = ReactTestRenderer.toJSON(component2);
                  toMatchSnapshot(expect(json))
                }
              )
            }
          )
        }
      )
    }
  );