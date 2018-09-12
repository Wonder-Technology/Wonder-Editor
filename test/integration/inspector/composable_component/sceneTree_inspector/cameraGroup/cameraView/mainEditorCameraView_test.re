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
          MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode,
        );

        HeaderTool.triggerAddBox();

        SceneTreeNodeDomTool.OperateDefaultScene.getNewGameObjectDomIndex()
        |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;

        AddableComponentTool.addCameraGroupInBox();
      });

      describe("test set current camera", () => {
        describe("test snapshot", () => {
          test(
            "test if camera is currentCamera, the cameraView checkBox checked should == true and disabled should == true ",
            () =>
            BuildComponentTool.buildCameraView(TestTool.buildEmptyAppState())
            |> ReactTestTool.createSnapshotAndMatch
          );
          test(
            "test if camera isn't currentCamera, the cameraView checkBox checked should == false and disabled should == false ",
            () => {
              MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode();

              BuildComponentTool.buildCameraView(
                TestTool.buildEmptyAppState(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            },
          );
          test(
            "test set unactive camera to be currentCamera, the currentCamera->cameraView checkBox checked should == true and disabled should == true",
            () => {
              MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode();

              MainEditorCameraViewTool.triggerClickSetCurrentCameraEvent();

              BuildComponentTool.buildCameraView(
                TestTool.buildEmptyAppState(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            },
          );
          test(
            "test set unactive camera to be currentCamera, the currentCamera->cameraView checkBox checked should == true and disabled should == true",
            () => {
              MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode();

              MainEditorCameraViewTool.triggerClickSetCurrentCameraEvent();

              BuildComponentTool.buildCameraView(
                TestTool.buildEmptyAppState(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            },
          );
        });
        describe("test logic", () =>
          test(
            "test set unactive camera to be currentCamera, the unactive one should be active",
            () => {
              MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode();
              let sceneCamera = MainEditorSceneTool.getSceneFirstCamera();
              let engineState = StateEngineService.unsafeGetState();
              let engineState =
                BasicCameraViewEngineService.unactiveBasicCameraView(
                  GameObjectComponentEngineService.getBasicCameraViewComponent(
                    sceneCamera,
                    engineState,
                  ),
                  engineState,
                );
              engineState |> StateEngineService.setState |> ignore;

              MainEditorCameraViewTool.triggerClickSetCurrentCameraEvent();

              let firstCamera = GameObjectTool.unsafeGetCurrentSceneTreeNode();
              let engineState = StateEngineService.unsafeGetState();

              engineState
              |> GameObjectComponentEngineService.getBasicCameraViewComponent(
                   firstCamera,
                 )
              |. BasicCameraViewEngineService.isActiveBasicCameraView(
                   engineState,
                 )
              |> expect == true;
            },
          )
        );
      });
    });
  });