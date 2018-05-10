open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "MainEditorAsset",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test show component",
        () => {
          test(
            "if hasn't currentGameObject, show nothing",
            () => {
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
              );
              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig()
              )
              |> ReactTestTool.createSnapshotAndMatch
            }
          );
          describe(
            "else",
            () => {
              test(
                "if currentGameObject is camera, should show transform and basicCameraView and perspectiveCameraProjection",
                () => {
                  MainEditorSceneTool.createDefaultScene(
                    sandbox,
                    MainEditorSceneTool.setCameraTobeCurrentGameObject
                  );
                  BuildComponentTool.buildInspectorComponent(
                    TestTool.buildEmptyAppState(),
                    InspectorTool.buildFakeAllShowComponentConfig()
                  )
                  |> ReactTestTool.createSnapshotAndMatch
                }
              );
              test(
                "else if currentGameObject is box, should show transform and basicMaterial",
                () => {
                  MainEditorSceneTool.createDefaultScene(
                    sandbox,
                    MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
                  );
                  BuildComponentTool.buildInspectorComponent(
                    TestTool.buildEmptyAppState(),
                    InspectorTool.buildFakeAllShowComponentConfig()
                  )
                  |> ReactTestTool.createSnapshotAndMatch
                }
              )
            }
          )
        }
      )
    }
  );