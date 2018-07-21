open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: basicMaterial color", () => {
    let sandbox = getSandboxDefaultVal();

    let _getFromArray = (array, index) => ArrayService.getNth(index, array);

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test simulate set currentSceneTreeNode", () => {
      let _changeColorAndPushUndoStack = (component, materialComponent, color) => {
        BaseEventTool.triggerComponentEvent(
          component,
          MaterialEventTool.triggerShowColorPickEvent,
        );

        MaterialEventTool.triggerChangeBasicColor(materialComponent, color);

        BaseEventTool.triggerComponentEvent(
          component,
          MaterialEventTool.triggerCloseColorPickEvent,
        );
      };

      let _simulateTwiceChangeColor = () => {
        let canvasDom = ColorPickTool.buildFakeCanvas("a", sandbox);

        let createElementStub = ColorPickTool.documentToJsObj(
                                  ColorPickTool.document,
                                )##createElement;

        createElementStub
        |> withOneArg("canvas")
        |> returns(canvasDom)
        |> ignore;
        let currentGameObjectMaterial =
          GameObjectTool.getCurrentGameObjectBasicMaterial();

        let component =
          BuildComponentTool.buildBasicMaterial(
            currentGameObjectMaterial,
          );
        let color1 = {
          "hex": "#7df1e8",
          "rgb": {
            "r": 125,
            "g": 241,
            "b": 232,
          },
        };
        let color2 = {
          "hex": "#1918e8",
          "rgb": {
            "r": 25,
            "g": 24,
            "b": 232,
          },
        };

        _changeColorAndPushUndoStack(
          component,
          currentGameObjectMaterial,
          color1,
        );

        _changeColorAndPushUndoStack(
          component,
          currentGameObjectMaterial,
          color2,
        );
      };
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          () => {
            MainEditorAssetTool.initAssetTree();
            MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode();
          },
        );
        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState;
      });
      afterEach(() =>
        StateAssetService.getState()
        |> CurrentNodeDataAssetService.clearCurrentNodeData
        |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
        |> StateAssetService.setState
        |> ignore
      );
      describe("test undo operate", () => {
        test("test not undo", () => {
          let assetTreeDomRecord =
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
          _simulateTwiceChangeColor();

          BuildComponentTool.buildBasicMaterial(
            GameObjectTool.getCurrentGameObjectBasicMaterial(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        });
        describe("test undo one step", () =>
          test("step which from second to first", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            _simulateTwiceChangeColor();

            StateHistoryToolEditor.undo();

            BuildComponentTool.buildBasicMaterial(
              GameObjectTool.getCurrentGameObjectBasicMaterial(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
        describe("test undo two step", () =>
          test("step which from second to zero", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            _simulateTwiceChangeColor();

            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.undo();

            BuildComponentTool.buildBasicMaterial(
              GameObjectTool.getCurrentGameObjectBasicMaterial(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
      });
      describe("test redo operate", () => {
        describe("test redo one step", () => {
          test("if not exec undo, redo one step, not change", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            _simulateTwiceChangeColor();

            StateHistoryToolEditor.redo();

            BuildComponentTool.buildBasicMaterial(
              GameObjectTool.getCurrentGameObjectBasicMaterial(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
          test(
            "undo step which from second to zero, redo step which from zero to first",
            () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            _simulateTwiceChangeColor();

            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.redo();

            BuildComponentTool.buildBasicMaterial(
              GameObjectTool.getCurrentGameObjectBasicMaterial(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
        });
        describe("test redo two step", () =>
          test(
            "undo step which from second to zero, redo step which from zero to second",
            () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            _simulateTwiceChangeColor();

            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.redo();
            StateHistoryToolEditor.redo();

            BuildComponentTool.buildBasicMaterial(
              GameObjectTool.getCurrentGameObjectBasicMaterial(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
        describe("test redo three step", () =>
          test(
            "test if current step is last step, execute redo, not change", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            _simulateTwiceChangeColor();

            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.undo();
            StateHistoryToolEditor.redo();
            StateHistoryToolEditor.redo();
            StateHistoryToolEditor.redo();

            BuildComponentTool.buildBasicMaterial(
              GameObjectTool.getCurrentGameObjectBasicMaterial(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
      });
    });
  });