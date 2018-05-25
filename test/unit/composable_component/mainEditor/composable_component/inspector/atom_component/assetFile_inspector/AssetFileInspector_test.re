/* open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "AssetFileInspector",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _getFromArray = (array, index) => ArrayService.getNth(index, array);
      beforeEach(
        () => {
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(~sandbox, ());
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildTwoLayerAssetTree)
          );
          MainEditorAssetTool.setFolder2ToBeCurrentAssetChildrenNodeParent()
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
                "if hasn't currentNodeId, show nothing",
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
                      MainEditorAssetTool.setImgFileToBeCurrentNodeId();
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
                      MainEditorAssetTool.setJsonFileToBeCurrentNodeId();
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
          );
          describe(
            "test rename file",
            () => {
              let triggerChangeEvent = (value, domChildren) => {
                let article = _getFromArray(domChildren, 0);
                let input = _getFromArray(article##children, 3);
                BaseEventTool.triggerChangeEvent(input, BaseEventTool.buildFormEvent(value))
              };
              let triggerBlurEvent = (value, domChildren) => {
                let article = _getFromArray(domChildren, 0);
                let input = _getFromArray(article##children, 3);
                BaseEventTool.triggerBlurEvent(input, BaseEventTool.buildFormEvent(value))
              };
              test(
                "test not rename",
                () =>
                  BuildComponentTool.buildAssetFileContentComponent()
                  |> ReactTestTool.createSnapshotAndMatch
              );
              test(
                "test rename to specific name",
                () => {
                  MainEditorAssetTool.setImgFileToBeCurrentNodeId();
                  let newName = "arvin";
                  let component =
                    BuildComponentTool.buildAssetFileInspector(
                      MainEditorAssetTool.imgFileId,
                      MainEditorAssetTool.buildFakeImgFileResult()
                    );
                  BaseEventTool.triggerComponentEvent(component, triggerChangeEvent(newName));
                  BaseEventTool.triggerComponentEvent(component, triggerBlurEvent(newName));
                  BuildComponentTool.buildAssetFileContentComponent()
                  |> ReactTestTool.createSnapshotAndMatch
                }
              );
              describe(
                "deal with specific case",
                () =>
                  test(
                    "key in '', trigger onBlur, the input value should be origin name",
                    () => {
                      MainEditorAssetTool.setImgFileToBeCurrentNodeId();
                      let newName = "";
                      let component =
                        BuildComponentTool.buildAssetFileInspector(
                          MainEditorAssetTool.imgFileId,
                          MainEditorAssetTool.buildFakeImgFileResult()
                        );
                      BaseEventTool.triggerComponentEvent(component, triggerChangeEvent(newName));
                      BaseEventTool.triggerComponentEvent(component, triggerBlurEvent(newName));
                      component |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
              )
            }
          )
        }
      )
    }
  ); */