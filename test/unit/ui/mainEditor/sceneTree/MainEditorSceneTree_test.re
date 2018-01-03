open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "MainEditorSceneTree ui component",
    () => {
      let sandbox = getSandboxDefaultVal();
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
          let _dragStart = (domChildren) => {
            let dragTreeArticle = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 0);
            let firstTreeNodeUl =
              WonderCommonlib.ArraySystem.unsafeGet(dragTreeArticle##children, 2);
            EventToolUI.triggerDragStartEvent(firstTreeNodeUl, EventToolUI.buildDragEvent())
          };
          let _dragEnter = (domChildren) => {
            let dragTreeArticle = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 0);
            let threeTreeNodeUl =
              WonderCommonlib.ArraySystem.unsafeGet(dragTreeArticle##children, 1);
            let threeTreeNodeLi =
              WonderCommonlib.ArraySystem.unsafeGet(threeTreeNodeUl##children, 0);
            EventToolUI.triggerDragEnterEvent(threeTreeNodeLi, EventToolUI.buildDragEvent())
          };
          let _dragDrop = (domChildren) => {
            let dragTreeArticle = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 0);
            let threeTreeNodeUl =
              WonderCommonlib.ArraySystem.unsafeGet(dragTreeArticle##children, 1);
            let threeTreeNodeLi =
              WonderCommonlib.ArraySystem.unsafeGet(threeTreeNodeUl##children, 0);
            EventToolUI.triggerDropEvent(threeTreeNodeLi, EventToolUI.buildDragEvent())
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
                "drag treeNode and set engine parent",
                () => {
                  TestToolUI.initMainEditor(sandbox);
                  let component = _buildEngineSceneTree();
                  EventToolUI.triggerComponentEvent(component, _dragStart);
                  EventToolUI.triggerComponentEvent(component, _dragEnter);
                  EventToolUI.triggerComponentEvent(component, _dragDrop);
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
                () =>
                  /* beforeEach(
                       () => {
                       }
                     ); */
                  test
                    (
                      "create snap shot",
                      () => {
                        TestToolUI.initMainEditor(sandbox);
                        MainEditorSceneToolEngine.clearSceneChildren();
                        SceneTreeToolUI.buildTwoLayerSceneGraphToEngine();
                        let component = _buildEngineSceneTree();
                        Js.log("start show");
                        let (_, engineState) = MainEditorStateView.prepareState();
                        WonderCommonlib.DebugUtils.logJson(
                          engineState
                          |> MainEditorGameObjectOper.getChildren(
                               MainEditorSceneToolEngine.getScene()
                             )
                        );
                        /* MainEditorStateView.prepareState()
                           |> MainEditorSceneTreeView.getSceneGraphData */
                        let json = ReactTestRenderer.toJSON(component);
                        toMatchSnapshot(expect(json))
                      }
                    )
                    /* test(
                         "add into first layer parent",
                         () => {
                           let component = _buildEngineSceneTree();
                           EventToolUI.triggerComponentEvent(component, _dragStart);
                           EventToolUI.triggerComponentEvent(component, _dragEnter);
                           EventToolUI.triggerComponentEvent(component, _dragDrop);
                           WonderCommonlib.DebugUtils.logJson(
                             MainEditorStateView.prepareState()
                             |> MainEditorSceneTreeView.getSceneGraphData
                           );
                           let component2 = _buildEngineSceneTree();
                           let json = ReactTestRenderer.toJSON(component2);
                           toMatchSnapshot(expect(json))
                         }
                       ) */
              )
          )
        }
      )
    }
  );