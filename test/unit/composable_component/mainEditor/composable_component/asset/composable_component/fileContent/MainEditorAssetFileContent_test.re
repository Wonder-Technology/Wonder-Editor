/* open Wonder_jest;

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
            "if not set currentAssetChildrenNodeParent, show nothing",
            () =>
              BuildComponentTool.buildAssetFileContentComponent()
              |> ReactTestTool.createSnapshotAndMatch
          );
          describe(
            "else, show currentAssetChildrenNodeParent's files and folder",
            () => {
              test(
                "if currentAssetChildrenNodeParent have no file or folder, show nothing",
                () => {
                  MainEditorAssetTool.setFolder2ToBeCurrentAssetChildrenNodeParent();
                  BuildComponentTool.buildAssetFileContentComponent()
                  |> ReactTestTool.createSnapshotAndMatch
                }
              );
              test(
                "else, show files and folder",
                () => {
                  MainEditorAssetTool.setFolder1ToBeCurrentAssetChildrenNodeParent();
                  BuildComponentTool.buildAssetFileContentComponent()
                  |> ReactTestTool.createSnapshotAndMatch
                }
              )
            }
          )
        }
      );
      describe(
        "test set currentAssetTreeNode",
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
              AssetCurrentAssetTreeNodeEditorService.clearCurrentAssetTreeNode |> StateLogicService.getEditorState |> ignore
            }
          );
          test(
            "click img file to set currentAssetTreeNode",
            () => {
              MainEditorAssetTool.setFolder1ToBeCurrentAssetChildrenNodeParent();
              let component = BuildComponentTool.buildAssetFileContentComponent();
              BaseEventTool.triggerComponentEvent(component, _triggerImgClickEvent);
              StateEditorService.getState()
              |> AssetCurrentAssetTreeNodeEditorService.unsafeGetCurrentAssetTreeNode
              |> expect == MainEditorAssetTool.imgFileId
            }
          );
          test(
            "click json file to set currentAssetTreeNode",
            () => {
              MainEditorAssetTool.setFolder1ToBeCurrentAssetChildrenNodeParent();
              let component = BuildComponentTool.buildAssetFileContentComponent();
              BaseEventTool.triggerComponentEvent(component, _triggerJsonClickEvent);
              StateEditorService.getState()
              |> AssetCurrentAssetTreeNodeEditorService.unsafeGetCurrentAssetTreeNode
              |> expect == MainEditorAssetTool.jsonFileId
            }
          );
          describe(
            "click folder",
            () => {
              testPromise(
                "single click folder, set folder is currentAssetTreeNode",
                () => {
                  MainEditorAssetTool.setFolder1ToBeCurrentAssetChildrenNodeParent();
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
                            StateEditorService.getState() |> AssetCurrentAssetTreeNodeEditorService.getCurrentAssetTreeNode
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
                "double click folder, set folder is currentAssetChildrenNodeParent",
                () => {
                  MainEditorAssetTool.setFolder1ToBeCurrentAssetChildrenNodeParent();
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
                                |> AssetCurrentAssetChildrenNodeParentEditorService.getCurrentAssetChildrenNodeParent
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
  ); */