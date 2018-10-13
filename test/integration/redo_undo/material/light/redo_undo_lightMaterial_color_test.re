open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: lightMaterial color", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _changeColorAndPushUndoStack = (materialComponent, color) => {
      let sourceColor =
        MainEditorLightMaterialTool.getColor(materialComponent);

      MainEditorLightMaterialTool.changeColor(materialComponent, color);

      MainEditorLightMaterialTool.closeColorPicker(
        ~material=materialComponent,
        ~color=sourceColor,
        (),
      );
    };

    let _simulateTwiceChangeColor = () => {
      BuildCanvasTool.buildFakeCanvas(sandbox);

      let currentGameObjectMaterial =
        GameObjectTool.getCurrentGameObjectLightMaterial();

      let component =
        BuildComponentTool.buildLightMaterial(currentGameObjectMaterial);

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

      _changeColorAndPushUndoStack(currentGameObjectMaterial, color1);

      _changeColorAndPushUndoStack(currentGameObjectMaterial, color2);
    };

    let _beforeEach = () =>
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
      );

    let _afterEach = () =>
      StateEditorService.getState()
      |> AssetCurrentNodeDataEditorService.clearCurrentNodeData
      |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
      |> StateEditorService.setState
      |> ignore;

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateTwiceChangeColor, _beforeEach, _afterEach),
      BuildComponentForCurryTool.buildLightMaterial,
    );
  });