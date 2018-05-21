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
            "if not set currentTreeNode, show nothing",
            () =>
              BuildComponentTool.buildAssetFileContentComponent()
              |> ReactTestTool.createSnapshotAndMatch
          );
          describe(
            "else, show currentTreeNode's files and folder",
            () => {
              test(
                "if currentTreeNode have no file or folder, show nothing",
                () => {
                  MainEditorAssetTool.setFolder2ToBeCurrentTreeNode();
                  BuildComponentTool.buildAssetFileContentComponent()
                  |> ReactTestTool.createSnapshotAndMatch
                }
              );
              test(
                "else, show files and folder",
                () => {
                  MainEditorAssetTool.setFolder1ToBeCurrentTreeNode();
                  BuildComponentTool.buildAssetFileContentComponent()
                  |> ReactTestTool.createSnapshotAndMatch
                }
              )
            }
          )
        }
      );
      describe(
        "test set currentFile",
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
              AssetEditorService.clearCurrentFile |> StateLogicService.getEditorState |> ignore
            }
          );
          test(
            "click img file to set currentFile",
            () => {
              MainEditorAssetTool.setFolder1ToBeCurrentTreeNode();
              let component = BuildComponentTool.buildAssetFileContentComponent();
              BaseEventTool.triggerComponentEvent(component, _triggerImgClickEvent);
              StateEditorService.getState()
              |> AssetEditorService.unsafeGetCurrentFile
              |> expect == MainEditorAssetTool.imgFileId
            }
          );
          test(
            "click json file to set currentFile",
            () => {
              MainEditorAssetTool.setFolder1ToBeCurrentTreeNode();
              let component = BuildComponentTool.buildAssetFileContentComponent();
              BaseEventTool.triggerComponentEvent(component, _triggerJsonClickEvent);
              StateEditorService.getState()
              |> AssetEditorService.unsafeGetCurrentFile
              |> expect == MainEditorAssetTool.jsonFileId
            }
          );
          describe(
            "click folder",
            () => {
              testPromise(
                "single click folder, set folder is currentFile",
                () => {
                  MainEditorAssetTool.setFolder1ToBeCurrentTreeNode();
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
                            StateEditorService.getState() |> AssetEditorService.getCurrentFile
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
                "double click folder, set folder is currentTreeNode",
                () => {
                  MainEditorAssetTool.setFolder1ToBeCurrentTreeNode();
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
                                |> AssetEditorService.getCurrentTreeNode
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