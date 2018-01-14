open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "editor: mainEditor mainView",
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
        "fixbug",
        () =>
          test(
            "the main loop shouldn't change editorState",
            () => {
              let _buildEngineSceneTree = () =>
                ReactTestRenderer.create(
                  <MainEditorSceneTree
                    store=(SceneTreeToolUI.buildAppStateSceneGraphFromEngine())
                    dispatch=(TestToolUI.getDispatch())
                  />
                );
              let _triggerClickEvent = (treeNodeIndex, domChildren) => {
                let dragTreeArticle = _getFromArray(domChildren, 0);
                let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
                let treeNodeLi = _getFromArray(treeNodeUl##children, 0);
                EventToolUI.triggerClickEvent(treeNodeLi)
              };
              /* TODO use setCurrentGameObject  */
              TestToolUI.initMainEditor(sandbox);
              let clickTreeNodeIndex = 0;
              let component = _buildEngineSceneTree();
              EventToolUI.triggerComponentEvent(component, _triggerClickEvent(clickTreeNodeIndex));
              let (editorState, engineState) = MainEditorStateView.prepareState();
              MainEditorMainView.loopSetState(20.0, engineState);
              let (newEditorState, newEngineState) = MainEditorStateView.prepareState();
              expect(editorState) == newEditorState
            }
          )
      )
    }
  );