open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "AssetTreeInspector",
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
              CurrentSourceEditorService.setCurrentSource(EditorType.AssetTree)
              |> StateLogicService.getAndSetEditorState
          );
          describe(
            "test component snapshot",
            () => {
              test(
                "if hasn't currentTreeNode, show nothing",
                () =>
                  BuildComponentTool.buildInspectorComponent(
                    TestTool.buildEmptyAppState(),
                    InspectorTool.buildFakeAllShowComponentConfig()
                  )
                  |> ReactTestTool.createSnapshotAndMatch
              );
              test(
                "else",
                () => {
                  MainEditorInspectorTool.setFolderToBeCurrentTreeNode();
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