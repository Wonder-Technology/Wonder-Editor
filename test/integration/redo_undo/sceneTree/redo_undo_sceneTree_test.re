open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: sceneTree", () => {
    let sandbox = getSandboxDefaultVal();

    let _simulateTwiceDragEvent = () => {
      MainEditorSceneTreeTool.Drag.dragGameObjectIntoGameObject(
        ~sourceGameObject=
          MainEditorSceneTool.getSecondBox(
            StateEngineService.unsafeGetState(),
          ),
        ~targetGameObject=MainEditorSceneTool.getSceneFirstCamera(),
        (),
      );

      MainEditorSceneTreeTool.Drag.dragGameObjectIntoGameObject(
        ~sourceGameObject=
          MainEditorSceneTool.getFirstBox(
            StateEngineService.unsafeGetState(),
          ),
        ~targetGameObject=MainEditorSceneTool.getSceneFirstCamera(),
        (),
      );
    };

    let _beforeEach = () => {
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
      );
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "get scene tree from engine",
      (_simulateTwiceDragEvent, _beforeEach, () => ()),
      BuildComponentForCurryTool.buildSceneTree,
    );

    describe("fix bug", () => {
      let execChangeMaterialColorWork = (currentGameObjectMaterial, newColor) =>
        MainEditorLightMaterialTool.changeColor(
          currentGameObjectMaterial,
          newColor,
        );

      let execChangeTransformWork = () =>
        MainEditorTransformTool.changePositionXAndBlur(~value=11.25, ());

      beforeEach(() => {
        MainEditorSceneTool.initState(~sandbox, ());
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
        );
      });
      test(
        "the workflow:
        click treeNote set currentSceneTreeNode;
        change material color;
        change transform x value;
        click undo, engineState is error",
        () => {
          let currentGameObjectMaterial =
            GameObjectTool.getCurrentGameObjectLightMaterial();
          let newColor = PickColorTool.buildColor1();

          execChangeMaterialColorWork(currentGameObjectMaterial, newColor);
          execChangeTransformWork();

          RedoUndoTool.undoHistoryState();

          LightMaterialEngineService.getLightMaterialDiffuseColor(
            currentGameObjectMaterial,
          )
          |> StateLogicService.getEngineStateToGetData
          |> Color.getHexString
          |> expect == newColor##hex;
        },
      );
    });
  });