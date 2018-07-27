open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: ambientLight", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initStateAndGl(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _changeColorAndPushUndoStack = value => {
      let component =
        BuildComponentTool.buildHeader(
          TestTool.buildAppStateSceneGraphFromEngine(),
        );

      BaseEventTool.triggerComponentEvent(
        component,
        OperateComponentEventTool.triggerShowColorPickEvent,
      );

      Header.Method.changeColor(value);

      BaseEventTool.triggerComponentEvent(
        component,
        OperateComponentEventTool.triggerCloseColorPickEvent,
      );
    };

    let _simulateTwiceChangeAmbientLight = () => {
      let canvasDom = ColorPickTool.buildFakeCanvas("a", sandbox);

      let createElementStub = ColorPickTool.documentToJsObj(
                                ColorPickTool.document,
                              )##createElement;

      createElementStub
      |> withOneArg("canvas")
      |> returns(canvasDom)
      |> ignore;

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

      _changeColorAndPushUndoStack(color1);
      _changeColorAndPushUndoStack(color2);
    };

    let _beforeEach = () => {
      MainEditorSceneTool.createDefaultScene(sandbox, () => ());

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;
    };

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateTwiceChangeAmbientLight, _beforeEach, () => ()),
      BuildComponentForRedoUndoTool.buildHeader
    );
  });