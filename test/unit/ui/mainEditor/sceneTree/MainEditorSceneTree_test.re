open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

external toObject : ReactTestRenderer.t => Js.t({..}) = "%identity";

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
      test(
        "create simple sceneTree snap shot",
        () => {
          TestToolUI.initMainEditor(sandbox);
          let component =
            ReactTestRenderer.create(
              <MainEditorSceneTree
                store=(SceneTreeToolUI.buildSimpleSceneTreeAppState())
                dispatch=(TestToolUI.getDispatch())
              />
            );
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      describe(
        "get scene tree from engine",
        () => {
          let _buildTwoLayerSceneTree = () =>
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
            /* WonderCommonlib.DebugUtils.logJson(firstTreeNodeUl); */
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
          test(
            "create snap shot",
            () => {
              TestToolUI.initMainEditor(sandbox);
              let component = _buildTwoLayerSceneTree();
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          test(
            "drag treeNode to treeNode",
            () => {
              TestToolUI.initMainEditor(sandbox);
              let component = _buildTwoLayerSceneTree();
              EventToolUI.triggerComponentEvent(component, _dragStart);
              EventToolUI.triggerComponentEvent(component, _dragEnter);
              EventToolUI.triggerComponentEvent(component, _dragDrop);
              WonderCommonlib.DebugUtils.logJson(
                MainEditorStateView.prepareState() |> MainEditorSceneTreeView.getSceneGraphData
              );
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          )
        }
      )
    }
  );