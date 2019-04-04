open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: sceneTree", () => {
    let sandbox = getSandboxDefaultVal();

    let _simulateTwiceDragEvent = () => {
      MainEditorSceneTreeTool.Drag.dragGameObjectToBeTargetSib(
        ~sourceGameObject=
          MainEditorSceneTool.getSecondCube(
            StateEngineService.unsafeGetState(),
          ),
        ~targetGameObject=MainEditorSceneTool.getSceneFirstCamera(),
        (),
      );

      MainEditorSceneTreeTool.Drag.dragGameObjectToBeTargetSib(
        ~sourceGameObject=
          MainEditorSceneTool.getFirstCube(
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
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
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
      let execChangeMaterialColorWork =
          (isShowInspectorCanvas, currentGameObjectMaterial, newColor) =>
        MainEditorLightMaterialTool.changeColor(
          isShowInspectorCanvas,
          currentGameObjectMaterial,
          newColor,
        );

      let execChangeTransformWork = () =>
        MainEditorTransformTool.changePositionXAndBlur(~value=11.25, ());

      beforeEach(() => {
        MainEditorSceneTool.initState(~sandbox, ());
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
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
            GameObjectTool.getCurrentSceneTreeNodeLightMaterial();
          let newColor = PickColorTool.buildColor1();

          execChangeMaterialColorWork(
            false,
            currentGameObjectMaterial,
            newColor,
          );
          execChangeTransformWork();

          RedoUndoTool.undoHistoryState();

          LightMaterialEngineService.getLightMaterialDiffuseColor(
            currentGameObjectMaterial,
          )
          |> StateLogicService.getEngineStateToGetData
          |> Color.getHexString
          |> expect ==
          newColor##hex;
        },
      );
    });
  });