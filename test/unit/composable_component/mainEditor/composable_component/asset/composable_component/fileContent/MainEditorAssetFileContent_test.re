open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "MainEditorAssetFileContent",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _getFromArray = (array, index) => ArrayService.getNth(index, array);
      beforeEach(
        () => {
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test ui component",
        () => {
          beforeEach(
            () => {
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildThreeLayerAssetTree)
              );
              EventListenerTool.buildFakeDom() |> EventListenerTool.stubGetElementByIdReturnFakeDom
            }
          );
          test(
            "if not set currentAssetTreeNode, show nothing",
            () =>
              BuildComponentTool.buildAssetFileContentComponent()
              |> ReactTestTool.createSnapshotAndMatch
          );
          describe(
            "else, show currentAssetTreeNode's files and folder",
            () => {
              test(
                "if currentAssetTreeNode have no file or folder, show nothing",
                () => {
                  MainEditorAssetTool.setFolder2ToBeCurrentAssetTreeNode();
                  BuildComponentTool.buildAssetFileContentComponent()
                  |> ReactTestTool.createSnapshotAndMatch
                }
              );
              test(
                "else, show files and folder",
                () => {
                  MainEditorAssetTool.setFolder1ToBeCurrentAssetTreeNode();
                  BuildComponentTool.buildAssetFileContentComponent()
                  |> ReactTestTool.createSnapshotAndMatch
                }
              )
            }
          )
        }
      );
      describe(
        "test set currentAssetFileNode",
        () => {
          let _triggerFolderClickEvent = (domChildren) => {
            let folderArticle = _getFromArray(domChildren, 0);
            WonderLog.Log.print(folderArticle) |> ignore;
            BaseEventTool.triggerClickEvent(folderArticle)
          };
          let _triggerImgClickEvent = (domChildren) => {
            let fileArticle = _getFromArray(domChildren, 1);
            BaseEventTool.triggerClickEvent(fileArticle)
          };
          let _triggerJsonClickEvent = (domChildren) => {
            let fileArticle = _getFromArray(domChildren, 2);
            BaseEventTool.triggerClickEvent(fileArticle)
          };
          beforeEach(
            () => {
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildThreeLayerAssetTree)
              );
              EventListenerTool.buildFakeDom() |> EventListenerTool.stubGetElementByIdReturnFakeDom;
              AssetEditorService.clearCurrentAssetFileNode |> StateLogicService.getEditorState |> ignore
            }
          );
          test(
            "click img file to set currentAssetFileNode",
            () => {
              MainEditorAssetTool.setFolder1ToBeCurrentAssetTreeNode();
              let component = BuildComponentTool.buildAssetFileContentComponent();
              BaseEventTool.triggerComponentEvent(component, _triggerImgClickEvent);
              StateEditorService.getState()
              |> AssetEditorService.unsafeGetCurrentAssetFileNode
              |> expect == MainEditorAssetTool.imgFileId
            }
          );
          test(
            "click json file to set currentAssetFileNode",
            () => {
              MainEditorAssetTool.setFolder1ToBeCurrentAssetTreeNode();
              let component = BuildComponentTool.buildAssetFileContentComponent();
              BaseEventTool.triggerComponentEvent(component, _triggerJsonClickEvent);
              StateEditorService.getState()
              |> AssetEditorService.unsafeGetCurrentAssetFileNode
              |> expect == MainEditorAssetTool.jsonFileId
            }
          );
          describe(
            "click folder",
            () => {
              testPromise(
                "single click folder, set folder is currentAssetFileNode",
                () => {
                  MainEditorAssetTool.setFolder1ToBeCurrentAssetTreeNode();
                  let fakeDom =
                    EventListenerTool.buildFakeDom()
                    |> EventListenerTool.stubGetElementByIdReturnFakeDom;
                  BuildComponentTool.buildAssetFileContentComponent();
                  EventListenerTool.triggerEvent(fakeDom, "click", {});
                  Js.Promise.make(
                    (~resolve, ~reject) =>
                      Timeout.setTimeout(
                        () => {
                          EventListenerTool.triggerEvent(fakeDom, "click", {});
                          switch (
                            StateEditorService.getState() |> AssetEditorService.getCurrentAssetFileNode
                          ) {
                          | None => [@bs] reject("fail" |> Obj.magic)
                          | Some(file) =>
                            [@bs] resolve(file |> expect == MainEditorAssetTool.folderId2)
                          }
                        },
                        300
                      )
                  )
                }
              );
              testPromise(
                "double click folder, set folder is currentAssetTreeNode",
                () => {
                  MainEditorAssetTool.setFolder1ToBeCurrentAssetTreeNode();
                  let fakeDom =
                    EventListenerTool.buildFakeDom()
                    |> EventListenerTool.stubGetElementByIdReturnFakeDom;
                  BuildComponentTool.buildAssetFileContentComponent();
                  EventListenerTool.triggerEvent(fakeDom, "click", {});
                  Js.Promise.make(
                    (~resolve, ~reject) =>
                      Timeout.setTimeout(
                        () => {
                          EventListenerTool.triggerEvent(fakeDom, "click", {});
                          Timeout.setTimeout(
                            () => {
                              EventListenerTool.triggerEvent(fakeDom, "click", {});
                              switch (
                                StateEditorService.getState()
                                |> AssetEditorService.getCurrentAssetTreeNode
                              ) {
                              | None => [@bs] reject("fail" |> Obj.magic)
                              | Some(treeNode) =>
                                [@bs] resolve(treeNode |> expect == MainEditorAssetTool.folderId2)
                              }
                            },
                            300
                          )
                        },
                        200
                      )
                  )
                }
              )
            }
          )
        }
      )
    }
  );