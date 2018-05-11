open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "AssetFileInspector",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(~sandbox, ());
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            () => MainEditorInspectorTool.initInspector()
          )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "prepare currentSource",
        () => {
          beforeEach(
            () =>
              CurrentSourceEditorService.setCurrentSource(EditorType.AssetFile)
              |> StateLogicService.getAndSetEditorState
          );
          describe(
            "test component snapshot",
            () => {
              test(
                "if hasn't currentFile, show nothing",
                () =>
                  BuildComponentTool.buildInspectorComponent(
                    TestTool.buildEmptyAppState(),
                    InspectorTool.buildFakeAllShowComponentConfig()
                  )
                  |> ReactTestTool.createSnapshotAndMatch
              );
              describe(
                "else",
                () => {
                  test(
                    "test show image file",
                    () => {
                      MainEditorInspectorTool.setImgFileToBeCurrentFile();
                      BuildComponentTool.buildInspectorComponent(
                        TestTool.buildEmptyAppState(),
                        InspectorTool.buildFakeAllShowComponentConfig()
                      )
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  );
                  test(
                    "test show json file",
                    () => {
                      MainEditorInspectorTool.setJsonFileToBeCurrentFile();
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
      )
    }
  );