open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform;

let _ =
  describe("MainEditor CameraView", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentSceneTreeNode to be camera", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode,
        );

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState;

        HeaderTool.triggerAddBox();

        SceneTreeNodeDomTool.OperateDefaultScene.getNewGameObjectDomIndex()
        |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;

        AddableComponentTool.addCameraGroupInBox();
      });

      describe("test set current camera", () => {
        describe("test snapshot", () => {
          test(
            "test if camera is currentCamera, the cameraView checkBox checked == true and disabled == true ",
            () =>
            BuildComponentTool.buildCameraView(TestTool.buildEmptyAppState())
            |> ReactTestTool.createSnapshotAndMatch
          );
          test(
            "test if camera isn't currentCamera, the cameraView checkBox checked == false and disabled == false ",
            () => {
              MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode();

              BuildComponentTool.buildCameraView(
                TestTool.buildEmptyAppState(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            },
          );
          test(
            "test set unactive camera is currentCamera, the currentCamera cameraView checkBox checked == true and disabled == true",
            () => {
              MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode();

              MainEditorCameraViewTool.triggerClickSetCurrentCameraEvent();

              BuildComponentTool.buildCameraView(
                TestTool.buildEmptyAppState(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            },
          );
        });
        describe("test logic", () => {
          test(
            "test if not set unactive camera is currentCamera, the active basicCameraView should isn't it's active basicCameraView",
            () => {
              MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode();

              BasicCameraViewEngineService.getActiveBasicCameraView
              |> StateLogicService.getEngineStateToGetData
              |> OptionService.unsafeGet
              |>
              expect != (
                          GameObjectComponentEngineService.getBasicCameraViewComponent(
                            GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                          )
                          |> StateLogicService.getEngineStateToGetData
                        );
            },
          );
          test(
            "test set unactive camera is currentCamera, the active basicCameraView should is it's active basicCameraView",
            () => {
              MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode();

              MainEditorCameraViewTool.triggerClickSetCurrentCameraEvent();

              BasicCameraViewEngineService.getActiveBasicCameraView
              |> StateLogicService.getEngineStateToGetData
              |> OptionService.unsafeGet
              |>
              expect == (
                          GameObjectComponentEngineService.getBasicCameraViewComponent(
                            GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                          )
                          |> StateLogicService.getEngineStateToGetData
                        );
            },
          );
        });
      });
    });
  });