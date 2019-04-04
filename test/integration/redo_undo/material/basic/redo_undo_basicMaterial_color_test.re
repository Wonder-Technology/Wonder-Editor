open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: basicMaterial color", () => {
    let sandbox = getSandboxDefaultVal();

    let _getFromArray = (array, index) =>
      ArrayService.unsafeGetNth(index, array);

    let _changeColorAndPushUndoStack = (materialComponent, color) => {
      let sourceColor =
        MainEditorBasicMaterialTool.getColor(materialComponent);

      MainEditorBasicMaterialTool.changeColor(
        false,
        materialComponent,
        color,
      );

      MainEditorBasicMaterialTool.closeColorPicker(
        ~material=materialComponent,
        ~color=sourceColor,
        (),
      );
    };

    let _simulateTwiceChangeColor = () => {
      BuildCanvasTool.buildFakeCanvas(sandbox);

      let currentGameObjectMaterial =
        GameObjectTool.getCurrentSceneTreeNodeBasicMaterial();

      let color1 = PickColorTool.buildColor1();
      let color2 = PickColorTool.buildColor2();

      _changeColorAndPushUndoStack(currentGameObjectMaterial, color1);

      _changeColorAndPushUndoStack(currentGameObjectMaterial, color2);
    };

    let _beforeEach = () => {
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        () => {
          MainEditorAssetTool.initAssetTree();
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();
        },
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        SceneTreeWidgetService.getWidget(),
      )
      |> StateLogicService.getAndSetEditorState;

      MainEditorBasicMaterialTool.changeMaterialTypeToBeBasicMaterial();
    };

    let _afterEach = () =>
      StateEditorService.getState()
      |> CurrentNodeIdAssetEditorService.clearCurrentNodeId
      |> SelectedFolderNodeIdInAssetTreeAssetEditorService.clearSelectedFolderNodeIdInAssetTree
      |> StateEditorService.setState
      |> ignore;

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateTwiceChangeColor, _beforeEach, _afterEach),
      BuildComponentForCurryTool.buildBasicMaterial,
    );
  });